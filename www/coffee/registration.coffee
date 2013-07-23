class Registration
   constructor: ->
      @username = ko.observable("")
      @password_repetition = ko.observable("")
      @repetition_wrong(false)
      
      @l = get_current_locale(@locales)
      
   check: (first_password) =>
      if first_password == @password_repetition()
         true
      else
         @repetition_wrong(true)
         false
      
   locales:
      en:
         registration_title: "Confirm Registration"
         username: "Username"
         password_repetition: "Password Repetition"
         register: "Register"
         cancel: "Cancel"
         
      de:
         registration_title: "Registrierung bestätigen"
         username: "Benutzername"
         register: "Registrieren"
         password_repetition: "Passwort-Wiederholung"
         cancel: "Abbrechen"
         
      fr:
         registration_title: "Confirmer enregistration"
         username: "Nom d'utilisateur"
         register: "Enregistrer"
         password_repetition: "Mot de passe - confirmation"
         cancel: "Annuler"
   