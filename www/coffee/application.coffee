document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
    $(document).trigger('click')
, false)

