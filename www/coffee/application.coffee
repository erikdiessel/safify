document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)

$.ready ->
    $(document).trigger('touchstart')
