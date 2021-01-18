$(document).ready(function () {

	var view = new View;
	var model = new Model;
	var controller = new Controller;

	$("#frmRegister").hide();
	view.deleteButton();

    $("#forget").click(function () {
		$("#frmRegister").hide();
		$("#frmLogin").hide();
    });

    $("#create").click(function () {
		$("#frmLogin").hide();
		$("#frmRegister").show();
    });

    $("#log").click(function () {
		$("#frmRegister").hide();
		$("#frmLogin").show();
    });

    $("#login").click(function () {
        controller.logUser = document.getElementById("username").value;
        controller.logPass = document.getElementById("password").value;

        //checks if inputs are empty
        controller.checkLogin(view);
        //generates code to use if necessary
        controller.codeGenerator();
        //puts the code to its right input box automatically
        document.getElementById("userCode").value = controller.code;
        //calls the method for login
        if(controller.valid){
        	controller.login(model ,view);
        }
    });

    $("#register").click(function () {
        controller.regUser = document.getElementById("regUser").value;
        controller.regPass = document.getElementById("regPass").value;
        controller.regConf = document.getElementById("regConf").value;
        controller.regFirst = document.getElementById("regFirst").value;
        controller.regMid = document.getElementById("regMid").value;
        controller.regLast = document.getElementById("regLast").value;
        controller.regEmail = document.getElementById("regEmail").value;

        //checks if inputs are empty
        controller.checkInput(view);
        //calls the method for register
        if(controller.flag){
        	controller.register(model, view);
        }    
    });

    $("#verify").click(function () {
    	controller.logCode = document.getElementById("userCode").value;

    	//calls the method for verifying the user
    	controller.verifyUser(model, view);
    });
});

class View{
	empty(data, field){
		//prints error when inputs are empty
		document.getElementById("errR").innerHTML = data;
        $("#"+field).removeClass().addClass('inputsWrong');
	}

	error(data, field){
		//prints error when inputs contains invalid characters
		document.getElementById("errR").innerHTML = data;
		document.getElementById(""+field).innerHTML = "";
        $("#"+field).removeClass().addClass('inputsWrong');
    }

    noerror(){
    	//removes all error indicator
        $("#regUser").removeClass().addClass('inputs');
        $("#regPass").removeClass().addClass('inputs');
        $("#regConf").removeClass().addClass('inputs');
        $("#regFirst").removeClass().addClass('inputs');
        $("#regMid").removeClass().addClass('inputs');
        $("#regLast").removeClass().addClass('inputs');
        $("#regEmail").removeClass().addClass('inputs');
    }

    success(data, field){
    	//prints success
		document.getElementById(""+field).innerHTML = data;
    }

    logError(data, field){
    	//prints if login credentials are empty
		document.getElementById("err").innerHTML = data;
		document.getElementById(""+field).innerHTML = "";
        $("#"+field).removeClass().addClass('inputsWrong');
    }

    internalError(data){
    	//prints other internal scripts error
		document.getElementById("err").innerHTML = data;
    }

    login(){
    	//log in if credentials are right
        $("#username").removeClass().addClass('inputs');
        $("#password").removeClass().addClass('inputs');
        location.href = "../ISocial/Home.php";
    }

    makeButton(){
    	//shows the verify button if necessary
		$("#userCode").show();
		$("#verify").show();
    }

    deleteButton(){
    	//hides the verify button
		$("#userCode").hide();
		$("#verify").hide();
    }
}

