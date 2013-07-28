class Entry
   constructor: (index, title, username, password, notes) ->
      @index = ko.observable(index || 0)
      @title = ko.observable(title || "")
      @username = ko.observable(username || "")
      @password = ko.observable(password || "")
      @notes = ko.observable(notes || "")
      
      @notes_to_html = ko.computed =>
         @notes().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g, '<br>')
      
      @l = get_current_locale(@locales)
      
   toObject: =>
      {
         index: @index()
         title: @title()
         username: @username()
         password: @password()
         notes: @notes()
      }
      
   to_mail: =>
      "mailto:?to=&body=" + 
      encodeURIComponent('\r\n'      +        @title()    + '\r\n') +
      encodeURIComponent(@l.username + ': ' + @username() + '\r\n') + 
      encodeURIComponent(@l.password + ': ' + @password() + '\r\n') +
         if @notes() != "" 
            encodeURIComponent(@l.notes    + ':'  + @notes()    + '\r\n')
         else
            ""
      
   actualize_to: (entry) =>
      @index      entry.index()
      @title      entry.title()
      @username   entry.username()
      @password   entry.password()
      @notes      entry.notes()
      
   get_index: =>
      @index()
      
   set_index: (index) =>
      @index(index)
      
   locales:
      en:
         title: "Title"
         username: "Username"
         password: "Password"
         notes: "Additional information"
         
         details: "Details"
         share: "Send per Email"
         
         edit: "Edit"
         save: "Save"
         'delete': "Delete"
         back: "Back"
         close: "Close"
         
         new_entry: "New Entry"
         create: "Create"
         
      de:
         title: "Titel"
         username: "Benutzername"
         password: "Passwort"
         notes: "Notizen"
         
         details: "Details"      
         share: "Per E-Mail versenden"
         
         edit: "Bearbeiten"
         save: "Speichern"
         'delete': "Löschen"
         back: "Zurück"
         close: "Schließen"
         
         new_entry: "Neuer Eintrag"
         create: "Erstellen"
         
      fr:
         title: "Titre"
         username: "Nom d'utilisateur"
         password: "Mot de passe"
         notes: "Notes"
         
         details: "Details"
         share: "Envoyer par e-mail"
         
         edit: "Modifier"
         save: "Sauvegarder"
         'delete': "Effacer"
         back: "Retour"
         close: "Fermer"
         
         new_entry: "Nouvel article"
         create: "Créer"