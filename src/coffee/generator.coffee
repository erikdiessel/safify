LETTERS = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
UPPERCASE = (letter.toUpperCase() for letter in LETTERS)
NUMBERS = ["1","2","3","4","5","6","7","8","9","0"]
SPECIALCHARS = ["!","$","%","&","/","(",")","=","?","+","-","*","{","}","[","]"]

random = (max) ->
  Math.floor(Math.random()*max)

class Generator
   constructor: ->
      @length = ko.observable(8)
      @uppercase = ko.observable(true)
      @numbers = ko.observable(true)
      @special_characters = ko.observable(false)
      @password = ko.computed =>
         @generate()
      
   generate: =>
      allowed_characters = LETTERS
         .concat(if @uppercase() then UPPERCASE else [])
         .concat(if @numbers() then NUMBERS else [])
         .concat(if @special_characters() then SPECIALCHARS else [])
      password = ""
      for i in [0..@length()-1]
         password += allowed_characters[random(allowed_characters.length)]
      password