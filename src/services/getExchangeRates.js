import axios from "axios";

const API_KEY = "fca_live_kksdjl5AJQRPoABHEeHK0GDA4QpTcw0vGLQzyaay";
const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

async function getExchangeRates() {
  try {
    const response = await axios.get(API_URL);
    console.log("response", response.data);
    console.log("Tasas de cambio actualizadas.");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener las tasas de cambio:", error);
    throw new Error("Error al obtener tasas de cambio");
  }
}

export default getExchangeRates;
