import is_letters from "./modules/is_letters.js";
import isEmail from "./modules/is_email.js";
import is_number from "./modules/is_number.js";
import remover from "./modules/remove.js";
import is_valid from "./modules/is_valid.js";
import solicitud, { enviar } from "./modules/ajax.js";
import is_empty from "./modules/is_empty.js";

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
const fragmento = document.createDocumentFragment();
const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");
const $template = document.getElementById("users").content;

const cantidad = (elemento) => {
  let valor = elemento.value.length === 10;
  if (valor) {
    elemento.classList.remove("error");
    elemento.classList.add("correcto");
  } else {
    elemento.classList.remove("correcto")
    elemento.classList.add("error")
  }
}

const documentos = () => {
  const fragmento = document.createDocumentFragment();
  let option = document.createElement("option");
  option.value = "";
  option.textContent = "Seleccione...";
  fragmento.appendChild(option);
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
        
        $template.querySelector(".first_name").textContent = element.first_name;
        $template.querySelector(".last_name").textContent = element.last_name;
        $template.querySelector(".phone").textContent = element.phone;
        $template.querySelector(".address").textContent = element.address;
        $template.querySelector(".type_id").textContent = element.type_id;
        $template.querySelector(".docuement").textContent = element.docuement;
        $template.querySelector(".email").textContent = element.email;    

        $template.querySelector('.edit').setAttribute( 'data-id', element.id );
        $template.querySelector(".delete").setAttribute("data-id", element.id);
        
        // $template.

        let clone = document.importNode($template, true)
        fragmento.appendChild(clone)
      })
      table.querySelector('tbody').appendChild(fragmento)
    })
}

const guardar = (event) => {
  let response = is_valid(event, "form  [required]");
  //  Capturar todos los atributos
  const data = {
    first_name: nombre.value.trim(),
    last_name: apellido.value.trim(),
    address: direccion.value.trim(),
    type_id: tipo.selectedIndex,
    email: email.value,
    phone: telefono.value,
    docuement: documento.value,
  };

  if (response) {
    enviar("users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(data => {
      const tabla = tbody.insertRow(-1);
      const tdNombre = tabla.insertCell(0); 
      const tdApellido = tabla.insertCell(1); 
      const tdTelefono = tabla.insertCell(2); 
      const tdDireccion = tabla.insertCell(3); 
      const tdTipo = tabla.insertCell(4); 
      const tdDocumento = tabla.insertCell(5);
      const tdEmail = tabla.insertCell(6); 
      const tdBotonera = tabla.insertCell(7);
      
      tdNombre.textContent = data.first_name;
      tdApellido.textContent = data.last_name;
      tdDireccion.textContent = data.address;
      tdTipo.textContent = data.type_id;
      tdEmail.textContent = data.email;
      tdTelefono.textContent = data.phone;
      tdDocumento.textContent = data.docuement;

      const div = document.createElement('div');
      const btnEdit = document.createElement('button')
      const btnDelete = document.createElement('button')
      const iconEdit = document.createElement('i')
      const iconDelete = document.createElement('i')

      div.classList.add("group");
      btnDelete.classList.add("delete", "button", "button--danger");
      btnEdit.classList.add("edit", "button");
      iconEdit.classList.add("bx", "bxs-edit-alt");
      iconDelete.classList.add("bx", "bxs-trash");

      btnEdit.setAttribute("data-id", data.id);
      btnDelete.setAttribute("data-id", data.id);

      btnEdit.appendChild(iconEdit);
      btnDelete.appendChild(iconDelete);
      
      div.appendChild(btnEdit)
      div.appendChild(btnDelete)

      tdBotonera.appendChild(div)

      nombre.value = "";
      apellido.value = "";
      direccion.value = "";
      tipo.selectedIndex = 0;
      email.value = "";
      telefono.value = "";
      documento.value = "";
      politicas.checked = false;
    });
  }  
}

const editar = (event, element) => {
    enviar(`users/${element.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      console.log(data);
    });
}

const eliminar = (event, element) => {
  const tr = element.parentNode.parentNode.parentNode;
  tr.remove();
  
  if ( confirm('¿Desea eliminar el registro?')) {
    enviar(`users/${element.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => {
      console.log(data);  
      // element
    });
  }
  
};


addEventListener("DOMContentLoaded", (event) => {
  documentos();
  listar();
  if (!politicas.checked) {
    button.setAttribute("disabled", "");
  }
});

// Delegación de eventos
document.addEventListener("click", (e) => {
  let element = "";
  if (e.target.matches(".edit") || e.target.matches(".edit *")) {
    element = e.target.matches(".edit") ? e.target : e.target.parentNode;
    editar(e, element);
  }
  if (e.target.matches(".delete") || e.target.matches(".delete *")) {
    element = e.target.matches(".delete") ? e.target : e.target.parentNode;
    eliminar(e, element);
  }
});

politicas.addEventListener("change", function (e) {
  if (e.target.checked) {
    button.removeAttribute("disabled")
  }
});

$formulario.addEventListener("submit", guardar);

nombre.addEventListener("blur", (event) => {
  is_empty(event, nombre);
})

apellido.addEventListener("blur", (event) => {
  remover(event, apellido)
});

telefono.addEventListener("blur", (event) => {
  cantidad(telefono);
  is_empty(event, telefono);
});

email.addEventListener("blur", (event) => {
  isEmail(event, email);
});

direccion.addEventListener("blur", (event) => {
  is_empty(event, direccion);
});

documento.addEventListener("blur", (event) => {
  is_empty(event, documento);
});

tipo.addEventListener("change", (event) => {
  remover(event, apellido)
})

nombre.addEventListener("keypress", (event) => {
  remover(event, nombre);
});

// Cuando pulsamos la tecla
documento.addEventListener("keypress", is_number);

telefono.addEventListener("keypress", is_number);

nombre.addEventListener("keypress", event => {
  is_letters(event, nombre)
});

apellido.addEventListener("keypress", (event) => {
  is_letters(event, apellido)
});

// Mientras mantenemos pulsada la tecla
documento.addEventListener("keydown", function (event) {
  // console.log("keydown", event);
});

// Cuando soltamos la tecla
documento.addEventListener("keyup", function (event) {
  // console.log("keyup", event);
});