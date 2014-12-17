define(function (){
    /**
     * Define an imageRepository to hold all our images for the game so images
     * are only ever created once. This type of object is known as a
     * singleton.
     */
    var ImageRepository = function() {

        // Define all the images in the repository
        // Key: name of image
        // Value: file path to image
        var images = {
            "background": "imgs/bg.png",
            "spaceship": "imgs/ship.png",
            "bullet": "imgs/bullet.png",
            "enemy": "imgs/enemy.png",
            "enemyBullet": "imgs/bullet_enemy.png"
        };

        var numImages = Object.keys( images ).length;
        var numLoaded = 0;

        /**
         * Callback function for loading the images
         */
        function imageLoaded() {
            numLoaded++;
            if ( numLoaded === numImages ) {
                window.init();
            }
        }
        /**
         * Helper function to create new imageLoaded callbacks
         * Exists to stop JSLint from complaining about creating anon. functions in a loop
         * @return {[function]} imageLoaded()
         */
        function makeCallback() {
            return function() { imageLoaded(); };
        }

        // iterate through the keys of images and add it to the image repository
        for ( var key in images ) {
            if ( images.hasOwnProperty( key ) ) {
                var image = key;
                var path = images[key];
                this[image] = new Image();
                this[image].onload = makeCallback();
                this[image].src = path;
            }
        }
    };
    return ImageRepository;
});