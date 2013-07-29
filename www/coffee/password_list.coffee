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
         new Entry(entry.index, entry.title, entry.username, entry.password, entry.notes)
      )
      
   new_entry: =>
      entry = new Entry(@entries().length)
      @entries.push(entry)
      entry
      
   get_entry: (index) =>
      @entries()[index]
      
   length: =>
      @entries().length
      
      
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
         