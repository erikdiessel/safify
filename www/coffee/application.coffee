document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
    $('expander').UIExpander({status:'collapsed'})
, false)

$(document).click( ->
    $('expander').UIExpander({status:'collapsed'})
)