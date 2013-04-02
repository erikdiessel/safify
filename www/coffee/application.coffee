$(document).ready ->
    document.addEventListener('deviceready', ->
        navigator.splashscreen.hide()
        navigator.notification.alert("Started", ->
            console.log('Nothing')
        )
        
    , false)
