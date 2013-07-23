class Deletion

   constructor: ->
      @entry_title = ko.observable("")
      
      @l = get_current_locale(@locales)
      
   locales:
      en:
         title: "Delete ?"
         question: "Do you really want to delete the following entry ?"
         delete: "Delete"
         cancel: "Cancel"
         
      de:
         title: "Löschen ?"
         question: "Den folgenden Eintrag wirklich löschen ?"
         delete: "Löschen"
         cancel: "Abbrechen"
         
      fr:
         title: "Effacer ?"
         question: "Tu veux vraiment effacer l'article suivante ?"
         delete: "Effacer"
         cancel: "Annuller"