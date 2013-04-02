document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
    $('expander').UIExpander({status:'collapsed'})
, false)