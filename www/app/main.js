define(function (require) {

	/*
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');
    print(messages.getHello());
    */
   
    window.init = function() {
        console.log( "Initialize" );
    };

    /**
     * Define an imageRepository to hold all our images for the game so images
     * are only ever created once. This type of object is known as a
     * singleton.
     */
    var imageRepository = new function() {

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

        // iterate through the keys of images and add it to the image repository
        for ( var key in images ) {
            if ( images.hasOwnProperty( key ) ) {
                var image = key;
                var path = images[key];
                this[image] = new Image();
                this[image].onload = function() { imageLoaded(); };
                this[image].src = path;
            }
        }
    };
});
