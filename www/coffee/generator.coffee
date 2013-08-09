LETTERS = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
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
         
      @l = get_current_locale(@locales)   
      
   generate: =>
      allowed_characters = LETTERS
         .concat(if @uppercase() then UPPERCASE else [])
         .concat(if @numbers() then NUMBERS else [])
         .concat(if @special_characters() then SPECIALCHARS else [])
      password = ""
      for i in [0..@length()-1]
         password += allowed_characters[random(allowed_characters.length)]
      password
      
   regenerate: =>
      @length.valueHasMutated() # triggers re-evaluation of password
      
   locales:
      en:
         generator: "Generator"
         length: "Length"
         uppercase: "Uppercase"
         numbers: "Numbers"
         special_characters: "Special Characters"
         generate: "Generate"
         
         back: "Back"
         passwords: "Passwords"
         generator: "Generator"
         
         create_entry_with_generated_password: "Create entry with this password"
         
      de:
         generator: "Generator"      
         length: "Länge"
         uppercase: "Großbuchstaben"
         numbers: "Zahlen"
         special_characters: "Sonderzeichen"
         generate: "Generieren"
         
         back: "Zurück"
         passwords: "Passwörter"
         generator: "Generator"
         
         create_entry_with_generated_password: "Eintrag mit diesem Passwort erstellen"
         
      fr:
         generator: "Génératrice"
         length: "Longueur"
         uppercase: "Majuscules"
         numbers: "Chiffres"
         special_characters: "Charactères spécials"
         generate: "Générer"
         
         back: "Retour"
         passwords: "Mots de passe"
         generator: "Génératrice"
         
         create_entry_with_generated_password: "Créer un article avec ce mot de passe"