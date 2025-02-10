const history = [];

export function addConversion(amount, fromCurrency, toCurrency, convertedAmount) {
  history.push({ amount, fromCurrency, toCurrency, convertedAmount });
}

export function showHistory() {
    console.log("Historial de conversiones:");
    if (history.length === 0) {
      console.log("No hay conversiones en esta sesión.");
    } else {
      history.forEach((entry, index) => {
        console.log(
          `${index + 1}. ${entry.amount} ${entry.fromCurrency} a ${entry.convertedAmount.toFixed(2)} ${entry.toCurrency}`
        );
      });
    }
  }