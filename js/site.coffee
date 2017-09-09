---
---

$window = $(window)
$body   = $("body")

window_width  = null
window_height = null

resize = ->
  window_width  = $window.width()
  window_height = $window.height()

  return true

window.addEventListener "resize", (event) ->
  resize()

  return true

resize()

document.addEventListener "mousemove", (event) ->
  sayu = event.clientX / window_width  * -6 + 3
  joge = event.clientY / window_height * -6 + 3

  $body.css
    "margin" : "#{joge}px #{-sayu}px #{-joge}px #{sayu}px"

  return true
