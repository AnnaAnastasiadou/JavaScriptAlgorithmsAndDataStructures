const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    return phoneRegex.test(phoneNumber);
};

checkButton.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") {
        alert("Please provide a phone number");
    }
    else if (validatePhoneNumber(userInput)){
        resultsDiv.innerHTML += `<p class="valid">Valid US number: ${userInput}</p>` 
    }
    else {
        resultsDiv.innerHTML += `<p class="invalid">Invalid US number: ${userInput}</p>`
    }
    document.getElementById('user-input').value = "";
});

clearButton.addEventListener('click', () => {
    resultsDiv.innerHTML = "";
});