$(document).ready(function () {

	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.showName(model, view);
});

class HomeView{
	displayName(name){
		document.getElementById("userName").innerHTML = name;
	}
}

class HomeModel{
	constructor(firstname, lastname){
		this._firstname = firstname;
		this._lastname = lastname;
	}

	showNameProcess(){
		this._firstname = sessionStorage.getItem('firstname');
		this._lastname = sessionStorage.getItem('lastname');
		return this._firstname + " " + this._lastname;
	}
}

class HomeController{
	constructor(name){
		this._name = name;
	}

	showName(model, view){
		this._name = model.showNameProcess();

		view.displayName(this._name);
	}
}