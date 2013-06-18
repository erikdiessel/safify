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
         setInterval ->
            el = $(document.getElementById(element.id))
            value = valueAccessor()()
            if value != parseInt(el.val(), 10)
               valueAccessor() parseInt(el.val(), 10)
         , 100
   
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
      login: new Login()
      generator: new Generator()
   }
   ko.applyBindings(model)
   setupRoutes()
   
   login = ->
      $('a[href="#login-server"]').focus()
      $('a[href="#login-server"]').click()
   
   $('.login_on_enter').keypress( (event) ->
      if event.which == 13
         login()
   )
   
   $('input[readonly]').parent().addClass('readonly')