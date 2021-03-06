define(
	[
		'./Background',
		'./Ship',
		'./Drawable',
		'./Bullet',
		'./Enemy',
		'./Pool',
		'./QuadTree',
		'./SoundPool'
	],
	function (
		Background,
		Ship,
		Drawable,
		Bullet,
		Enemy,
		Pool,
		QuadTree,
		SoundPool
	)
{

	/**
	 * Creates the Game object which will hold all objects and data for
	 * the game.
	 */
	function Game() {
		/*
		 * Gets canvas information and context and sets up all game
		 * objects.
		 * Returns true if the canvas is supported and false if it
		 * is not. This is to stop the animation script from constantly
		 * running on browsers that do not support the canvas.
		 */
		


		this.init = function() {
			// Get the canvas elements
			this.bgCanvas = document.getElementById('background');
			this.shipCanvas = document.getElementById('ship');
			this.mainCanvas = document.getElementById('main');
			var imageRepository = window.imageRepository;

			// Test to see if canvas is supported. Only need to
			// check one canvas
			if (this.bgCanvas.getContext) {
				this.bgContext = this.bgCanvas.getContext('2d');
				this.shipContext = this.shipCanvas.getContext('2d');
				this.mainContext = this.mainCanvas.getContext('2d');

				// Initialize objects to contain their context and canvas
				// information
				Background.prototype.context = this.bgContext;
				Background.prototype.canvasWidth = this.bgCanvas.width;
				Background.prototype.canvasHeight = this.bgCanvas.height;

				Ship.prototype.context = this.shipContext;
				Ship.prototype.canvasWidth = this.shipCanvas.width;
				Ship.prototype.canvasHeight = this.shipCanvas.height;

				Bullet.prototype.context = this.mainContext;
				Bullet.prototype.canvasWidth = this.mainCanvas.width;
				Bullet.prototype.canvasHeight = this.mainCanvas.height;

				Enemy.prototype.context = this.mainContext;
				Enemy.prototype.canvasWidth = this.mainCanvas.width;
				Enemy.prototype.canvasHeight = this.mainCanvas.height;

				// Initialize the background object
				this.background = new Background();
				this.background.init(0,0); // Set draw point to 0,0

				// Initialize the ship object
				this.ship = new Ship();
				// Set the ship to start near the bottom middle of the canvas
				this.shipStartX = this.shipCanvas.width/2 - imageRepository.spaceship.width;
				this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
				this.ship.init(this.shipStartX, this.shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);

				// Initialize the enemy pool object
				this.enemyPool = new Pool(30);
				this.enemyPool.init("enemy");
				this.spawnWave();

				this.enemyBulletPool = new Pool(50);
				this.enemyBulletPool.init("enemyBullet");

				// Start QuadTree
				this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});

				this.playerScore = 0;

				// Audio files
				this.laser = new SoundPool(10);
				this.laser.init("laser");

				this.explosion = new SoundPool(20);
				this.explosion.init("explosion");

				this.backgroundAudio = new Audio("sounds/kick_shock.wav");
				this.backgroundAudio.loop = true;
				this.backgroundAudio.volume = 0.25;
				this.backgroundAudio.load();

				this.gameOverAudio = new Audio("sounds/game_over.wav");
				this.gameOverAudio.loop = true;
				this.gameOverAudio.volume = 0.25;
				this.gameOverAudio.load();

				var that = this;

				this.checkAudio = window.setInterval(function(){that.checkReadyState();},1000);
			}
		};

		// Spawn a new wave of enemies
		this.spawnWave = function() {
			var height = imageRepository.enemy.height;
			var width = imageRepository.enemy.width;
			var x = 100;
			var y = -height;
			var spacer = y * 1.5;
			for (var i = 1; i <= 18; i++) {
				this.enemyPool.get(x,y,2);
				x += width + 25;
				if (i % 6 === 0) {
					x = 100;
					y += spacer;
				}
			}
		};

		// Start the animation loop
		this.start = function() {
			this.ship.draw();
			this.backgroundAudio.play();
			window.animate();
		};

		// Restart the game
		this.restart = function() {
			this.gameOverAudio.pause();

			document.getElementById('game-over').style.display = "none";
			this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
			this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
			this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

			this.quadTree.clear();

			this.background.init(0,0);
			this.ship.init(this.shipStartX, this.shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);

			this.enemyPool.init("enemy");
			this.spawnWave();
			this.enemyBulletPool.init("enemyBullet");

			this.playerScore = 0;

			this.backgroundAudio.currentTime = 0;
			this.backgroundAudio.play();

			this.start();
		};

		// Game over
		this.gameOver = function() {
			this.backgroundAudio.pause();
			this.gameOverAudio.currentTime = 0;
			this.gameOverAudio.play();
			document.getElementById('game-over').style.display = "block";
		};

		/**
		 * Ensure the game sound has loaded before starting the game
		 */
		this.checkReadyState = function() {
			if (this.gameOverAudio.readyState === 4 && this.backgroundAudio.readyState === 4) {
				window.clearInterval(this.checkAudio);
				document.getElementById('loading').style.display = "none";
				this.start();
			}
		};
	}
	return Game;
});