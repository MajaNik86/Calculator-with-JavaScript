const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearAllBtn = document.getElementById('clear-btn')


//function for number values:
function sendNumberValue(number) {
    console.log(number)
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;

}


//Add event listeners to btn for numbers: 
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
})


//Clear all function:
function clearAll() {
    calculatorDisplay.textContent = '0';
}

clearAllBtn.addEventListener('click', clearAll);
