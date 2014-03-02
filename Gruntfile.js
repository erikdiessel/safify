module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: ['www/js/jquery.js', 'www/js/jquery-mobile.js', 'www/js/knockout.js', 'www/js/sjcl.js', 'www/js/fastclick.js', 'www/js/application.js'],
                dest: 'www/js/all.js'
            },
            css: {
                src: ['www/css/jquery-mobile.css', 'www/css/style.css'],
                dest: 'www/css/all.css'
            }
        },
        coffee: {
            compile: {
                options: {
                    join: true
                },
                files: {
                    'www/js/application.js': ['www/coffee/*.coffee']
                }
            }
        },
        watch: {
            update: {
                files: ['www/css/*', 'www/coffee/*'],
                tasks: ['default']
            }
        },
        phantom: {
            server: {
                options: {
                    port: 4444
                }
            }
        },
        run: {
            server: {
                options: {
                    wait: false
                },
                args: ['server.js']
            }
        },
        jasmine_node: {}
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-phantom');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-jasmine-node');
    
    grunt.registerTask('compile', ['coffee', 'concat']);
    
    grunt.registerTask('test', ['phantom', 'run:server', 'jasmine_node', 'stop:server']);
    
    grunt.registerTask('default', ['compile', 'test']);
};