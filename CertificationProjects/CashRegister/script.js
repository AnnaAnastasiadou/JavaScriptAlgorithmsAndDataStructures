let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const coinValues = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100
};

const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');

// Display the initial cash in drawer
const cidContainer = document.getElementById('receipt');
cidContainer.innerHTML = `<h2>Change in drawer:</h2>`;
cid.forEach(item => {
    cidContainer.innerHTML += `<p>${item[0]}: $${item[1].toFixed(2)}</p>`;
});


// Function to check user input for valid cash amount
const checkUserInput = (input) => {
    if (input === "" || input <= 0) {
        alert("Please enter a valid amount.");
        return false;
    }
    else {
        return true;
    }
};

// Function to calculate change and update the change due section
const calculateChange = (change) => {
    let changeObj = cid.map(item => {
        return{
            name: item[0],
            value: coinValues[item[0]] * 100,
            totalAmount: item[1] * 100,
            numberOfCoinsUsed: 0
        };
    });

    // Calculate total CID in cents
    const totalCID = changeObj.reduce((sum, coin) => sum + coin.totalAmount, 0);
    
    // Check if CID is less than change needed
    if (totalCID < change) {
        changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
        return;
    }

    // Sort from highest to lowest denomination
    changeObj = changeObj.sort((a, b) => b.value - a.value);

     let remainingChange = change;
    changeObj.forEach(coin => {
        while (coin.totalAmount > 0 && remainingChange >= coin.value) {
            remainingChange -= coin.value;
            coin.totalAmount -= coin.value;
            coin.numberOfCoinsUsed++;
        }
    });

    // Check if exact change could be given
    if (remainingChange > 0) {
        changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
        return;
    }

    // Check if CID equals change (CLOSED status)
    if (totalCID === change) {
        changeDue.innerHTML = `
            <p>Status: CLOSED</p>`;
    }

     // OPEN status - display change breakdown
     if (totalCID === change) {
        changeDue.innerHTML = `
            <p>Status: CLOSED</p>`;
    }
    else {
        changeDue.innerHTML = `
            <p>Status: OPEN</p>`;
    }

    const usedCoins = changeObj
        .filter(coin => coin.numberOfCoinsUsed > 0)
        .sort((a, b) => a.value - b.value); // Sort lowest to highest denomination

    changeDue.innerHTML += `
        ${usedCoins.map(coin => 
            `<p>${coin.name}: $${(coin.value * coin.numberOfCoinsUsed / 100).toFixed(2)}</p>`
        ).join("")}
    `;

};

// Function to check cash register and calculate change
const checkCashRegister = (amount) => {
    if (!checkUserInput(amount)) {
        return;
    }
    if (amount < price) {
        alert("Customer does not have enough money to purchase the item.");
        return;
    }
    if (amount === price) {
        changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
        return;
    }
    // Convert to cents to avoid floating-point errors
    const change = Math.round((amount - price) * 100);
    calculateChange(change);
    cash.value = ""; // Clear input after processing
};

purchaseBtn.addEventListener('click', () => {
    const cashFloat = parseFloat(cash.value);
    checkCashRegister(cashFloat);
});

cash.addEventListener('keydown', (e) => {
    const cashFloat = parseFloat(cash.value);
    if (e.key === 'Enter') {
        checkCashRegister(cashFloat);
    }
});