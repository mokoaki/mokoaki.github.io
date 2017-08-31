(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("mousemove", function(event) {
      var sayu = event.clientX / $window.width()  * -10 + 5;
      var joge = event.clientY / $window.height() * -10 + 5;

       $("body").css("margin", (joge + "px ") + (-sayu + "px ") + (-joge + "px ") +(sayu + "px"));
    }, true);
  }, true);
})();


  // $(document).on "mousemove", (event) ->
  //   sayu = event.clientX / $window.width()  * -10 + 5
  //   joge = event.clientY / $window.height() * -10 + 5
  //
  //   $("html").css
  //     "margin" : "#{joge}px #{-sayu}px #{-joge}px #{sayu}px"
