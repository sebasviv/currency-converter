const calculateConversion = (exchangeRates, amount, fromCurrency, toCurrency)  => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        console.log('Moneda no válida.');
        return null;
    }
    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    return convertedAmount;
}

export default calculateConversion