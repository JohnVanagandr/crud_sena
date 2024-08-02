import is_letters from "./modules/is_letters.js";
import is_valid from "./modules/is_valid.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const button = document.querySelector("button");


nombre.addEventListener("keypress", is_letters)

$formulario.addEventListener("submit", (event) => {
  let response = is_valid(event, "form  [required]");
  const data = {
    name: nombre.value,
  }
  if (response) {

    button.setAttribute("disabled", "");

    fetch('http://127.0.0.1:3000/documents', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        nombre.value = "";
        button.removeAttribute("disabled");
      });
  }
});

















// const data = {
//   name: nombre.value,
// }

// if (response) {
//   fetch('http://localhost:3000/documents', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
// }
// });