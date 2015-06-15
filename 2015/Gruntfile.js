"use strict";

module.exports = function( grunt ) {

    grunt.initConfig({

        // Config variable paths
        config: {

            // Project paths
            dev: 'assets/',
            build: 'build/',

        },

        // SASS _______________________________________________________________________
        sass: {

            // Dev
            dev: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    '<%= config.build %>css/main.min.css':
                    '<%= config.dev %>scss/main.scss'
                }
            }

        },

        // UGLIFY _____________________________________________________________________
        uglify: {

            // Project files
            dev: {
                files: {
                    '<%= config.build %>js/scripts.min.js':
                    ['<%= config.dev %>js/scripts.js']
                }
            },

            // Start files
            modernizr: {
                src: 'components/modernizr/modernizr.js',
                dest: '<%= config.build %>js/libs/modernizr.min.js'
            },

            jquery: {
                src: 'components/jquery/jquery.min.js',
                dest: '<%= config.build %>js/libs/jquery.min.js'
            }

        },

        // JSHINT _____________________________________________________________________
        jshint: {

            // Project files
            dev: ['<%= config.dev %>js/scripts.js'],
                options: {
                    globals: {
                        jQuery: true,
                        reporter: require('jshint-stylish')
                }
            }

        },


        // WATCH ______________________________________________________________________
        watch: {

            // PROJECT TASKS

            // Run SASS task for .scss files
            sass_dev: {
                files: [
                    '<%= config.dev %>scss/**/*.scss',
                    '<%= config.dev %>scss/*.scss'
                ],
                tasks: ['sass:dev'],
            },

            // Run Uglify task when scripts are modified
            scripts_dev: {
                files: ['<%= config.dev %>js/scripts.js'],
                tasks: ['jshint:dev', 'uglify:dev'],
            },

            // Update :)
            livereload: {
                options: { livereload: true },
                files: [
                    // Project files
                    '*.html',
                    '<%= config.build %>css/main.min.css',
                    '<%= config.build %>js/scripts.min.js'
                ],
            },
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Grunt tasks

    // Init
    grunt.registerTask( 'init', [ 'uglify:modernizr', 'uglify:jquery'] );

    // CSS
    grunt.registerTask( 'css', [ 'sass' ] );

    // JS
    grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );

    // Watch
    grunt.registerTask( 'live', [ 'watch' ] );


};