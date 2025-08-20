const buttonContainer = document.querySelector(".button-container");
const displayText = document.querySelector("#display p")
let currentNumber = null;
let prevNumber = null;
let storedOperation = "";
const MAX_LENGTH = 12;
// let displayingResult = false;

buttonContainer.addEventListener("pointerdown", (event)=>{
    const target = event.target;
    
    switch(target.id){
        case "one":
            updateCurrentNumber(1);
            console.log(target.id + " clicked");
            break;
        case "two":
            updateCurrentNumber(2);
            console.log(target.id + " clicked");
            break;
        case "three":
            updateCurrentNumber(3);
            console.log(target.id + " clicked");
            break;
        case "four":
            updateCurrentNumber(4);
            console.log(target.id + " clicked");
            break;
        case "five":
            updateCurrentNumber(5);
            console.log(target.id + " clicked");
            break;
        case "six":
            updateCurrentNumber(6);
            console.log(target.id + " clicked");
            break;
        case "seven":
            updateCurrentNumber(7);
            console.log(target.id + " clicked");
            break;
        case "eight":
            updateCurrentNumber(8);
            console.log(target.id + " clicked");
            break;
        case "nine":
            updateCurrentNumber(9);
            console.log(target.id + " clicked");
            break;
        case "zero":
            updateCurrentNumber(0);
            console.log(target.id + " clicked");
            break;
        case "add":
            applyOperation(target.id);
            console.log(target.id + " clicked");
            break;
        case "subtract":
            applyOperation(target.id);
            console.log(target.id + " clicked");
            break;
        case "multiply":
            applyOperation(target.id);
            console.log(target.id + " clicked");
            break;
        case "divide":
            applyOperation(target.id);
            console.log(target.id + " clicked");
            break;
        case "equals":
            evaluate();
            console.log(target.id + " clicked");
            break;
        case "clear":
            clearCalc();
            console.log(target.id + " clicked");
            break;
        case "sign":
            flipSign();
            console.log(target.id + " clicked");
            break;
    }
});

document.addEventListener("keydown", (event) => {
    
    switch(event.key){
        case "1":
            updateCurrentNumber(1);
            console.log(event.key + " down");
            break;
        case "2":
            updateCurrentNumber(2);
            console.log(event.key + " down");
            break;
        case "3":
            updateCurrentNumber(3);
            console.log(event.key + " down");
            break;
        case "4":
            updateCurrentNumber(4);
            console.log(event.key + " down");
            break;
        case "5":
            updateCurrentNumber(5);
            console.log(event.key + " down");
            break;
        case "6":
            updateCurrentNumber(6);
            console.log(event.key + " down");
            break;
        case "7":
            updateCurrentNumber(7);
            console.log(event.key + " down");
            break;
        case "8":
            updateCurrentNumber(8);
            console.log(event.key + " down");
            break;
        case "9":
            updateCurrentNumber(9);
            console.log(event.key + " down");
            break;
        case "0":
            updateCurrentNumber(0);
            console.log(event.key + " down");
            break;
        case "+":
            applyOperation("add");
            console.log(event.key + " down");
            break;
        case "-":
            applyOperation("subtract");
            console.log(event.key + " down");
            break;
        case "*":
            applyOperation("multiply");
            console.log(event.key + " down");
            break;
        case "/":
            applyOperation("divide");
            console.log(event.key + " down");
            break;
        case "=":
            evaluate();
            console.log(event.key + " down");
            break;
        case "Enter":
            evaluate();
            console.log(event.key + " down");
            break;
        case "c":
            clearCalc();
            console.log(event.key + " down");
            break;
        // case "sign":
        //     flipSign();
        //     console.log(target.id + " clicked");
        //     break;
        // NOTE: not sure what key to use for sign
    }
});
function clearCalc(){
    currentNumber = null;
    prevNumber = null;
    storedOperation = "";
    displayNumber("");
}

function updateCurrentNumber(num){
    // do we have a completed operation we want to clear?
    if (prevNumber != null && storedOperation == ""){
        clearCalc();
    }
    if(currentNumber === null){
        currentNumber = num;
    } else {
        if (currentNumber.toString().length >= MAX_LENGTH){
            // do nothing (WILL BE CHANGED WITH decimal)
        } else {
            currentNumber = currentNumber * 10 + num;
        }

    }
    displayNumber(currentNumber);
}

function evaluate(){
    if (storedOperation != ""){
        prevNumber = operate(currentNumber, prevNumber, storedOperation);
        storedOperation = "";
        currentNumber = null;
        displayNumber(prevNumber);
    }
}

function applyOperation(operation){
    /*
        suppose we have a number loaded and a previous number, do the operation
    */
    if (currentNumber == null){
        if(prevNumber == null){
            prevNumber = 0;
            displayNumber(0);
        } else {
            storedOperation = operation;
            return;
        }
    }
    if (currentNumber != null){
        if (prevNumber == null){
            // store the operation
            // store currentNumber into prevNumber
            // display the currentNumber
            storedOperation = operation;
            prevNumber = currentNumber;
            currentNumber = null;
            displayNumber(prevNumber);

        } else {
            // do prevNumber (stored_operator) currentNumber
            // store that into prevNumber
            // display prevNumber
            // store the operator
            prevNumber = operate(prevNumber, currentNumber, storedOperation);
            currentNumber = null;
            storedOperation = operation;
            displayNumber(prevNumber);
        }
    }
}

function operate(numA, numB, operator){
    if (numA == null){
        numA = 0;
    }
    if (numB == null){
        numB = 0;
    }
    switch(operator){
        case 'add':
            return numA + numB;
            break;
        case 'subtract':
            return numA - numB;
            break;
        case 'multiply':
            return numA * numB;
            break;
        case 'divide':
            return Math.round(numA / numB);
            break;
        case '':
            console.log("ERROR: no operation found");
            return '';
            break;
    }
}

function displayNumber(num){
    if (num.toString().length > MAX_LENGTH){
        clearCalc();
        displayText.textContent = "OVERFLOW";
    } else {
        displayText.textContent = num;
    }
}

function flipSign(){
    if (currentNumber != null){
        currentNumber *= -1;
        displayNumber(currentNumber);
    } else {
        if (prevNumber != null){
            prevNumber *= -1;
            displayNumber(prevNumber);
        }
    }
}