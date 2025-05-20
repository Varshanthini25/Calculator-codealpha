// History storage
let history = [];
let darkMode = false;

function appendValue(value) {
    let display = document.getElementById("display");
    display.value += value; // Appends input to display
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}
function percent() {
    let display = document.getElementById("display");
    let expr = display.value;

    // Match base expression and the last number
    const match = expr.match(/(.*?)([\+\-\*\/])(\d+(\.\d+)?)$/);

    if (match) {
        let baseExpr = match[1];                  // Everything before the operator
        let operator = match[2];                  // +, -, *, or /
        let percentNumber = parseFloat(match[3]); // The number after the operator

        let baseValue = eval(baseExpr); // Evaluate the base expression (left side)

        let result;

        if (operator === '+' || operator === '-') {
            // e.g., 100 + 10% becomes 100 + (100 * 10 / 100) => 110
            result = operator === '+'
                ? baseValue + (baseValue * percentNumber / 100)
                : baseValue - (baseValue * percentNumber / 100);
        } else if (operator === '*') {
            result = baseValue * (percentNumber / 100);
        } else if (operator === '/') {
            result = baseValue / (percentNumber / 100);
        }

        display.value = result;
    } else {
        // If no operator, treat as standalone percentage
        let num = parseFloat(expr);
        if (!isNaN(num)) {
            display.value = num / 100;
        } else {
            alert("Invalid percentage operation");
        }
    }
}

function sqrt() {
    let display = document.getElementById("display");
    let num = eval(display.value);

    if (!isNaN(num)) {
        display.value = Math.sqrt(num);
    } else {
        alert("Enter a valid number before using √!");
    }
}


function insertPower() {
    let display = document.getElementById("display");
    display.value += "^"; // Inserts ^ into the display (e.g., 2^3)
}


function trigFunction(type) {
    let display = document.getElementById("display");
    let num = eval(display.value);
    let radians = num * (Math.PI / 180); // Convert degrees to radians

    if (!isNaN(num)) {
        if (type === "sin") display.value = Math.sin(radians);
        if (type === "cos") display.value = Math.cos(radians);
        if (type === "tan") display.value = Math.tan(radians);
    } else {
        alert("Enter a valid number.");
    }
}



function logFunction() {
    let display = document.getElementById("display");
    let num = eval(display.value);

    if (!isNaN(num) && num > 0) {
        display.value = Math.log(num);
    } else {
        alert("Enter a positive number for log!");
    }
}


function calculate() {
    try {
        let expression = document.getElementById("display").value;

        // Convert ^ to ** so JS can calculate powers correctly
        expression = expression.replace(/\^/g, "**");

        let result = eval(expression);
        document.getElementById("display").value = result;
        history.push(expression + " = " + result);
        updateHistory();
    } catch {
        alert("Invalid Calculation!");
    }
}




function updateHistory() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    
    history.slice(-10).forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}
function changeTheme(theme) {
  document.body.classList.remove("light-mode", "dark-mode");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  // Save the preference so it stays on reload
  localStorage.setItem("selectedTheme", theme);
}

// On page load, apply saved theme or default to light
window.onload = () => {
  const savedTheme = localStorage.getItem("selectedTheme") || "light";
  changeTheme(savedTheme);
};




function toggleScientific() {
    let sciPanel = document.getElementById("scientific");
    sciPanel.style.display = sciPanel.style.display === "grid" ? "none" : "grid";
}


function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode");
}


document.addEventListener("keydown", (event) => {
    let key = event.key;
    
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendValue(key);  // Allows numbers and operators
    } else if (key === "Enter") {
        calculate();  // Runs calculation when Enter is pressed
    } else if (key === "Backspace") {
        deleteLast();  // Deletes last entry
    } else if (key === "Escape") {
        clearDisplay();  // Clears screen when Escape is pressed
    }
});