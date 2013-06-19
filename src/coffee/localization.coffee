getLocalized = ->
   locale = (navigator.language || navigator.userLanguage).substring(0,2)
   localization[locale] || localization['en']

localization = 
   en:
      
      sign_in: "Sign In"
      register: "Register"
      username: "Username"
      password: "Password"
      master_password: "Master Password"
      
      username_missing: "Username is missing."
      password_missing: "Password is missing."
      
      username_not_found: "Your entered username does not exist. New users should register first."
      authentification_failed: "The entered username or password is incorrect."
      username_already_used: "The username is already used."
      
      passwords: "Passwords"
      search: "Search Entry ..."
      new_entry: "New Entry"
      
      edit: "Edit"
      save: "Save"
      title: "Title"
      'delete': "Delete"
      back: "Back"
      
      details: "Details"
      share: "Send per Email"
      
      generator: "Generator"
      length: "Length"
      uppercase: "Uppercase"
      numbers: "Numbers"
      special_characters: "Special Characters"
      generate: "Generate"
      
      short_description: "Fortress of Keys stores your precious passwords securely and accessible from every device."
      security: "Security"
      text_security: ""
      legal_notice: "Legal Notice"
   
   de:
      
      sign_in: "Anmelden"
      register: "Registrieren"
      username: "Benutzername"
      password: "Passwort"      
      master_password: "Master-Passwort"
      
      username_missing: "Benutzername fehlt."
      password_missing: "Passwort fehlt."

      username_not_found: "Der angegebene Benutzername existiert nicht. Als neuer Benutzer musst du dich erst registrieren."
      authentification_failed: "Der angegebene Benutzername oder das Passwort ist falsch."
      username_already_used: "Der Benutzername ist schon besetzt."

      passwords: "Passwörter"
      search: "Eintrag suchen ..."      
      new_entry: "Neuer Eintrag"      
      
      edit: "Bearbeiten"
      save: "Speichern"
      title: "Titel"
      'delete': "Löschen"
      back: "Zurück"      
      
      details: "Details"      
      share: "Per E-Mail versenden"

      generator: "Generator"      
      length: "Länge"
      uppercase: "Großbuchstaben"
      numbers: "Zahlen"
      special_characters: "Sonderzeichen"
      generate: "Generieren"
      
      short_description: ""
      security: "Sicherheit"
      text_security: ""
      legal_notice: "Impressum"
      
   fr:
      
      sign_in: "Connexion"
      register: "Enregistrer"
      username: "Nom d'utilisateur"
      password: "Mot de passe"
      master_password: "Mot de passe"
      
      username_missing: "Le nom d'utilisateur manque."
      password_missing: "Le mot de passe manque."
      
      username_not_found: "Ce nom d'utilisateur n'existe pas. Comme nouveau utilisateur il faut s'enregistrer."
      authentification_failed: "Le nom d'utilisateur ou le mot de passe est incorrect."
      username_already_used: "Ce nom d'utilisateur est déjà utilisé."
      
      passwords: "Mots de passe"
      search: "Rechercher ..."
      new_entry: "Nouvel article"
      
      edit: "Modifier"
      save: "Sauver"
      title: "Titre"
      'delete': "Effacer"
      back: "Retour"
      
      details: "Details"
      share: "Envoyer par e-mail"
      
      generator: "Génératrice"
      length: "Longueur"
      uppercase: "Majuscules"
      numbers: "Chiffres"
      special_characters: "Charactères spécials"
      generate: "Générer"
      
      short_description: ""
      security: "Sécurité"
      text_security: ""
      legal_notice: "Mentions légales"