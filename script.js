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
document.getElementById("expAmount").innerHTML = `<h3 id="expAmount" class="mt-5 "> Rs ${registerDetails.expense}/-</h3>`;
//------------------------------------------------------------------------------------------------------------------------//

// //income table display



// var registerDetails = JSON.parse(localStorage.getItem(logkey));

// var currentDate = new Date();
// var formattedDate = currentDate.toLocaleString();

// let incomeobj = {
//     type: incomeType.value,
//     amount: incomeAmount.value,
//     balance: registerDetails.balance,
//     date: formattedDate
// }

// incomeDetails.innerHTML += `<tr style="border-bottom: 2px green solid; " >
//                 <td>${incomeobj.type}</td>
//                 <td>${incomeobj.amount}</td>
//                 <td>${incomeobj.balance}</td>
//                 <td>${incomeobj.date}</td>
//                 </tr>`

//-----------------------------------------------------------------------------------------------------------------------------//



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
        balance: 0,
        incomearray: [],
        expensearray: []

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
            window.location = "./index.html"
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
                window.location = "./home.html"

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
    incomeamount = incomeAmount.value
    incomeamount = Math.floor(incomeamount)


    if (incomeType.value == "" || incomeAmount.value == "") {
        alert("Enter All Fields")
    } else {

        registerDetails = JSON.parse(localStorage.getItem(logkey))


        // Update balance
        registerDetails.balance += incomeamount
        registerDetails.incometype = incometype
        // Update localStorage with updated balance
        localStorage.setItem(logkey, JSON.stringify(registerDetails))
        // Update balance display on the screen
        document.getElementById("balanceAmount").innerHTML = `<h3 id="balanceAmount" class="mt-5 "> Rs ${registerDetails.balance}/-</h3>`
        alert("Amount Added Successfully")

        //update balance display on table

        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleString();

        let incomeobj = {
            type: incometype,
            amount: incomeamount,
            balance: registerDetails.balance,
            date: formattedDate
        }

        registerDetails.incomearray.push(incomeobj)

        localStorage.setItem(logkey, JSON.stringify(registerDetails))



        incomeDetails.innerHTML += `<tr style="border-bottom: 2px green solid; " >
                <td>${incomeobj.type}</td>
                <td>${incomeobj.amount}</td>
                <td>${incomeobj.balance}</td>
                <td>${incomeobj.date}</td>
                </tr>`

        incomeType.value = ""; // Clear income type input field
        incomeAmount.value = ""; // Clear income amount input field
    }
}


//add expense

function addExpense() {
    expensetype = expenseType.value
    expenseamount = expenseAmount.value
    expenseamount = Math.floor(expenseamount)

    if (expenseType.value == "" || expenseAmount.value == "") {
        alert("Enter All Fields")
    } else {
        registerDetails = JSON.parse(localStorage.getItem(logkey))
        console.log(registerDetails);
        if (expenseAmount.value > registerDetails.balance) {
            alert("Insufficient Balance")
        } else {
            // Update balance
            registerDetails.expense += expenseamount
            registerDetails.balance -= expenseamount

            //Update localStorage with updated balance
            localStorage.setItem(logkey, JSON.stringify(registerDetails))
            // Update balance display on the screen
            document.getElementById("balanceAmount").innerHTML = `<h3 id="balanceAmount" class="mt-5 "> Rs ${registerDetails.balance}/-</h3>`

            document.getElementById("expAmount").innerHTML = `<h3 id="expAmount" class="mt-5 "> Rs ${registerDetails.expense}/-</h3>`
            alert("Amount Added Successfully")

            //update expense display on table

            var currentDate = new Date();
            var formattedDate = currentDate.toLocaleString();

            let expenseobj = {
                type: expensetype,
                amount: expenseamount,
                balance: registerDetails.expense,
                date: formattedDate
            }

            registerDetails.expensearray.push(expenseobj)

            localStorage.setItem(logkey, JSON.stringify(registerDetails))



            expenseDetails.innerHTML += `<tr style="border-bottom: 2px green solid; " >
                <td>${expenseobj.type}</td>
                <td>${expenseobj.amount}</td>
                <td>${expenseobj.balance}</td>
                <td>${expenseobj.date}</td>
                </tr>`




            expenseType.value = ""; // Clear expense type input field
            expenseAmount.value = ""; // Clear expense amount input field 
        }
    }
}



//clear

function clearAll(){
    registerDetails = JSON.parse(localStorage.getItem(logkey))
    console.log(registerDetails);

    registerDetails.expense= 0
    registerDetails.balance= 0
    registerDetails.incomearray= []
    registerDetails.expensearray= []
    localStorage.setItem(logkey, JSON.stringify(registerDetails))
    incomeDetails.innerHTML=''
    expenseDetails.innerHTML=''
    balanceAmount.innerHTML=''
    expAmount.innerHTML=''
    alert('Cleared all data successfully')
    location.reload()
}


function logout(){
    window.location='./index.html';
}




