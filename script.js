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

function commandParser(token) {
    if (typeof token === 'number') {
        if (!nbr1) {
            nbr1 = token;
        }
        else {
            nbr2 = token;
        }
    }
    else if (token !== 'execute' &&
             token !== 'comma') {
        operator = token;
    }
    else if (token === 'execute') {
        console.log("EXECUTE CALC");
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
