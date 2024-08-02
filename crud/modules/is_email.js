const isEmail = (event, elemento) => {
  let expresion = /^[\w-._]+@[\w-._]+(\.[a-zA-Z]{2,4}){1,2}$/;
  if (expresion.test(elemento.value)) {
    elemento.classList.remove("error")
    elemento.classList.add("correcto")
  } else {
    elemento.classList.remove("correcto")
    elemento.classList.add("error")
  };
};

export default isEmail;