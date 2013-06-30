module.exports = (grunt) ->
   grunt.initConfig
      concat: 
         js:
            src: ['www/js/jquery-1.9.1.js', 'www/js/jquery-mobile.js', 'www/js/knockout.js', 'www/js/sjcl.js', 'www/js/fastclick.js', 'www/js/application.js']
            dest: 'www/js/all.js'
            
         css:
            src: ['www/css/jquery-mobile.css', 'www/css/style.css']
            dest: 'www/css/all.css'
           
      coffee:
         compile:
            options:
               join: true
            files: 
               'www/js/application.js': ['www/coffee/*.coffee']
               
      watch:
         update:
            files: ['www/css/*', 'www/coffee/*']
            tasks: ['default']
   
   grunt.loadNpmTasks('grunt-contrib-concat')
   grunt.loadNpmTasks('grunt-contrib-coffee')
   grunt.loadNpmTasks('grunt-contrib-watch')
   
   grunt.registerTask 'default', ['coffee', 'concat', 'watch']