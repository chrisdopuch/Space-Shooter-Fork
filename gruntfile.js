module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'www/**/*.js'], // Don't JSHint Uglified files
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      build: {
        files: ['**/*'],
        tasks: ['requirejs']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: "www-built",
          keepalive: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          dir: "www-built",
          appDir: "www",
          baseURL: "lib"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint', 'requirejs']);

};