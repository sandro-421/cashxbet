let usernameBox = document.getElementById("login");
let usernameField = document.getElementById("userid");
let balanceField = document.getElementById("balance");

let username = localStorage.getItem("username");
let balance = parseInt(localStorage.getItem("balance"));

usernameField.innerHTML = username;
balanceField.innerHTML = balance;

function logIn() {
    localStorage.setItem('username', usernameBox.value);
    username = localStorage.getItem("username");
    usernameField.innerHTML = username;
    alert("Success");
}
