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
      
      short_description: "Fortress of Keys is a password manager app. It stores your precious passwords securely and accessible from every device. &nbsp; <em>Register now for free.</em>"
      security: "Security and Data Privacy"
      text_security: "
      <h3>We keep high standards in security.</h3>
      <br>
      Your list of passwords is encrypted directly on your device and your master password too. We only get your encrypted data.
      <br>
      For encryption, military grade algorithms are used: the <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> and the <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.
      <br>
      Nobody can access your data, including the author of the app and security agencies, as long as they can't guess your master password. <em>So make it safe.</em>
      <br>
      The encrypted data is transmitted over <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> for additional security.
      <br>
      We don't store anything except your encrypted data and your registration information.
      <br>
      For making the app faster and available all the time, our partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> caches the publically available content of this app and sets a cookie. They never receive any of your private data. 
      <hr>
      Perfect security is not archievable, but Fortress of Keys lets you make a step in this direction.
      <br>
      <i>Note however, that computer viruses or traditional espionage may comprise the security of your data. You have to protect yourself against this.</i>
      "
      
      legal_notice: "Legal Notice"
      text_legal_notice: "
      <i>Author:</i> 
      <br>
      <b>Erik Diessel</b>
      <br>
      Bürgermeister-Alexander-Str. 19
      <br>
      55122 Mainz
      <br>
      Germany
      <br>
      <br>
      <a href=\"mailto: support@fortressofkeys.tk\">Write an email</a>
      <hr>
      All content © 2013 Erik Diessel
      "
      
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
      
      short_description: "Fortress of Keys ist eine Passwort-Manager-App. Sie speichert deine wertvollen Passwörter sicher und von jedem Gerät erreichbar ab. &nbsp; <em>Registriere dich jetzt kostenlos.</em>"
      security: "Sicherheit und Datenschutz"
      text_security: "
      <h3>Wir haben hohe Sicherheitsstandards</h3>
      <br>
      Deine Passwortliste wird direkt auf deinem Gerät verschlüsselt, genauso wie dein Masterpasswort. Wir bekommen nur deine verschlüsselten Daten.
      <br>
      Für die Verschlüsselung werden moderne, erprobte Verfahren verwendet: der <a href=\"https://en.wikipedia.org/wiki/Advanced_Encryption_Standard\" target=\"_blank\">Advanced Encryption Standard (AES)</a> und die <a href=\"https://en.wikipedia.org/wiki/PBKDF2\" target=\"_blank\">Password-Based Key Derivation Function 2 (PBKDF2)</a>.
      <br>
      Niemand gelangt an deine Daten im Klartext, inklusive dem Autor und Sicherheitsbehörden, solange sie nicht dein Masterpasswort erraten. <em>Also verwende ein sicheres.</em>
      <br>
      Die Daten werden für zusätzliche Sicherheit über <a href=\"https://en.wikipedia.org/wiki/Transport_Layer_Security\" target=\"_blank\">TLS</a> übertragen.
      <br>
      Wir speichern nichts außer deinen verschlüsselten Daten und deinen Registrierdaten.
      <br>
      Um die App schneller und immer erreichbar zu halten speichert unser Partner <a href=\"https://cloudflare.com\" target=\"_blank\">Cloudflare</a> die öffentlich zugänglichen Teile dieser App zwischen und setzt einen Cookie. Sie empfangen keinerlei privaten Daten.
      <hr>
      Perfekte Sicherheit ist nicht erreichbar, aber Fortress of Keys lässt dich einen Schritt in diese Richtung machen.
      <br>
      <i>Beachte jedoch, dass Computerviren oder klassische Spionage die Sicherheit deiner Daten gefährden können. Du musst dich dagegen schützen.</i>
      "
      legal_notice: "Impressum"
      text_legal_notice: "
      <i>Autor:</i>
      <br>
      <b>Erik Diessel</b>
      <br>
      Bürgermeister-Alexander-Str. 19
      <br>
      55122 Mainz
      <br>
      Deutschland
      <br>
      <br>
      <a href=\"mailto: support@fortressofkeys.tk\">E-Mail schreiben</a>
      <hr>
      Alle Inhalte © 2013 Erik Diessel
      "
      
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
      security: "Sécurité et protection des données"
      text_security: ""
      legal_notice: "Mentions légales"
      text_legal_notice: "
      <i>Auteur:</i>
      <br>
      <b>Erik Diessel</b>
      <br>
      Bürgermeister-Alexander-Str. 19
      <br>
      55122 Mainz
      <br>
      Allemagne
      <br>
      <br>
      <a href=\"mailto: support@fortressofkeys.tk\">Envoyer un e-mail</a>
      <hr>
      Tous les contenus © 2013 Erik Diessel
      "