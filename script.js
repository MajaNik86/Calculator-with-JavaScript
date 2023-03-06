const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearAllBtn = document.getElementById('clear-btn')

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,

}

let firstValue = 0;
let operatorValue = '';
let awaitingNewValue = false;


//function for number values:
function sendNumberValue(number) {
    //replace current display if fisrtValue is entered
    if (awaitingNewValue) {
        calculatorDisplay.textContent = number;
        awaitingNewValue = false;
    } else {
        console.log(number)
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

//function for adding decimal point:
function useDecimal() {
    //if operator pressed cant add decimal
    if (awaitingNewValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

//function for using operators:
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent multiple operators:
    if (operatorValue && awaitingNewValue) {
        operatorValue = operator;
        return;
    }
    //Assign firstValue if there is no first value:
    if (!firstValue) {
        firstValue = currentValue
    } else {
        console.log(firstValue, operatorValue, currentValue)
        const calculation = calculate[operatorValue](firstValue, currentValue)
        firstValue = calculation;
        calculatorDisplay.textContent = calculation;
        console.log('calculation ', calculation);
    }

    // Ready for next value:
    awaitingNewValue = true;

    operatorValue = operator
    calculatorDisplay.textContent = firstValue;

}


//Add event listeners to btn for numbers: 
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => useDecimal())
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
})


//Clear all values:
function clearAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNewValue = false;
    calculatorDisplay.textContent = '0';
}

clearAllBtn.addEventListener('click', clearAll);
