class ChangePassword
   constructor: ->
      @new_password        = ko.observable("")
      @password_repetition = ko.observable("")
      @repetition_wrong    = ko.observable(false)
      
      @l = get_current_locale(@locales)
      
   locales:
      en:
         change_password:     "Change Password"
         new_password:        "New Password"
         password_repetition: "Password Repetition"
         cancel:              "Cancel"
         repetition_wrong:    "The repetition of the password doesn't match the entered one."
         
      de:
         change_password:     "Passwort ändern"
         new_password:        "Neues Passwort"
         password_repetition: "Wiederholung"
         cancel:              "Abbrechen"
         repetition_wrong:    "Die Wiederholung des Passwortes stimmt nicht mit dem eingegebenen überein"
         
      fr:
         change_password:     "Modifier mot de passe"
         new_password:        "Nouvel mot de passe"
         password_repetition: "Répétition"
         cancel:              "Annuler"
         repetition_wrong:    "La répétition du mot de passe n'est pas conforme."
         
   check: =>
      @repetition_wrong(@new_password() != @password_repetition())
      not @repetition_wrong()