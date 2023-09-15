"use strict";

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

function commandParser(keyPressed) {
    if (keyPressed === 'zeroKey') {
        return 0;
    }
    
    const keyValue = parseFloat(keyPressed);
    if (keyValue) {
        return keyValue;
    }

    return keyPressed;
}

const calculator = document.querySelector(".calculator");

const buttons = Array.from(calculator.children);

buttons.forEach((calcKey) => {
    calcKey.addEventListener('click', () => {
        console.log(commandParser(calcKey.getAttribute('id')));
    });
});
