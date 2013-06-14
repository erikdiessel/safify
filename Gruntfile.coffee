module.exports = (grunt) ->
   grunt.initConfig
      concat: 
         js:
            src: ['src/js/jquery-1.9.1.js', 'src/js/jquery-mobile.js', 'src/js/knockout.js', 'src/js/sjcl.js', 'src/js/fastclick.js', 'src/js/application.js']
            dest: 'src/js/all.js'
            
         css:
            src: ['src/css/jquery-mobile.css', 'src/css/style.css']
            dest: 'src/css/all.css'
           
      coffee:
         compile:
            options:
               join: true
            files: 
               'src/js/application.js': ['src/coffee/*.coffee']
               
      watch:
         update:
            files: ['src/css/*', 'src/coffee/*']
            tasks: ['default']
   
   grunt.loadNpmTasks('grunt-contrib-concat')
   grunt.loadNpmTasks('grunt-contrib-coffee')
   grunt.loadNpmTasks('grunt-contrib-watch')
   
   grunt.registerTask 'default', ['coffee', 'concat', 'watch']