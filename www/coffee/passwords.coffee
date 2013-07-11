class Entry
   constructor: (index, title, username, password) ->
      @index = ko.observable(index || 0)
      @title = ko.observable(title || "")
      @username = ko.observable(username || "")
      @password = ko.observable(password || "")
      
      @l = get_current_locale(@locales)
      
   reset: =>
      @title("")
      @username("")
      @password("")
      
   toObject: =>
      {
         index: @index()
         title: @title()
         username: @username()
         password: @password()
      }
      
   to_mail: =>
      "mailto:?to=&body=" + 
      encodeURIComponent('\r\n' + @title() + '\r\n') +
      encodeURIComponent(@l.username + ': ' + @username() + '\r\n') + 
      encodeURIComponent(@l.password + ': ' + @password() + '\r\n')
      
   actualize_to: (entry) =>
      @index      entry.index()
      @title      entry.title()
      @username   entry.username()
      @password   entry.password()
      
   get_index: =>
      @index()
      
   set_index: (index) =>
      @index(index)
      
   locales:
      en:
         title: "Title"
         username: "Username"
         password: "Password"
         
         details: "Details"
         share: "Send per Email"
         
         edit: "Edit"
         save: "Save"
         'delete': "Delete"
         back: "Back"
         
      de:
         title: "Titel"
         username: "Benutzername"
         password: "Passwort"
         
         details: "Details"      
         share: "Per E-Mail versenden"
         
         edit: "Bearbeiten"
         save: "Speichern"
         'delete': "Löschen"
         back: "Zurück"
         
      fr:
         title: "Titre"
         username: "Nom d'utilisateur"
         password: "Mot de passe"
         
         details: "Details"
         share: "Envoyer par e-mail"
         
         edit: "Modifier"
         save: "Sauver"
         'delete': "Effacer"
         back: "Retour"
      
class List
   constructor: ->
      @entries = ko.observableArray([])
      
      @l = get_current_locale(@locales)
      
   save: (entry) =>
      actualizing_entry = @get_entry(entry.get_index()) || @new_entry()
      actualizing_entry.actualize_to(entry)
      
   delete: (entry) =>
      @entries.splice(entry.get_index(), 1)
      @actualize_indices()
   
   actualize_indices: =>
      for entry, i in @entries()
         if entry
            entry.index(i)
      
   toJSON: =>
      JSON.stringify(entry.toObject() for entry in @entries())
      
   fromJSON: (data) =>
      entries = JSON.parse(data)
      @entries( for entry in entries
         new Entry(entry.index, entry.title, entry.username, entry.password)
      )
      
   new_entry: =>
      entry = new Entry(@entries().length)
      @entries.push(entry)
      entry
      
   get_entry: (index) =>
      @entries()[index]
      
      
   locales:
      en:
         username: "Username"
         password: "Password"
         
         passwords: "Passwords"
         search: "Search Entry ..."
         new_entry: "New Entry"
         
         passwords: "Passwords"
         generator: "Generator"
         
      de:
         username: "Benutzername"
         password: "Passwort"
      
         passwords: "Passwörter"
         search: "Eintrag suchen ..."      
         new_entry: "Neuer Eintrag"
      
         passwords: "Passwörter"
         generator: "Generator"
      
      fr:
         username: "Nom d'utilisateur"
         password: "Mot de passe"
         
         passwords: "Mots de passe"
         search: "Rechercher ..."
         new_entry: "Nouvel article"
         
         passwords: "Mots de passe"
         generator: "Génératrice"
         