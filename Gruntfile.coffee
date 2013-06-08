module.exports = (grunt) ->
   grunt.initConfig
      concat: 
         js:
            src: ['src/js/jquery-1.9.1.js', 'src/js/jquery-mobile.js', 'src/js/knockout.js', 'src/js/sjcl.js', 'src/js/fastclick.js', 'src/js/application.js']
            dest: 'src/js/all.js'
            
         css:
            src: ['src/css/jquery-mobile.css', 'src/css/style.css']
            dest: 'src/css/all.css'
   
   grunt.loadNpmTasks('grunt-contrib-concat');