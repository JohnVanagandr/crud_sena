let limite = 5;
let desde = 0;
export let paginas = (data) => data.length / limite;
let paginaActiva = 1;

export const pagesTotal = (data) => data.length / limit;

export const pages = (data) => data.slice(from, limit);

export const loadItemPagination = (element, data) => {
  const fragment = document.createDocumentFragment();
  let container = document.querySelector(`#${element}`);
  container.innerHTML = "";
  for (let index = 0; index < data; index++) {
    const item = document.createElement("li");
    const link = document.createElement("button");
    link.classList.add("page-link");
    link.textContent = index + 1;
    item.appendChild(link);
    fragment.appendChild(item);
  }
  container.appendChild(fragment);
};

export const nexPage = (element, page, pages, data) => {
  console.log(page, pages, data);

  const array = [];
  pageActive = page + 1;

  from = limit * page;

  if (from <= pages.length) {
    array = data.slice(from, limit + pageActive);
    loadItemPagination(element, array);
  }

  return array;
};
