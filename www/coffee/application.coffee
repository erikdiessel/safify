$(document).ready ->
    navigator.splashscreen.hide()
    navigator.notification.alert("Started", ->
        console.log('Nothing')
    )
