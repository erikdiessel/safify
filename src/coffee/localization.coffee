getLocalized = ->
   locale = (navigator.language || navigator.userLanguage).substring(0,2)
   localization[locale]

localization = {
   en: {
      username: "Username"
      password: "Password"
      new_entry: "New Entry"
      save: "Save"
      cancel: "Cancel"
      title: "Title"
      edit: "Edit"
      'delete': "Delete"
      login: "Login"
      register: "Register"
      back: "Back"
      passwords: "Passwords"
      search: "Search entries"
      uppercase: "Uppercase"
      details: "Details"
      generator: "Generator"
      numbers: "Numbers"
      special_characters: "Special Characters"
      length: "Length"
      generate: "Generate"
      generator: "Generator"
      passwords: "Passwords"
   }
   de: {
      username: "Benutzername"
      password: "Passwort"
      new_entry: "Neuer Eintrag"
      save: "Speichern"
      cancel: "Abbrechen"
      title: "Titel"
      edit: "Bearbeiten"
      'delete': "Löschen"
      login: "Login"
      register: "Registrieren"
      back: "Zurück"
      passwords: "Passwörter"
      search: "Einträge durchsuchen"
      uppercase: "Großbuchstaben"
      details: "Details"
      generator: "Generator"
      numbers: "Zahlen"
      special_characters: "Sonderzeichen"
      length: "Länge"
      generate: "Generieren"
      generator: "Generator"
      passwords: "Passwörter"
   }
}