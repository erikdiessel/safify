document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)

$(document).ready( ->
    $('expander').uiExpander({status:'collapsed'})
)