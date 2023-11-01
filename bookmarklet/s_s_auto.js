{
  const buttons = document.querySelectorAll("input.png-add");
  let promises = Promise.resolve();

  buttons.forEach((button) => {
    promises = promises.then(() => {
      button.click();
    });

    promises = promises.then(() => {
      const dialog = document.querySelector("div#dialogWorkBalance");

      dialog.querySelector("input#empInputTime0").value = "8:00";
      // dialog.querySelector("input#empInputTime1").value = "8:00";

      dialog.querySelector("button#empWorkOk").click();
    });
  });

  promises.then(() => {
    console.log("処理終了");
  });
}
