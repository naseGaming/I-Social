$(document).ready(function () {

	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.showName(model, view);
	controller.checkStatus(model, view);
	controller.getPosts(model, view);

    $("#left-logout").click(function () {
    	controller.logout(model, view);
	});

    $("#postBtn").click(function () {
    	controller.postData = document.getElementById("postText").value;

    	controller.newPost(model, view);
	});
});

class HomeView{
	displayName(name){
		document.getElementById("userName").innerHTML = name;
	}

	logError(data){
		console.log(data);
	}

	goLogout(){
		location.href = "../ISocial/";
	}

	clearNewPost(){
		document.getElementById("postText").value = "";
	}

	showPosts(data){
		document.getElementById("newsfeed").innerHTML = data;
	}
}

class HomeModel{
	constructor(firstname, lastname, id){
		this._firstname = firstname;
		this._lastname = lastname;
		this._id = id;
	}

	showNameProcess(){
		this._firstname = sessionStorage.getItem('firstname');
		this._lastname = sessionStorage.getItem('lastname');
		return this._firstname + " " + this._lastname;
	}

	getIdProcess(){
		this._id = sessionStorage.getItem('id');
		return this._id;
	}

	logoutProcess(id){
        return $.ajax({
			type: "POST",
			url: '/ISocial/Process/logout.php',
			data: jQuery.param({ id: id}),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (responses) {
			},
			error: function () {
			}
		});
	}

	newPostProcess(id, data){
        return $.ajax({
			type: "POST",
			url: '/ISocial/Process/newPost.php',
			data: jQuery.param({ id: id, data: data}),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (responses) {
			},
			error: function () {
			}
		});
	}

	getPostsProcess(id){
        return $.ajax({
			type: "POST",
			url: '/ISocial/Process/getPost.php',
			data: jQuery.param({ id: id}),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (responses) {
			},
			error: function () {
			}
		});
	}
}

class HomeController{
	constructor(name, id, postData){
		this._name = name;
		this._id = id;
		this.postData = postData;
	}

	showName(model, view){
		this._name = model.showNameProcess();
		this._id = model.getIdProcess();

		view.displayName(this._name);
	}

	logout(model, view){
		$.when(model.logoutProcess(this._id)).done(function (result){
			if(result == "Success"){
				sessionStorage.clear();
				view.goLogout();
			}
			else{
				view.logError(result);
			}
		});
	}

	newPost(model, view){
		$.when(model.newPostProcess(this._id, this.postData)).done(function (result){
			if(result == "Success"){
				view.clearNewPost();
				
			}
			else{
				view.logError(result);
			}
		});
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
	}

	checkStatus(model, view){
		if(this._id === ""){
			view.goLogout();
		}
	}

	getPosts(model, view){
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
	}
}

function goProfile(app){
}