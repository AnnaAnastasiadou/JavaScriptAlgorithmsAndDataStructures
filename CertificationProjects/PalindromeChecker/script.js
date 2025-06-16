const result = document.getElementById("result");
const checkButton = document.getElementById("check-btn");

function convertToAlphanumeric(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");   
}

function isPalindrome(str) {
    str = convertToAlphanumeric(str);
    const reversedStr = str.split("").reverse().join("");
    return str === reversedStr;
}

function displayPalindromeResult(str) {
    result.classList.remove("palindrome");
    result.classList.remove("not-palindrome");
    if (isPalindrome(str)) {
        result.innerHTML = `${str} is a palindrome.`;
        result.classList.add("palindrome");
    }
    else {
        result.innerHTML = `${str} is not a palindrome.`;
        result.classList.add("not-palindrome");
    }

}

checkButton.addEventListener("click", () => {
    const text = document.getElementById("text-input").value;
    if (text === "") {
        alert("Please input a value");
    }
    displayPalindromeResult(text);
    result.style.display = "block";
    document.getElementById("text-input").value = "";
});

//The enter key triggers the check button click event
document.getElementById("text-input").addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        e.preventDefault();
        checkButton.click(); 
    }
});
