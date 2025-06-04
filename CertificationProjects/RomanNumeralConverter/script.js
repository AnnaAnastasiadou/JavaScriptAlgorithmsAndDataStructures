const input = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const resultContainer = document.getElementById("result-container");
const output = document.getElementById("output");

const checkUserInput = () => {
    const inputInt = parseInt(input.value);
    console.log(inputInt);
    resultContainer.style.display = "block";
    if (isNaN(inputInt)) {
        output.textContent = "Please enter a valid number";
        return;
    }
    else if (inputInt < 1) {
        output.textContent = "Please enter a number greater than or equal to 1";
        return;
    }
    else if (inputInt > 3999) {
        output.textContent = "Please enter a number less than or equal to 3999";
        return;
    }

    output.textContent = "";//convertToRoman(inputInt);
    input.value = "";
}

convertButton.addEventListener("click", checkUserInput);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
})