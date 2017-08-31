(function () {
  "use strict";

  document.addEventListener("mousemove", function(event) {
    var sayu = event.clientX / $(window).width()  * -6 + 3;
    var joge = event.clientY / $(window).height() * -6 + 3;

     $("body").css({"margin": joge + "px " + (-sayu) + "px " + (-joge) + "px " + sayu + "px"});
  }, true);
})();
