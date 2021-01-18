$(document).ready(function () {
	var secureCode = codeGenerator();
    window.sessionStorage.setItem('secureCode', secureCode);

	$("#frmRegister").hide();
	deleteButton();

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
        let logUser = document.getElementById("username").value;
        let logPass = document.getElementById("password").value;
        //gets code to use
        //puts the code to its right input box automatically
		let code = sessionStorage.getItem('secureCode');
        document.getElementById("userCode").value = code;
        //checks if inputs are empty
        if(checkLogin(logUser, logPass)){
        	//calls the method for login
        	login(logUser ,logPass, code);
        }
    });

    $("#register").click(function () {
        let regUser = document.getElementById("regUser").value;
        let regPass = document.getElementById("regPass").value;
        let regConf = document.getElementById("regConf").value;
        let regFirst = document.getElementById("regFirst").value;
        let regMid = document.getElementById("regMid").value;
        let regLast = document.getElementById("regLast").value;
        let regEmail = document.getElementById("regEmail").value;

        //checks if inputs are empty
        
        //calls the method for register
        if(checkInput(regUser, regPass, regConf, regFirst, regMid, regLast, regEmail)){
        	register(regUser, regPass, regFirst, regMid, regLast, regEmail);
        }    
    });

    $("#verify").click(function () {
        let logUser = document.getElementById("username").value;
    	let code = document.getElementById("userCode").value;

    	//calls the method for verifying the user
    	verifyUser(logUser, code);
    });
});