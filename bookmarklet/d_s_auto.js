{
  const wait = (expect) => {
    return new Promise((resolve) => {
      wait_(resolve, expect);
    });
  };

  const wait_ = (resolve, expect) => {
    if (expect()) {
      resolve();
    }
    else {
      console.log("待機します");

      setTimeout(() => {
        wait_(resolve, expect);
      }, 200);
    }
  };

  const search_target_document = () => {
    return (window.main || window).document;
  };

  const search_calendar_table = () => {
    const target_document = search_target_document();
    const target_tables = target_document.querySelectorAll("table");

    return Array.from(target_tables).find((table) => {
      const first_td = table.querySelector("table tbody tr:first-child td:first-child");
      return first_td && (first_td.textContent.trim() === "報告");
    });
  };

  const search_target_all_trs = () => {
    const target_table = search_calendar_table();
    const all_trs = Array.from(target_table.querySelectorAll("tr"));

    return all_trs;
  };

  const search_target_tr = () => {
    return search_target_all_trs().find((tr) => {
      const tds = tr.querySelectorAll("td");

      if (tds[0].querySelector("input[type='checkbox']")) {
        return false;
      }

      if ("月火水木金".includes(tds[3].textContent.trim()) === false) {
        return false;
      }

      return true;
    });
  }

  const main = () => {
    let promises = Promise.resolve();

    promises = promises.then(() => {
      return wait(() => {
        const target_document = search_target_document();
        return target_document.querySelector("input[value='カレンダ変更']");
      });
    });

    promises = promises.then(() => {
      const target_tr = search_target_tr();

      if (!target_tr) {
        return Promise.reject(new Error("正常終了"));
      }

      target_tr.querySelector("td:nth-child(3) a").click();
    });

    promises = promises.then(() => {
      return wait(() => {
        const target_document = search_target_document();
        return target_document.querySelector("input[value='登　録']");
      });
    });

    promises = promises.then(() => {
      const target_document = search_target_document();
      target_document.querySelector("select[name='ContentSelect']").value = "0000000600";
      target_document.querySelector("input[name='RegistButton']").click();
    });

    promises = promises.then(() => {
      setTimeout(main, 4);
    });

    promises.catch((e) => {
      if (e.message === "正常終了") {
        all_check_on();

        console.log(e.message);
      }
      else {
        throw e;
      }
    });

    const all_check_on = () => {
      const target_table = search_calendar_table();
      const checkboxes = target_table.querySelectorAll("input[type='checkbox']");

      Array.from(checkboxes).forEach((checkbox) => {
        if (checkbox.checked === false) {
          checkbox.click();
        }
      });
    };
  };

  main();
}
