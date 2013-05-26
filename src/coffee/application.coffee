window.addEventListener('load', ->
    new FastClick(document.body)
, false)

# only executed on phonegap 
document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)


$(document).ready ->
   ko.bindingHandlers.slider_value = {
      init: (element, valueAccessor) ->
         setTimeout ( ->
            val = valueAccessor()()
            el = $(element)
            console.log('init fired')
            console.log(element)
            el.on "input", (event, ui) ->
               console.log('changed')
               value = valueAccessor()();
               if value != el.val
                  valueAccessor()(parseInt(el.val()));
         , 0)
   
      update: (element, valueAccessor) ->
         el = $(element)
         if el.is('.ui-slider-input')
            value = ko.utils.unwrapObservable(valueAccessor()())
            if value != el.val()
               el.val(value)
               el.slider("refresh")
   }
   
   window.model = {
      l: getLocalized()
      list: new List()
      current: new Current()
      login: new Login()
      generator: new Generator()
   }
   ko.applyBindings(model)
   setupRoutes()