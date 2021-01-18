$(document).ready(function () {

	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.showName(model, view);
	controller.checkStatus(model, view);
	controller.getPosts(model, view);
	controller.hideDivs(view);

    $("#left-logout").click(function () {
    	controller.logout(model, view);
	});

    $("#postBtn").click(function () {
    	controller.postData = document.getElementById("postText").value;

    	let flag = controller.verifyPostData();
    	if(flag == true){
    		controller.newPost(model, view);
    	}
    	else{
    		controller.showError(view);
    	}
	});

	$('#postText').keyup(function(){
    	controller.postData = document.getElementById("postText").value;

		controller.updateCharsLeft(model, view);
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

	disablePostBtn(){
		$('#postBtn').attr('disabled','disabled');
		$("#postBtn").removeClass().addClass('disabled');
		$("#charactersLeft").removeClass().addClass('charactersLeftError');
	}

	enableBtn(){
    	$('#postBtn').removeAttr('postBtn');
		$("#postBtn").removeClass().addClass('postBtn');
		$("#charactersLeft").removeClass().addClass('charactersLeft');
	}

	showRemainingNumber(data){
		document.getElementById("charactersLeft").innerHTML = data;
	}

	hideSuccess(){
		$("#successPost").hide();
	}

	showSuccess(data){
		document.getElementById("successPost").innerHTML = data;
		$("#successPost").slideDown();
		setTimeout(function(){ 
			$("#successPost").slideUp(); 
		}, 2000);
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

	deletePostProcess(id){
        return $.ajax({
			type: "POST",
			url: '/ISocial/Process/deletePost.php',
			data: jQuery.param({ id: id}),
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function (responses) {
			},
			error: function () {
			}
		});
	}

	reactPostProcess(postId, id, reaction){
        return $.ajax({
			type: "POST",
			url: '/ISocial/Process/reactPost.php',
			data: jQuery.param({ postId: postId, id: id, reaction: reaction }),
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

class HomeController{
	constructor(name, id, postData, charResult, postId, reactClass){
		this._name = name;
		this._id = id;
		this.postData = postData;
		this._charResult = charResult;
		this.postId = postId;
		this.reactClass = reactClass;
	}

	showName(model, view){
		this._name = model.showNameProcess();

		view.displayName(this._name);
	}

	logout(model, view){
		this._id = model.getIdProcess();
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
		this._id = model.getIdProcess();
		$.when(model.newPostProcess(this._id, this.postData)).done(function (result){
			if(result == "Success"){
				view.clearNewPost();
				view.showSuccess("Posted Successfully <i class='fas fa-check-circle'></i>");
			}
			else{
				view.logError(result);
			}
		});
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
		model.saveActivity(this._id, "Posted/"+this.postData);
	}

	checkStatus(model, view){
		this._id = model.getIdProcess();
		if(this._id === ""){
			view.goLogout();
		}
	}

	getPosts(model, view){
		this._id = model.getIdProcess();
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
	}

	verifyPostData(){
		if(this.postData.length > 255){
			return false;
		}
		else{
			return true;
		}
	}

	showError(view){
		view.disablePostBtn();
	}

	updateCharsLeft(model, view){
		this._charResult = 255 - this.postData.length;

		if(this._charResult >= 0){
			view.showRemainingNumber(this._charResult);
			view.enableBtn();
		}
		else{
			view.showRemainingNumber(this._charResult);
			view.disablePostBtn();
		}
	}

	deletePost(model, view){
		this._id = model.getIdProcess();
		$.when(model.deletePostProcess(this.postId)).done(function (result){
			view.logError(result);
			view.showSuccess("Deleted Successfully <i class='fas fa-check-circle'></i>");
		});
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
		model.saveActivity(this._id, "Deleted the post/"+this.postId);
	}

	hideDivs(view){
		view.hideSuccess();
	}

	agreePost(model, view){
		this._id = model.getIdProcess();
		$.when(model.reactPostProcess(this.postId, this._id, "1")).done(function (result){
			if(result == "Reacted"){
				//success
				model.saveActivity(this._id, "Agreed to the post/"+this.postId);
			}
			else if(result == "Deleted"){
				model.saveActivity(this._id, "Removed reaction to the post/"+this.postId);
			}
			else if(result == "Edited"){
				model.saveActivity(this._id, "Changed reaction to agree the post/"+this.postId);			
			}
			else{
				view.logError(result);
			}
		});
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
	}

	disAgreePost(model, view){
		this._id = model.getIdProcess();
		$.when(model.reactPostProcess(this.postId, this._id, "0")).done(function (result){
			if(result == "Reacted"){
				//success
				model.saveActivity(this._id, "Agreed to the post/"+this.postId);
			}
			else if(result == "Deleted"){
				model.saveActivity(this._id, "Removed reaction to the post/"+this.postId);
			}
			else if(result == "Edited"){
				model.saveActivity(this._id, "Changed reaction to disagree the post/"+this.postId);			
			}
			else{
				view.logError(result);
			}
		});
		$.when(model.getPostsProcess(this._id)).done(function (result){
			view.showPosts(result);
		});
	}
}

function goProfile(app){
}

function deletePost(app){
	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.postId = app.id;

	controller.deletePost(model, view);
}

function agreePost(app){
	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.postId = app.name;

	controller.agreePost(model, view);
}

function disAgreePost(app){
	var view = new HomeView;
	var model = new HomeModel;
	var controller = new HomeController;

	controller.postId = app.name;

	controller.disAgreePost(model, view);
}