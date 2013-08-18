window.addEventListener('load', ->
    new FastClick(document.body)
, false)

# only executed on phonegap 
document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)


get_current_locale = (locales) ->
   locale = (navigator.language || navigator.userLanguage).substring(0,2)
   locales[locale] || locales['en']
   
manifest_url = location.origin + '/manifest.webapp'


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
   

   window.login            = new Login()
   window.registration     = new Registration()
   window.password_list    = new List()
   window.current_entry    = new Entry()
   window.deletion         = new Deletion()
   window.generator        = new Generator()
   window.menu             = new Menu()
   window.change_password  = new ChangePassword()
   
   ko.applyBindings window.login,            document.querySelector('#login')
   ko.applyBindings window.registration,     document.querySelector('#registration')
   ko.applyBindings window.password_list,    document.querySelector('#passwords')
   ko.applyBindings window.current_entry,    document.querySelector('#new')
   ko.applyBindings window.current_entry,    document.querySelector('#edit')
   ko.applyBindings window.deletion,         document.querySelector('#deletion')
   ko.applyBindings window.current_entry,    document.querySelector('#details')
   ko.applyBindings window.generator,        document.querySelector('#generator')
   ko.applyBindings window.menu,             document.querySelector('#menu')
   ko.applyBindings window.change_password,  document.querySelector('#change_password')
   
   setupRoutes()
   
   login = ->
      $('a[href="#login-server"]').focus()
      $('a[href="#login-server"]').click()
   
   $('.login_on_enter').keypress( (event) ->
      if event.which == 13
         login()
   )