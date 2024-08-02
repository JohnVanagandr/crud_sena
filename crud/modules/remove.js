const remover = (e, input) => {
  if (input.value != "") {
    input.classList.remove("error")
    input.classList.add("correcto")
  } else {
    input.classList.remove("correcto")
    input.classList.add("error")
  }
}

export default remover;