function showCurrencies(exchangeRates) {
  console.log("Lista de monedas disponibles:");
  for (let currency in exchangeRates) {
    console.log(currency);
  }
}

function showExchangeRates(exchangeRates) {
  console.log("Tasas de cambio:");
  for (let [currency, rate] of Object.entries(exchangeRates)) {
    console.log(`${currency}: ${rate}`);
  }
}

export { showCurrencies, showExchangeRates };
