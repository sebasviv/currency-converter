import getExchangeRates from "../services/getExchangeRates.js";
import axios from "axios";
import { jest, test, expect } from "@jest/globals";


jest.mock("axios");

test("debe obtener tasas de cambio correctamente", async () => {
  const mockData = { data: { data: { USD: 1 } } }; 
  axios.get = jest.fn().mockResolvedValue(mockData);

  const rates = await getExchangeRates();

  console.log("rates", rates); 
  console.log("mockData.data.data", mockData.data.data); 

  expect(rates).toEqual(mockData.data.data);
  expect(axios.get).toHaveBeenCalledWith(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_kksdjl5AJQRPoABHEeHK0GDA4QpTcw0vGLQzyaay"
  );
});

test("debe lanzar un error si la API falla", async () => {
  axios.get.mockRejectedValue(new Error("Error al obtener datos"));

  await expect(getExchangeRates()).rejects.toThrow(
    "Error al obtener tasas de cambio"
  );
});
