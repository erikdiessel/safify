class Entry
   constructor: (index, title, username, password) ->
      @index = ko.observable(index || 0)
      @title = ko.observable(title || "")
      @username = ko.observable(username || "")
      @password = ko.observable(password || "")
      
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
      encodeURIComponent(model.l.username + ': ' + @username() + '\r\n') + 
      encodeURIComponent(model.l.password + ': ' + @password() + '\r\n')
      
class List
   constructor: ->
      @entries = ko.observableArray([])
      @current_entry = new Entry()
      
   save_current: =>
      entry = @entries()[@current_entry.index()]
      if not entry?
         entry = new Entry(@entries().length)
         @entries.push(entry)
      entry.title(@current_entry.title())
      entry.username(@current_entry.username())
      entry.password(@current_entry.password())
      
   delete_current: =>
      #@entries.remove (entry) =>
         #entry.index() == @current_entry.index()
      #@actualize_indices()
      @entries.splice(@current_entry.index(), 1)
      @actualize_indices()
   
   actualize_indices: =>
      for entry, i in @entries()
         if entry
            entry.index(i)
   
   new_current: (index) =>
      old_entry = @entries()[index] || new Entry(index)
      @current_entry.index(old_entry.index())
      @current_entry.title(old_entry.title())
      @current_entry.username(old_entry.username())
      @current_entry.password(old_entry.password())
      
   toJSON: =>
      JSON.stringify(entry.toObject() for entry in @entries())
      
   fromJSON: (data) =>
      entries = JSON.parse(data)
      @entries( for entry in entries
         new Entry(entry.index, entry.title, entry.username, entry.password)
      )