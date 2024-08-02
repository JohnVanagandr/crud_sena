import is_letters from "./modules/is_letters.js";
import isEmail from "./modules/is_email.js";
import is_number from "./modules/is_number.js";
import remover from "./modules/remove.js";
import is_valid from "./modules/is_valid.js";
import solicitud from "./modules/ajax.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const email = document.querySelector("#email");
const button = document.querySelector("button");

const cantidad = (elemento) => {
  let valor = elemento.value.length === 10;
  if (valor) {
    alert("correcto")
  } else {
    elemento.classList.remove("correcto")
    elemento.classList.add("error")
  }
}

const documentos = () => {
  const fragmento = document.createDocumentFragment();
  solicitud("documents")
    .then((data) => {
      data.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        fragmento.appendChild(option);
      });
      tipo.appendChild(fragmento);
    });
}


const listar = () => {
  solicitud("users")
    .then(data => {
      data.forEach(element => {
        console.log(element);
      })
    })
}

addEventListener("DOMContentLoaded", (event) => {
  documentos();
  listar();
  if (!politicas.checked) {
    button.setAttribute("disabled", "");
  }
});

politicas.addEventListener("change", function (e) {
  if (e.target.checked) {
    button.removeAttribute("disabled")
  }
});

$formulario.addEventListener("submit", (event) => {
  let response = is_valid(event, "form  [required]");
  //  Capturar todos los atributos
  const data = {
    first_name: nombre.value,
    last_name: apellido.value,
    address: direccion.value,
    type_id: tipo.value,
    email: email.value,
    phone: telefono.value,
    docuement: documento.value
  }
  console.log(data);
  if (response) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // codigo
        nombre.value = "";
      });
  }
});

nombre.addEventListener("keypress", (event) => {
  remover(event, nombre)
});

apellido.addEventListener("blur", (event) => {
  remover(event, apellido)
});

tipo.addEventListener("change", (event) => {
  remover(event, apellido)
})

// Cuando pulsamos la tecla
documento.addEventListener("keypress", is_number);

telefono.addEventListener("keypress", is_number);

telefono.addEventListener("blur", () => {
  cantidad(telefono)
})

nombre.addEventListener("keypress", is_letters);

apellido.addEventListener("keypress", (event) => {
  is_letters(event, apellido)
});

email.addEventListener("blur", (event) => {
  isEmail(event, email)
});

// Mientras mantenemos pulsada la tecla
documento.addEventListener("keydown", function (event) {
  // console.log("keydown", event);
});

// Cuando soltamos la tecla
documento.addEventListener("keyup", function (event) {
  // console.log("keyup", event);
});