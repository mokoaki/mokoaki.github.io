{
  const target_document = (window.main || window).document;

  target_document.querySelector("select[name='HourStart']").value = "9";
  target_document.querySelector("select[name='HourEnd']").value = "16";
  target_document.querySelector("select[name='HourRest']").value = "1";
  target_document.querySelector("select[name='PlanHourStart']").value = "9";
  target_document.querySelector("select[name='PlanHourEnd']").value = "16";
  target_document.querySelector("select[name='PlanHourRest']").value = "1";
  target_document.querySelector("select[name='ContentSelect']").value = "0000000600";
  target_document.querySelector("input[value='登　録']").click();
}
