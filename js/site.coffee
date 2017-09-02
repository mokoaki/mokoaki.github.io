---
---

$ ->
  $window = $(window)

  document.addEventListener "mousemove", (event) ->
    sayu = event.clientX / $window.width()  * -6 + 3
    joge = event.clientY / $window.height() * -6 + 3

    $("html").css
      "body" : "#{joge}px #{-sayu}px #{-joge}px #{sayu}px"

    return true

  return true
