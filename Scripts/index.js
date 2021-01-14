$(document).ready(function () {

	$("#frmRegister").hide();

	var view = new View;
	var model = new Model;
	var controller = new Controller;

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

    $("#register").click(function () {
        controller.regUser = document.getElementById("regUser").value;
        controller.regPass = document.getElementById("regPass").value;
        controller.regConf = document.getElementById("regConf").value;
        controller.regFirst = document.getElementById("regFirst").value;
        controller.regMid = document.getElementById("regMid").value;
        controller.regLast = document.getElementById("regLast").value;
        controller.regEmail = document.getElementById("regEmail").value;

        controller.checkInput(view);
        if(controller.flag){
        	controller.register(model, view);
        }    
    });
});

class View{
	empty(data, object){
		document.getElementById("errR").innerHTML = data;
        $("#"+object).removeClass().addClass('inputsWrong');
	}

	error(data, object){
		document.getElementById("errR").innerHTML = data;
		document.getElementById(object).innerHTML = "";
        $("#"+object).removeClass().addClass('inputsWrong');
    }

    noerror(){
        $("#regUser").removeClass().addClass('inputs');
        $("#regPass").removeClass().addClass('inputs');
        $("#regConf").removeClass().addClass('inputs');
        $("#regFirst").removeClass().addClass('inputs');
        $("#regMid").removeClass().addClass('inputs');
        $("#regLast").removeClass().addClass('inputs');
        $("#regEmail").removeClass().addClass('inputs');
    }

    success(data, object){
		document.getElementById(object).innerHTML = data;
    }
}

class Model{
	registerProcess(user, pass, first, mid, last, email){
		return $.ajax({
			type: "POST",
			url: '/IdleGame/Process/signUp.php/',
			data: jQuery.param({ user: user, pass: pass, first: first, mid: mid, last: last, email: email }),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (responses) {  
			},
			error: function () {
			}
		});
	}
}

class Controller{
	constructor(regUser, regPass, regConf, regFirst, regMid, regLast, regEmail, validChars, validEmail, validName, flag){
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
	}

	register(model, view){
		$.when(model.registerProcess(this.regUser, this.regPass, this.regFirst, this.regMid, this.regLast, this.regEmail)).done(function (result){
			if(result === "0"){
				view.error("Username Already Exist!");
			}
			else if(result === "1"){
				view.error("Email Already Exist!");
			}
			else{
				view.noerror();
				view.success("Registeration Complete!", "errR");
			}
		});
	}

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
			else if(!this.regEmail.match(this.validName)){
				this.flag = false;
				view.error("Invalid Email!", "regEmail");
			}
			else{
				if(this.regPass == this.regConf){
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

	ifEmpty(data){
		if(data === ""){
			return true;
		}
		else{
			return false;
		}
	}
}