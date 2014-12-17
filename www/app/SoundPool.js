define(function (){
	/**
	 * A sound pool to use for the sound effects
	 */
	function SoundPool(maxSize) {
		var size = maxSize; // Max bullets allowed in the pool
		var pool = [];
		this.pool = pool;
		var currSound = 0;

		/*
		 * Populates the pool array with the given object
		 */
		this.init = function(object) {
			var i;
			if (object == "laser") {
				for (i = 0; i < size; i++) {
					// Initalize the object
					laser = new Audio("sounds/laser.wav");
					laser.volume = 0.12;
					laser.load();
					pool[i] = laser;
				}
			}
			else if (object == "explosion") {
				for (i = 0; i < size; i++) {
					var explosion = new Audio("sounds/explosion.wav");
					explosion.volume = 0.1;
					explosion.load();
					pool[i] = explosion;
				}
			}
		};

		/*
		 * Plays a sound
		 */
		this.get = function() {
			if(pool[currSound].currentTime === 0 || pool[currSound].ended) {
				pool[currSound].play();
			}
			currSound = (currSound + 1) % size;
		};
	}
	return SoundPool;
});
