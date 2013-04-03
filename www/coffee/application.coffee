document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)

$(document).ready ->
    $('expander').UIExpander({status: 'collapsed'})