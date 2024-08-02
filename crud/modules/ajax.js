import { URL } from "../config.js";

const solicitud = async (url) => {
  let solicitud = await fetch(`${URL}/${url}`);
  let data = await solicitud.json();
  return data;
}

export default solicitud;