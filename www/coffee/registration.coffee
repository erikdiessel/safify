class Registration
   constructor: ->
      @username = ko.observable("")
      @password_repetition = ko.observable("")
      @repetition_wrong = ko.observable(false)
      
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
         wrong_repetition: "Your repetition of the password is different from the password you entered before. Check if you made an error."
         
      de:
         registration_title: "Registrierung bestätigen"
         username: "Benutzername"
         register: "Registrieren"
         password_repetition: "Passwort-Wiederholung"
         cancel: "Abbrechen"
         wrong_repetition: "Deine Wiederholung des Passwortes unterscheidet sich vom vorher eingegebenen Passwort. Prüfe nach, ob du dich vertippt hast."
         
      fr:
         registration_title: "Confirmer enregistration"
         username: "Nom d'utilisateur"
         register: "Enregistrer"
         password_repetition: "Mot de passe - confirmation"
         cancel: "Annuler"
         wrong_repetition: "Ton répétition du mot de passe est different du mot de passe que tu as utilisé avant. Fais voir si tu as fais une faute."
   