class Model{
	//ajax for calling the login php file
	loginProcess(loginUser, loginPass, code){
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
	registerProcess(user, pass, first, mid, last, email){
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
	verifyUserProcess(loginUser){
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

	saveActivity(id, data){
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
}

class Controller{
	//constructor for controller class
	constructor(regUser, regPass, regConf, regFirst, regMid, regLast, regEmail, validChars, validEmail, validName, flag, logUser, logPass, valid, code, logCode){
		this.regUser = regUser;
		this.regPass = regPass;
		this.regConf = regConf;
		this.regFirst = regFirst;
		this.regMid = regMid;
		this.regLast = regLast;
		this.regEmail = regEmail;
        this.validChars = /^[A-Z a-z 0-9]+$/;
        this.validName = /^[A-Z a-z]+$/;
        this.validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
		this.flag = false;
		this.logUser = logUser;
		this.logPass = logPass;
		this.valid = false;
		this.code = code;
		this.logCode = logCode;
	}

	//checks the values returned by the login php file
	login(model, view){
		$.when(model.loginProcess(this.logUser, this.logPass, this.code)).done(function (result) {
            if (result == "Pass") {
                //incorrect password
                view.logError("Incorrect Password!", "password");
            }
            else if (result == "User") {
                //username does not exist
                view.logError("Username does not exist!", "username");
            }
            else if(result == "Error Sql 1") {
            	//internal error
                view.internalError(result);
            }
            else if(result == "Verify"){
            	//verifies the user autenthicity
            	view.makeButton();
            	view.internalError("An Email is sent to you.");
            }
            else{
                //succesful login
				let data = result.split("/");

				window.sessionStorage.setItem('id', data[0]);
				window.sessionStorage.setItem('firstname', data[1]);
				window.sessionStorage.setItem('lastname', data[2]);
                view.login();
				model.saveActivity(data[0], data[0]+"/Logged In");
            }
        });
	}

	//checks the values returned by the register php file
	register(model, view){
		$.when(model.registerProcess(this.regUser, this.regPass, this.regFirst, this.regMid, this.regLast, this.regEmail)).done(function (result){
			if(result == "User" ){
				//username already exist
				view.error("Username Already Exist!", "regUser");
			}
			else if(result == "Email"){
				//email already exist
				view.error("Email Already Exist!", "regEmail");
			}
			else if(result == "Go"){
				//succesful registration
				view.noerror();
				view.success("Registeration Complete!", "errR");
			}
			else{
				//internal error
				view.error(result, "regUser");
			}
		});
	}

	//checks if login input boxes are empty
	checkLogin(view){
		if(this.ifEmpty(this.logUser)){
			this.valid = false;
            view.logError("Username cannot be empty!", "username");
		}
		else if(this.ifEmpty(this.logPass)){
			this.valid = false;
            view.logError("Password cannot be empty!", "password");
		}
		else{
			this.valid = true;
		}
	}

	//checks if register input boxes are empty or has invalid characters on it
	checkInput(view){
		view.noerror();
		if(this.ifEmpty(this.regUser)){
			this.flag = false;
			view.empty("Username should not be empty!", "regUser");
		}
		else if(this.ifEmpty(this.regPass)){
			this.flag = false;
			view.empty("Password should not be empty!", "regPass");
		}
		else if(this.ifEmpty(this.regFirst)){
			this.flag = false;
			view.empty("First Name should not be empty!", "regFirst");
		}
		else if(this.ifEmpty(this.regLast)){
			this.flag = false;
			view.empty("Last Name should not be empty!", "regLast");
		}
		else if(this.ifEmpty(this.regEmail)){
			this.flag = false;
			view.empty("Email should not be empty!", "regEmail");
		}
		else{
			if(!this.regUser.match(this.validChars)){
				this.flag = false;
				view.error("Username should not contain symbols!", "regUser");
			}
			else if(!this.regPass.match(this.validChars)){
				this.flag = false;
				view.error("Password should not contain symbols!", "regPass");
			}
			else if(!this.regFirst.match(this.validName)){
				this.flag = false;
				view.error("Name should not contain symbols and numbers!", "regFirst");
			}
			else if(!this.regMid.match(this.validName)){
				this.flag = false;
				view.error("Name should not contain symbols and numbers!", "regMid");
			}
			else if(!this.regLast.match(this.validName)){
				this.flag = false;
				view.error("Name should not contain symbols and numbers!", "regLast");
			}
			else if(!this.regEmail.match(this.validEmail)){
				this.flag = false;
				view.error("Invalid Email!", "regEmail");
			}
			else{
				if(!this.regPass == this.regConf){
					this.flag = false;
					view.error("Password does not match!", "regConf");
				}
				else{
					this.flag = true;
					view.noerror();
				}
			}
		}
	}

	//checks if input boxes has an empty value on it
	ifEmpty(data){
		if(data === ""){
			return true;
		}
		else{
			return false;
		}
	}

	//generates the code for verifying the user
	codeGenerator(){
		let result = "";
	    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    let charactersLength = characters.length;
	    for ( var i = 0; i < 5; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	    }

	    this.code = result;
	}

	//checks the values returned by verify User php file
	verifyUser(model, view){
		if(this.code == this.logCode){
			$.when(model.verifyUserProcess(this.logUser)).done(function (result) {
				if(result == "Success"){
					view.deleteButton();
				}
				else{
					view.internalError(result);
				}
			});
		}
		else{
            view.internalError("Wrong Code!");
		}
	}
}