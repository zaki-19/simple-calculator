const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.dataset.value;

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      calculate();
    } else {
      display.value += value;
    }
  });
});

function calculate() {
  const expression = display.value;

  // Only allow digits and basic operators (safety check)
  if (!/^[0-9+\-*/.]+$/.test(expression)) {
    display.value = "Error";
    return;
  }

  try {
    const result = new Function("return " + expression)();

    if (!isFinite(result)) {
      display.value = "Error"; // e.g. division by zero
    } else {
      display.value = result;
    }
  } catch (error) {
    display.value = "Error";
  }
}