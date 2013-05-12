window.addEventListener('load', ->
    new FastClick(document.body)
, false)

# only executed on phonegap 
document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)


$(document).ready ->
   window.model = {
      l: getLocalized()
      list: new List()
      current: new Current()
      login: new Login()
      generator: new Generator()
   }
   ko.applyBindings(model)
   setupRoutes()