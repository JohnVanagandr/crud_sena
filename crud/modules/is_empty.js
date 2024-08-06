const is_empty = (event, element) => { 
  if (element.value === "") {
    element.classList.remove("correcto");
    element.classList.add("error");
  } else {
    element.classList.remove("error");
    element.classList.add("correcto");
  }
}

export default is_empty;