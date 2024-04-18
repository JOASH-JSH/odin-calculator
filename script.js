function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(expression) {
    const { firstNumber, secondNumber, operator } = expression;
    if (operator === "+") return add(Number(firstNumber), Number(secondNumber));
    else if (operator === "-")
        return subtract(Number(firstNumber), Number(secondNumber));
    else if (operator === "x")
        return multiply(Number(firstNumber), Number(secondNumber));
    else if (operator === "/")
        return divide(Number(firstNumber), Number(secondNumber));
}

function calculate(expression) {
    let { firstNumber, secondNumber, operator } = expression;
    if (firstNumber && operator && secondNumber) {
        firstNumber = operate(expression);
    }
    expression.firstNumber = String(firstNumber);
    expression.secondNumber = "";
    expression.operator = "";
}

function displayExpression(expression) {
    const { firstNumber, secondNumber, operator } = expression;
    const expressionAreaElement = document.querySelector(
        ".display-expression-area"
    );
    expressionAreaElement.textContent = firstNumber + operator + secondNumber;
}

function createExpression(target, expression) {
    let { firstNumber, secondNumber, operator, decimalPointExist } = expression;
    const buttonType = target.dataset["buttonType"];
    if (buttonType === "number") {
        const value = target.dataset["value"];
        if (!operator) firstNumber += value;
        else secondNumber += value;
    } else if (buttonType === "operator") {
        const value = target.dataset["value"];
        if (firstNumber && !secondNumber) {
            operator = value;
        } else if (secondNumber) {
            firstNumber = operate(expression);
            operator = value;
            secondNumber = "";
        }
        decimalPointExist = false;
    } else if (buttonType === "decimal-point" && !decimalPointExist) {
        if (firstNumber && !operator && !secondNumber) firstNumber += ".";
        else if (operator) secondNumber += ".";
        decimalPointExist = true;
    } else if (buttonType === "negate") {
        if (firstNumber && !operator) firstNumber = -firstNumber;
        else if (secondNumber && operator) secondNumber = -secondNumber;
    }

    expression.firstNumber = firstNumber;
    expression.secondNumber = secondNumber;
    expression.operator = operator;
    expression.decimalPointExist = decimalPointExist;
}

function backspace(expression) {
    let { firstNumber, secondNumber, operator, decimalPointExist } = expression;

    if (firstNumber === "Infinity") {
        firstNumber = "";
    } else if (secondNumber) {
        if (secondNumber[secondNumber.length - 1] === ".") {
            decimalPointExist = false;
        }
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    } else if (operator) {
        operator = "";
    } else if (firstNumber) {
        if (firstNumber[firstNumber.length - 1] === ".") {
            decimalPointExist = false;
        }
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    }

    expression.firstNumber = firstNumber;
    expression.secondNumber = secondNumber;
    expression.operator = operator;
    expression.decimalPointExist = decimalPointExist;
}

function clearExpression(expression) {
    expression.firstNumber = "";
    expression.secondNumber = "";
    expression.operator = "";
    expression.decimalPointExist = false;
}

// main
(() => {
    const gridBtnsElement = document.querySelector(".section-3");
    const clearBtnElement = document.querySelector("#btn-clear");
    const backspaceBtnElement = document.querySelector("#btn-backspace");
    const calculateBtnElement = document.querySelector("#btn-calculate");

    const expression = {
        firstNumber: "",
        secondNumber: "",
        operator: "",
        decimalPointExist: false,
    };

    gridBtnsElement.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;
        if (target.classList.contains("btn")) {
            createExpression(target, expression);
            displayExpression(expression);
        }
    });

    clearBtnElement.addEventListener("click", (e) => {
        e.stopPropagation();
        clearExpression(expression);
        displayExpression(expression);
    });

    backspaceBtnElement.addEventListener("click", (e) => {
        e.stopPropagation();
        backspace(expression);
        displayExpression(expression);
    });

    calculateBtnElement.addEventListener("click", (e) => {
        e.stopPropagation();
        calculate(expression);
        displayExpression(expression);
    });
})();
