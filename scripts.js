class Calculator {
    constructor(previousOpText, currentOpText) {
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    operationChoice(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOpText.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOpText.innerText = 
              `${this.previousOperand} ${this.operation}` }

    }
 }


const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-delete]')
const clearEntButton = document.querySelector('[data-clearent]')
const clearButton = document.querySelector('[data-clear]')
const previousOpText = document.querySelector('[data-previous]')
const currentOpText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOpText, currentOpText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationChoice(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearEntButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})