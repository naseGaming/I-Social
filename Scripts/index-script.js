var validChars = /^[A-Z a-z 0-9]+$/;
var validName = /^[A-Z a-z]+$/;
var validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;

function empty(data, field){
	//prints error when inputs are empty
	document.getElementById("errR").innerHTML = data;
     $("#"+field).removeClass().addClass('inputsWrong');
}

function error(data, field){
	//prints error when inputs contains invalid characters
	document.getElementById("errR").innerHTML = data;
	document.getElementById(""+field).innerHTML = "";
    $("#"+field).removeClass().addClass('inputsWrong');
}

function noerror(){
	//removes all error indicator
    $("#regUser").removeClass().addClass('inputs');
    $("#regPass").removeClass().addClass('inputs');
    $("#regConf").removeClass().addClass('inputs');
    $("#regFirst").removeClass().addClass('inputs');
    $("#regMid").removeClass().addClass('inputs');
    $("#regLast").removeClass().addClass('inputs');
    $("#regEmail").removeClass().addClass('inputs');
}

    function success(data, field){
	//prints success
	document.getElementById(""+field).innerHTML = data;
}

function logError(data, field){
	//prints if login credentials are empty
	document.getElementById("err").innerHTML = data;
	document.getElementById(""+field).innerHTML = "";
    $("#"+field).removeClass().addClass('inputsWrong');
}

function internalError(data){
	//prints other internal scripts error
	document.getElementById("err").innerHTML = data;
}

function goLogin(){
	//log in if credentials are right
    $("#username").removeClass().addClass('inputs');
    $("#password").removeClass().addClass('inputs');
    location.href = "../ISocial/Home.php";
}

function makeButton(){
	//shows the verify button if necessary
	$("#userCode").show();
	$("#verify").show();
}

function deleteButton(){
	//hides the verify button
	$("#userCode").hide();
	$("#verify").hide();
}

//ajax for calling the login php file
function loginProcess(loginUser, loginPass, code){
    return $.ajax({
        type: "POST",
        url: '/ISocial/Process/signIn.php',
        data: jQuery.param({ user: loginUser, pass: loginPass, code: code }),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (responses) {
        },
        error: function () {
        }
    });
}

//ajax for calling the register php file
function registerProcess(user, pass, first, mid, last, email){
    return $.ajax({
        type: "POST",
        url: '/ISocial/Process/signUp.php',
        data: jQuery.param({ user: user, pass: pass, first: first, mid: mid, last: last, email: email }),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (responses) {  
        },
        error: function () {
        }
    });
}

//ajax for calling the verify User php file
function verifyUserProcess(loginUser){
    return $.ajax({
        type: "POST",
        url: '/ISocial/Process/verifyUser.php',
        data: jQuery.param({ user: loginUser}),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (responses) {
        },
        error: function () {
         }
    });
}

function saveActivity(id, data){
    return $.ajax({
        type: "POST",
        url: '/ISocial/Process/activityHistory.php',
        data: jQuery.param({ id: id, data: data }),
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (responses) {
        },
        error: function () {
        }
    });
}

//checks the values returned by the login php file
function login(logUser, logPass, code){
    $.when(loginProcess(logUser, logPass, code)).done(function (result) {
        if (result == "Pass") {
            //incorrect password
            logError("Incorrect Password!", "password");
        }
        else if (result == "User") {
            //username does not exist
             logError("Username does not exist!", "username");
        }
        else if(result == "Error Sql 1") {
            //internal error
            internalError(result);
        }
        else if(result == "Verify"){
            //verifies the user autenthicity
            makeButton();
            internalError("An Email is sent to you.");
        }
        else{
            //succesful login
            let data = result.split("/");

            window.sessionStorage.setItem('id', data[0]);
            window.sessionStorage.setItem('firstname', data[1]);
            window.sessionStorage.setItem('lastname', data[2]);
            goLogin();
            saveActivity(data[0], data[0]+"/Logged In");
        }
    });
}

//checks the values returned by the register php file
function register(regUser, regPass, regFirst, regMid, regLast, regEmail){
    $.when(registerProcess(regUser, regPass, regFirst, regMid, regLast, regEmail)).done(function (result){
        if(result == "User" ){
            //username already exist
            error("Username Already Exist!", "regUser");
        }
        else if(result == "Email"){
            //email already exist
            error("Email Already Exist!", "regEmail");
        }
        else if(result == "Go"){
            //succesful registration
            noerror();
            success("Registeration Complete!", "errR");
        }
        else{
            //internal error
            error(result, "regUser");
        }
    });
}

//checks if login input boxes are empty
function checkLogin(logUser, logPass){
    if(ifEmpty(logUser)){
        return false;
        logError("Username cannot be empty!", "username");
    }
    else if(ifEmpty(logPass)){
        return false;
        logError("Password cannot be empty!", "password");
    }
    else{
        return true;
    }
}

//checks if register input boxes are empty or has invalid characters on it
function checkInput(regUser, regPass, regConf, regFirst, regMid, regLast, regEmail){
    let flag = false;
    noerror();
    if(ifEmpty(regUser)){
        flag = false;
        empty("Username should not be empty!", "regUser");
    }
    else if(ifEmpty(regPass)){
        flag = false;
        empty("Password should not be empty!", "regPass");
    }
    else if(ifEmpty(regFirst)){
        flag = false;
        empty("First Name should not be empty!", "regFirst");
    }
    else if(ifEmpty(regLast)){
        flag = false;
        empty("Last Name should not be empty!", "regLast");
    }
    else if(ifEmpty(regEmail)){
        flag = false;
        empty("Email should not be empty!", "regEmail");
    }
    else{
        if(!regUser.match(validChars)){
            flag = false;
            error("Username should not contain symbols!", "regUser");
        }
        else if(!regPass.match(validChars)){
            flag = false;
            error("Password should not contain symbols!", "regPass");
        }
        else if(!regFirst.match(validName)){
            flag = false;
            error("Name should not contain symbols and numbers!", "regFirst");
        }
        else if(!regMid.match(validName)){
            flag = false;
            error("Name should not contain symbols and numbers!", "regMid");
        }
        else if(!regLast.match(validName)){
            flag = false;
            error("Name should not contain symbols and numbers!", "regLast");
        }
        else if(!regEmail.match(validEmail)){
            flag = false;
            error("Invalid Email!", "regEmail");
        }
        else{
            if(!regPass.match(regConf)){
                flag = false;
                error("Password does not match!", "regConf");
            }
            else{
                noerror();
                flag = true;
            }
        }
    }
    return flag;
}

//checks if input boxes has an empty value on it
function ifEmpty(data){
    if(data === ""){
        return true;
    }
    else{
        return false;
    }
}

//generates the code for verifying the user
function codeGenerator(){
    let result = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     let charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//checks the values returned by verify User php file
function verifyUser(logUser, code){y
    let secureCode = sessionStorage.getItem('secureCode');
    if(code == secureCode){
        $.when(model.verifyUserProcess(logUser)).done(function (result) {
            if(result == "Success"){
                deleteButton();
            }
            else{
                internalError(result);
            }
        });
    }
    else{
        internalError("Wrong Code!");
    }
}