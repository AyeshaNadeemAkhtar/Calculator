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

let number1 = 0;
let number2;
let operator;

const display = document.querySelector(".display");

let displayString = "";

function operatorFunction(operatorArgument)
{
    let answer;

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
        case '*':
            answer = add(number1, number2);
            break;
        case '⌫':
            console.log("Cross is called"); /* bp*/
            number2 = 0;
            let newDisplayString = displayString.slice(0, -1);
            display.textContent = newDisplayString;
            return;
                
    }
    displayString = answer;
    display.textContent = displayString;
    number1 = answer;

}

// Function for display
function enableDisplay()
{
    const digits = document.querySelectorAll(".digit");
    
    

    digits.forEach(function(digit) {
        digit.addEventListener("click", () => {
        
            let digitText = digit.textContent;

            if (digitText !== "=" && digitText !== "⌫")
            {
                displayString += digitText;
            }
            

            display.textContent = displayString;

            console.log(digit); /*bp*/
            if (digitText === '1' || digitText === '2' || digitText === '3' || digitText === '4' ||
                digitText === '5' || digitText === '6' || digitText === '7' || digitText === '8' ||
                digitText === '9' || digitText === '0'
            )
            {
                if (number1 === 0)
                {
                    number1 = parseInt(digitText);
                }
                else
                {
                    number2 = parseInt(digitText);
                }

            }
            else if (digitText === "=" || digitText === "⌫")
            {
                operatorFunction(operator);
            }
            else
            {
                operator = digitText;
            }

        });
    });
}

enableDisplay();