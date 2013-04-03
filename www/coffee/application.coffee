document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
    $('expander').UIExpander({status: 'collapsed'})
, false)

$(document).ready ->
    $('expander').UIExpander({status: 'collapsed'})
    console.log('ready-event fired')