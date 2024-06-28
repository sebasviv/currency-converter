import axios from 'axios';
import inquirer from 'inquirer';

const API_KEY = 'fca_live_kksdjl5AJQRPoABHEeHK0GDA4QpTcw0vGLQzyaay';
const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

let exchangeRates = {};
let history = [];

async function fetchExchangeRates() {
    try {
        const response = await axios.get(API_URL);
        exchangeRates = response.data.data;
        console.log('Tasas de cambio actualizadas.');
    } catch (error) {
        console.error('Error al obtener las tasas de cambio:', error);
    }
}

function showCurrencies() {
    console.log('Lista de monedas disponibles:');
    for (let currency in exchangeRates) {
        console.log(currency);
    }
}

function showExchangeRates() {
    console.log('Tasas de cambio:');
    for (let [currency, rate] of Object.entries(exchangeRates)) {
        console.log(`${currency}: ${rate}`);
    }
}

function calculateConversion(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        console.log('Moneda no válida.');
        return null;
    }
    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    history.push({ amount, fromCurrency, toCurrency, convertedAmount });
    return convertedAmount;
}

function showHistory() {
    console.log('Historial de conversiones:');
    if (history.length === 0) {
        console.log('No hay conversiones en esta sesión.');
    } else {
        history.forEach((entry, index) => {
            console.log(
                `${index + 1}. ${entry.amount} ${entry.fromCurrency} a ${entry.convertedAmount.toFixed(2)} ${entry.toCurrency}`
            );
        });
    }
}

async function mainMenu() {
    await fetchExchangeRates();

    const menuChoices = [
        'Mostrar lista de monedas',
        'Mostrar tasas de cambio',
        'Establecer moneda y cantidad a convertir',
        'Ver historial de conversiones',
        'Salir'
    ];

    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Seleccione una opción:',
                choices: menuChoices
            }
        ]);

        switch (choice) {
            case 'Mostrar lista de monedas':
                showCurrencies();
                break;

            case 'Mostrar tasas de cambio':
                showExchangeRates();
                break;

            case 'Establecer moneda y cantidad a convertir':
                const { fromCurrency, toCurrency, amount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'fromCurrency',
                        message: 'Ingrese la moneda de origen (ej. USD):',
                        validate: input => !!exchangeRates[input.toUpperCase()] || 'Moneda no válida.'
                    },
                    {
                        type: 'input',
                        name: 'toCurrency',
                        message: 'Ingrese la moneda de destino (ej. EUR):',
                        validate: input => !!exchangeRates[input.toUpperCase()] || 'Moneda no válida.'
                    },
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Ingrese la cantidad a convertir:',
                        validate: input => !isNaN(input) && parseFloat(input) > 0 || 'Cantidad no válida.'
                    }
                ]);

                const convertedAmount = calculateConversion(parseFloat(amount), fromCurrency.toUpperCase(), toCurrency.toUpperCase());
                if (convertedAmount !== null) {
                    console.log(`Resultado: ${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`);
                }
                break;

            case 'Ver historial de conversiones':
                showHistory();
                break;

            case 'Salir':
                console.log('Saliendo del programa...');
                return;

            default:
                console.log('Opción no válida.');
        }
    }
}

mainMenu();
