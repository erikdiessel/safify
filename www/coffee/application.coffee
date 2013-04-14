document.addEventListener('deviceready', ->
    navigator.splashscreen.hide()
, false)

$(document).on 'pageinit', ->
    $('.selectable').click ->
        $(this).selectText()
        #console.log('called')
    console.log('called')
    
window.addEventListener('load', ->
    new FastClick(document.body)
, false)