import { URL } from "../config.js";

const solicitud = async (endpoint) => {
  let solicitud = await fetch(`${URL}/${endpoint}`);
  let data = await solicitud.json();
  return data;
};

export const enviar = async (endpoint, options) => {
  let solicitud = await fetch(`${URL}/${endpoint}`, options);
  let data = await solicitud.json();
  return data;
};

export default solicitud;