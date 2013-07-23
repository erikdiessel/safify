class Deletion

   constructor: ->
      @entry_title = ko.observable("")
      
      @l = get_current_locale(@locales)
      
   locales:
      en:
         title: 'Delete ?'
         question: 'Do you really want to delete the following entry:'
         delete: 'Delete'
         cancel: 'Cancel'