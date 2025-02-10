import inquirer from "inquirer";
import getExchangeRates from "./services/getExchangeRates.js";
import {
  showCurrencies,
  showExchangeRates,
  //showHistory,
} from "./modules/showDataFunctions.js";
import calculateConversion from "./modules/calculateConversion.js";
import { addConversion, showHistory } from "./modules/conversionHistory.js";

async function mainMenu() {
  const exchangeRates = await getExchangeRates();

  const menuChoices = [
    "Mostrar lista de monedas",
    "Mostrar tasas de cambio",
    "Establecer moneda y cantidad a convertir",
    "Ver historial de conversiones",
    "Salir",
  ];

  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Seleccione una opción:",
        choices: menuChoices,
      },
    ]);

    switch (choice) {
      case "Mostrar lista de monedas":
        showCurrencies(exchangeRates);
        break;

      case "Mostrar tasas de cambio":
        showExchangeRates(exchangeRates);
        break;

      case "Establecer moneda y cantidad a convertir": {
        const { fromCurrency, toCurrency, amount } = await inquirer.prompt([
          {
            type: "input",
            name: "fromCurrency",
            message: "Ingrese la moneda de origen (ej. USD):",
            validate: (input) =>
              !!exchangeRates[input.toUpperCase()] || "Moneda no válida.",
          },
          {
            type: "input",
            name: "toCurrency",
            message: "Ingrese la moneda de destino (ej. EUR):",
            validate: (input) =>
              !!exchangeRates[input.toUpperCase()] || "Moneda no válida.",
          },
          {
            type: "input",
            name: "amount",
            message: "Ingrese la cantidad a convertir:",
            validate: (input) =>
              (!isNaN(input) && parseFloat(input) > 0) || "Cantidad no válida.",
          },
        ]);

        const convertedAmount = calculateConversion(
          exchangeRates,
          parseFloat(amount),
          fromCurrency.toUpperCase(),
          toCurrency.toUpperCase()
        );
        if (convertedAmount !== null) {
          addConversion(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase(), convertedAmount);
          console.log(
            `Resultado: ${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(
              2
            )} ${toCurrency.toUpperCase()}`
          );
        }
        break;
      }

      case "Ver historial de conversiones":
        showHistory();
        break;

      case "Salir":
        console.log("Saliendo del programa...");
        return;

      default:
        console.log("Opción no válida.");
    }
  }
}

mainMenu();
