"use strict";

let nbr1 = undefined;
let nbr2 = undefined;
let operator = undefined;

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

function operate(nbr1, nbr2, opearator) {
    let result = undefined;

    switch(operator) {
        case 'sum':
            result = add(nbr1, nbr2); 
            break;
        case 'multiply':
            result = multiply(nbr1, nbr2); 
            break;
        case 'subtract':
            result = subtract(nbr1, nbr2); 
            break;
        case 'divide':
            result = divide(nbr1, nbr2); 
            break;
    } 
    console.log(result);
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

    if (!nbr2) {
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
        nbr1 = undefined;
        nbr2 = undefined;
        operator = undefined;
    }
    else if (token === 'backspace') {
        backspace();
    } 
    else if (token !== 'execute' &&
             token !== 'comma') { 
        operator = token;
    }
    else if (token === 'execute') {
        operate(nbr1, nbr2, operator);
    }
    console.log("Nbr1: " + nbr1 + "\nNbr2: " + nbr2 + "\nOp: " + operator);
}

function calculatorInit() {
    const calculator = document.querySelector(".calculator");

    const buttons = Array.from(calculator.children);

    buttons.forEach((calcKey) => {
        calcKey.addEventListener('click', () => {
            const token = commandLexer(calcKey.getAttribute('id'));
            commandParser(token);
        });
    });
}

calculatorInit();
