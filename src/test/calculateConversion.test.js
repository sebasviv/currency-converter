import calculateConversion from "../modules/calculateConversion";
import { test, expect, describe } from "@jest/globals";

describe("calculateConversion", () => {
  test("debe convertir correctamente de una moneda a otra", () => {
    const exchangeRates = { USD: 1, EUR: 0.85, CLP: 900 };

    const result = calculateConversion(exchangeRates, 100, "USD", "EUR");
    expect(result).toBeCloseTo(85);
  });

  test("debe devolver null si la moneda de origen no es válida", () => {
    const exchangeRates = { USD: 1, EUR: 0.85 };

    const result = calculateConversion(exchangeRates, 100, "GBP", "EUR");
    expect(result).toBeNull();
  });

  test("debe devolver null si la moneda de destino no es válida", () => {
    const exchangeRates = { USD: 1, EUR: 0.85 };

    const result = calculateConversion(exchangeRates, 100, "USD", "JPY");
    expect(result).toBeNull();
  });

  test("debe devolver el mismo monto si la moneda de origen y destino son iguales", () => {
    const exchangeRates = { USD: 1, EUR: 0.85 };

    const result = calculateConversion(exchangeRates, 100, "USD", "USD");
    expect(result).toBe(100);
  });

  test("debe convertir correctamente de CLP a USD", () => {
    const exchangeRates = { USD: 1, CLP: 900 };

    const result = calculateConversion(exchangeRates, 9000, "CLP", "USD");
    expect(result).toBeCloseTo(10); 
  });
});
