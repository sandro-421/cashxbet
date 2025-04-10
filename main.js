let username = localStorage.getItem("username");
let balance = localStorage.getItem("balance");

let usernameField = document.getElementById("userid");
let balanceField = document.getElementById("balance");

function refreshFields() {
    username = localStorage.getItem("username");
    balance = localStorage.getItem("balance");
    usernameField.innerHTML = username;
    balanceField.innerHTML = balance;
}

refreshFields();

function topUp(ammount) {
    if (ammount < 1) {
        alert("Negative ammounts are not allowed!");
    } else {
        let tempballance;
        tempbalance = parseInt(balance) + ammount;
        localStorage.setItem("balance", tempbalance);
        refreshFields();
    }
}

function removeMoney(ammount) {
    let tempbalance;
    tempbalance = parseInt(balance) - ammount;
    if (balance < 1) {
        alert("Not enough funds!");
        return false;
    } else {
        localStorage.setItem("balance", tempbalance);
        refreshFields();
        return true;
    }
}

function resetBalance() {
    localStorage.setItem("balance", "0");
    refreshFields();
}

function pay() {
    let plusAmmount = document.getElementById("cash").value;
    topUp(parseInt(plusAmmount));
}
