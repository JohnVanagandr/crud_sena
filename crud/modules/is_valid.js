const dom = document;
const is_valid = (event, form) => {
  event.preventDefault();
  const elemts = document.querySelectorAll(form)
  let bandera = true;
  elemts.forEach(element => {
    if (element.value === "") {
      element.classList.add("error");
      bandera = false
    }
  });
  return bandera;
}
export default is_valid;