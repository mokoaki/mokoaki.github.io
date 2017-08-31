(function () {
  "use strict";

  document.addEventListener("mousemove", function(event) {
    var sayu = event.clientX / $window.width()  * -10 + 5;
    var joge = event.clientY / $window.height() * -10 + 5;

     $("body").css({"margin": joge + "px " + (-sayu) + "px " + (-joge) + "px " + sayu + "px"});
  }, true);
})();
