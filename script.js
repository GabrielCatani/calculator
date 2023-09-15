"use strict";

let nbr1 = undefined;
let nbr2 = undefined;
let operator = undefined;
let result = undefined;

function add(nbr1, nbr2) {
    return nbr1 + nbr2;
}

function subtract(nbr1, nbr2) {
    return nbr1 - nbr2;
}

function multiply(nbr1, nbr2) {
    return nbr1 * nbr2;
}

function divide(nbr1, nbr2) {
    if (nbr2 === 0) {
        return 0;
    }
    return nbr1 / nbr2;
}

function commandLexer(keyPressed) {
    if (keyPressed === 'zeroKey') {
        return 0;
    }
    
    const keyValue = parseFloat(keyPressed);
    if (keyValue) {
        return keyValue;
    }

    return keyPressed;
}

function clear() {
    nbr1 = undefined;
    nbr2 = undefined;
    operator = undefined;
    result = undefined;
}

function operate(n1, n2, opearator) {
    let r = undefined;

    switch(operator) {
        case 'sum':
            r = add(n1, n2); 
            break;
        case 'multiply':
            r = multiply(n1, n2); 
            break;
        case 'subtract':
            r = subtract(n1, n2); 
            break;
        case 'divide':
            r = divide(n1, n2); 
            break;
    }
    clear();
    result = r;
    nbr1 = r;
}

function inputNumber(number) {
    if (!operator) {
        if (!nbr1) {
            nbr1 = number;
        }
        else {
            nbr1 = (nbr1 * 10) + number;
        }
    }
    else {
        if (!nbr2) {
            nbr2 = number;
        }
        else {
            nbr2 = (nbr2 * 10) + number;
        }
    }
}

function backspace() {
    if (!nbr1) {
        return;
    }

    if (!nbr2 && nbr2 !== 0) {
        nbr1 = parseInt(nbr1 / 10);
    }
    else {
        nbr2 = parseInt(nbr2 / 10);
    }
}

function commandParser(token) {
    if (typeof token === 'number') {
        inputNumber(token);
    }
    else if(token === 'clear') {
        clear();
    }
    else if (token === 'backspace') {
        backspace();
    } 
    else if (token !== 'execute') { 
        operator = token;
    }
    else if (token === 'execute') {
        operate(nbr1, nbr2, operator);
    }
    console.log("Nbr1: " + nbr1 + "\nNbr2: "
        + nbr2 + "\nOp: " + operator + "\nResult: " + result);
}

function calculatorInit() {
    const calculator = document.querySelector(".calculator");
    const buttons = Array.from(calculator.children);

    display();

    buttons.forEach((calcKey) => {
        calcKey.addEventListener('click', () => {
            const token = commandLexer(calcKey.getAttribute('id'));
            commandParser(token);
            display();
        });
    });
}

function display() {
    const display = document.querySelector('.display');
    
    if (result) {
        display.innerHTML = result;
    }
    else if (!nbr1) {
        display.innerHTML = 0;        
    }
    else if (!nbr2) {
        display.innerHTML = nbr1;
    }
    else {
        display.innerHTML = nbr2;
    }
}

calculatorInit();
