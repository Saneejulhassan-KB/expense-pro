//welcome user

var logkey = localStorage.getItem('logkey')
welcome.innerHTML = `<i class="fa-solid fa-user fa-fade"style="color: aqua;"></i> Welcome ${logkey}`

//balance display
// Retrieve user details from localStorage
var registerDetails = JSON.parse(localStorage.getItem(logkey));
// Update balance display on the screen
document.getElementById("balanceAmount").innerHTML = `<h3 id="balanceAmount" class="mt-5 "> Rs ${registerDetails.balance}/-</h3>`;

//expense display
// Retrieve user details from localStorage
var registerDetails = JSON.parse(localStorage.getItem(logkey));
// Update balance display on the screen
document.getElementById("expenseAmount").innerHTML = `<h3 id="expenseAmount" class="mt-5 "> Rs ${registerDetails.expense}/-</h3>`;



//register page button
function registerPage() {
    window.location = "./register.html"
}

//register

function register() {

    uname = registerUname.value
    email = registerEmail.value
    pswd = registerPswd.value


    registerDetails = {
        uname,
        email,
        pswd,
        expense: 0,
        balance: 0
        
    }

    console.log(registerDetails);

    if (registerUname.value == "" || registerPswd.value == "" || registerEmail.value == "") {
        alert("Enter All Fields")
    } else {
        if (email in localStorage) {
            alert("User Already Registered")
        } else {
            localStorage.setItem(uname, JSON.stringify(registerDetails))
            alert("User Registered Successfully")
            window.location = "./login.html"
        }
    }
}




// login

function login() {
    uname = loginUname.value
    pswd = loginPswd.value


    if (uname == "" || pswd == "") {
        alert("Enter All Fields")
    } else {
        if (uname in localStorage) {
            registerDetails = JSON.parse(localStorage.getItem(uname))
            if (pswd == registerDetails.pswd) {
                localStorage.setItem("logkey", uname)
                alert("Login Successfull")
                window.location = "./index.html"

            } else {
                alert("Incorrect Password")
            }
        } else {
            alert("User Doesnot Exist, Please Register")
        }
    }
}


//addincome

function addIncome() {
    incometype = incomeType.value
   /// console.log(incometype);
    incomeamount = incomeAmount.value
    incomeamount = Math.floor(incomeamount)

    if (incomeType.value == "" || incomeAmount.value == "") {
        alert("Enter All Fields")
    } else {
        
        registerDetails = JSON.parse(localStorage.getItem(logkey))
        // Update balance
        registerDetails.balance += incomeamount
        // Update localStorage with updated balance
        localStorage.setItem(logkey, JSON.stringify(registerDetails))
        // Update balance display on the screen
        document.getElementById("balanceAmount").innerHTML = `<h3 id="balanceAmount" class="mt-5 "> Rs ${registerDetails.balance}/-</h3>`
        alert("Amount Added Successfully")

        incomeType.value = ""; // Clear income type input field
        incomeAmount.value = ""; // Clear income amount input field
    }
}


//add expense

function addExpense() {
    expensetype = expenseType.value
    console.log(expensetype);
    expenseamount = expenseAmount.value
    expenseamount = Math.floor(expenseamount)

    if (expenseType.value == "" || expenseAmount.value == "") {
        alert("Enter All Fields")
    } else {
        
        registerDetails = JSON.parse(localStorage.getItem(logkey))
        console.log(registerDetails);
        // Update balance
        registerDetails.expense += expenseamount
        // Update localStorage with updated balance
        localStorage.setItem(logkey, JSON.stringify(registerDetails))
        // Update balance display on the screen
        document.getElementById("expenseAmount").innerHTML = `<h3 id="expenseAmount" class="mt-5 "> Rs ${registerDetails.expense}/-</h3>`
        alert("Amount Added Successfully")

        expenseType.value = ""; // Clear expense type input field
        expenseAmount.value = ""; // Clear expense amount input field
    }
}




