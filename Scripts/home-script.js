function displayName(name){
	document.getElementById("userName").innerHTML = name;
}

function logError(data){
	console.log(data);
}

function goLogout(){
	location.href = "../ISocial/";
}

function clearNewPost(){
	document.getElementById("postText").value = "";
}

function showPosts(data){
	document.getElementById("newsfeed").innerHTML = data;
}

function disablePostBtn(){
	$('#postBtn').attr('disabled','disabled');
	$("#postBtn").removeClass().addClass('disabled');
	$("#charactersLeft").removeClass().addClass('charactersLeftError');
}

function enableBtn(){
   	$('#postBtn').removeAttr('postBtn');
	$("#postBtn").removeClass().addClass('postBtn');
	$("#charactersLeft").removeClass().addClass('charactersLeft');
}

function showRemainingNumber(data){
	document.getElementById("charactersLeft").innerHTML = data;
}

function hideSuccess(){
	$("#successPost").hide();
}

function hideSearchResult(){
	$("#search-result").slideUp();
}

function showSuccess(data){
	document.getElementById("successPost").innerHTML = data;
	$("#successPost").slideDown();
	setTimeout(function(){ 
		$("#successPost").slideUp(); 
	}, 2000);
}

function showSearchResult(data){
	document.getElementById("search-result").innerHTML = data;
	$("#search-result").slideDown();
}

function goToProfile(data){
	location.href = "../ISocial/Profile.php?id="+data;
}

function showNameProcess(){
	let firstname = sessionStorage.getItem('firstname');
	let lastname = sessionStorage.getItem('lastname');
	return firstname + " " + lastname;
}

function getIdProcess(){
	let id = sessionStorage.getItem('id');

	if(id === ""){
		goLogout();
	}
	else{
		return id;
	}
}

function logoutProcess(id){
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

function newPostProcess(id, data){
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

function getPostsProcess(id){
    $.ajax({
		type: "POST",
		url: '/ISocial/Process/getPost.php',
		data: jQuery.param({ id: id}),
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success: function (responses) {
			showPosts(responses);
		},
		error: function (error) {
			logError(error);
		}
	});
}

function deletePostProcess(id){
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

function reactPostProcess(postId, id, reaction){
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

function searchDataProcess(id, searchData){
    return $.ajax({
		type: "POST",
		url: '/ISocial/Process/searchData.php',
		data: jQuery.param({ id: id, searchData: searchData }),
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success: function (responses) {
		},
		error: function () {
		}
	});
}

function saveActivity(id, data){
    $.ajax({
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

function showName(){
	let name = showNameProcess();

	displayName(name);
}

function logout(){
	let id = getIdProcess();
	$.when(logoutProcess(id)).done(function (result){
		if(result == "Success"){
			sessionStorage.clear();
			goLogout();
		}
		else{
			logError(result);
		}
	});
}

function newPost(postData){
	let id = getIdProcess();
	$.when(newPostProcess(id, postData)).done(function (result){
		if(result == "Success"){
			clearNewPost();
			showSuccess("Posted Successfully <i class='fas fa-check-circle'></i>");
			getPosts();
		}
		else{
			logError(result);
		}
	});
	saveActivity(id, "Posted/"+postData);
}

function getPosts(){
	let id = getIdProcess();
	getPostsProcess(id);
}

function verifyPostData(postData){
	if(postData.length > 255){
		return false;
	}
	else{
		return true;
	}
}

function showError(view){
	view.disablePostBtn();
}

function updateCharsLeft(postData){
	let charResult = 255 - postData.length;

	if(charResult >= 0){
		showRemainingNumber(charResult);
		enableBtn();
	}
	else{
		showRemainingNumber(charResult);
		disablePostBtn();
	}
}

function hideDivs(){
	hideSuccess();
	hideSearchResult();
}

//button functions
function deletePost(app){
	let postId = app.id;
	let id = getIdProcess();
	$.when(deletePostProcess(postId)).done(function (result){
		logError(result);
		showSuccess("Deleted Successfully <i class='fas fa-check-circle'></i>");
		getPosts();
	});
	saveActivity(id, "Deleted the post/"+postId);
}

function agreePost(app){
	let postId = app.name;
	let id = getIdProcess();
	$.when(reactPostProcess(postId, id, "1")).done(function (result){
		if(result == "Reacted"){
			//success
			saveActivity(id, "Agreed to the post/"+postId);
			getPosts();
		}
		else if(result == "Deleted"){
			saveActivity(id, "Removed reaction to the post/"+postId);
			getPosts();
		}
		else if(result == "Edited"){
			saveActivity(id, "Changed reaction to agree the post/"+postId);
			getPosts();
		}
		else{
			logError(result);
		}
	});
}

function disAgreePost(app){
	let postId = app.name;
	let id = getIdProcess();
	$.when(reactPostProcess(postId, id, "0")).done(function (result){
		if(result == "Reacted"){
			//success
			saveActivity(id, "Agreed to the post/"+postId);
			getPosts();
		}
		else if(result == "Deleted"){
			saveActivity(id, "Removed reaction to the post/"+postId);
			getPosts();
		}
		else if(result == "Edited"){
			saveActivity(id, "Changed reaction to disagree the post/"+postId);
			getPosts();		
		}
		else{
			logError(result);
		}
	});
}

function searchData(data){
	let id = getIdProcess();

	$.when(searchDataProcess(id, data)).done(function (result){
		if(result == "Error Sql 1"){
			logError(result);
		}
		else if(result == "Error Sql 2"){
			logError(result);
		}
		else{
			showSearchResult(result);
			saveActivity(id, "Searched for/"+data);
		}
	});
}

function goProfile(){
	let id = getIdProcess();

	goToProfile(id);
}