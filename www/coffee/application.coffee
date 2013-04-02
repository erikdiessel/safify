document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
    $('expander').uiExpander({status:'collapsed'})
, false)