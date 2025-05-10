// Functions
function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}


// GLOBAL VARIABLES
let number1 = "";
let number2 = "";



// Display for Calculator
const display = document.querySelector(".display");

let calculationDone = false;

let displayString = "";
let regex = /\d+[+\-*/]\d+[+\-*/]?/;
let regexForMultipleOperators = /(\d+)([+\-*/]+)(\d+)/;
let answer;

// Operator Function for Calling Functions
function operatorFunction(operatorArgument)
{
    

    if (number1.includes("."))
    {
        number1 = parseFloat(number1);
    }
    else
    {
        number1 = Math.abs(parseInt(number1));
    }
    
    number2 = number2.includes(".")? parseFloat(number2) : Math.abs(parseFloat(number2));


    switch(operatorArgument)
    {
        case '+':
            answer = add(number1, number2);
            break;
        case '-':
            answer = subtract(number1, number2);
            break;
        case '*':
            answer = multiply(number1, number2);
            break;
        case '/':
            if (number2 === 0)
            {
                alert("Can't divide by zero");
                reset();
                return;
            }
            answer = divide(number1, number2);
            break;
        case Default:
            alert("Nothing happens");
                
    }

    // After finding answer display it
    if (answer.toString().includes("."))
    {
        answer = parseFloat(answer).toFixed(4);
    }

    displayString = answer;
    display.textContent = displayString;
    number1 = "";
    number2 = "";

    calculationDone = true;


}



// Function for display
const digits = document.querySelectorAll(".digit");
let calculationContinued = false;

function enableDisplay()
{
    digits.forEach(function(digit) {

        // if any of digit is clicked
        digit.addEventListener("click", () => {

            let digitText = digit.textContent;

            if (calculationDone === true)
            {
                if (digitText === "*" || digitText === "/" ||
                    digitText === "+" || digitText === "-"
                )
                {
                    calculationContinued = true;
                    

                }
                else
                {
                    
                    calculationContinued = false;
                    reset();
                }
                calculationDone = false;
            }
            let operator = "";

            

            if (digitText !== "=" && digitText !== "⌫")
            {
                displayString += digitText;
                // displayString += " ";
            }
            
            display.textContent = displayString; // This is getting ignored.
            let matchRegex = displayString.match(regexForMultipleOperators);

            if (digitText === "=" || regex.test(displayString) === true)
            {
                
                if (displayString === "")
                {
                    alert("You haven't clicked any digit");
                    return;
                }
                let operatorGot = evaluate(displayString, operator);
                operatorFunction(operatorGot)
            }
            else if (matchRegex)
            {
                number1 = matchRegex[1];
                number2 = matchRegex[3];
                let lastOperator = matchRegex[2].slice(-1);
                operatorFunction(lastOperator)
                
            }
        
        

        });
    });
}

enableDisplay();

// Evaluation of Expression considering single pair
function evaluate(expression, operator)
{
    let operatorEncountered = false;


    for (let ch of expression)
    {
        if ((!isNaN(parseInt(ch)) && operatorEncountered === false) || (ch === "." && operatorEncountered === false))
        {
           number1 += ch;
           
        }
        else if ((operatorEncountered === true) || (ch === "." && operatorEncountered === true))
        {
            number2 += ch;
        }
        else
        {
            operatorEncountered = true;
            operator = ch;
        }
    }

    return operator;
}

// For Clear Button
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", reset);

function reset()
{
    display.textContent = "";
    number1 = "";
    number2 = "";
    displayString = "";
    operator = "";
}