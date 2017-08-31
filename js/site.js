(function () {
  "use strict";

  document.addEventListener("mousemove", function(event) {
    var sayu = event.clientX / $(window).width()  * -4 + 2;
    var joge = event.clientY / $(window).height() * -4 + 2;

     $("body").css({"margin": joge + "px " + (-sayu) + "px " + (-joge) + "px " + sayu + "px"});
  }, true);
})();
