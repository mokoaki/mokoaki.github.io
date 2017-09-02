$ ->
  $window = $(window)

  document.addEventListener "mousemove", (event) ->
    sayu = event.clientX / $window.width()  * -10 + 5
    joge = event.clientY / $window.height() * -10 + 5

    $("html").css
      "body" : "#{joge}px #{-sayu}px #{-joge}px #{sayu}px"

    return true

  return true
