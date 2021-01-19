$(document).ready(function () {
	let id = sessionStorage.getItem('id');

	showName();
	getIdProcess();
	getPosts();
	hideDivs();

    $("#left-logout").click(function () {
    	logout();
	});

    $("#postBtn").click(function () {
    	let postData = document.getElementById("postText").value;

    	let flag = verifyPostData(postData);
    	if(flag == true){
    		newPost(postData);
    	}
    	else{
    		showError(view);
    	}
	});

    $("#left-profile").click(function () {
    	goProfile();
	});

	$('#postText').keyup(function(){
    	let postData = document.getElementById("postText").value;

		updateCharsLeft(postData);
	});

	$("#search").keyup(function(){
    	let data = document.getElementById("search").value;

    	if(data == ""){
    		hideSearchResult();
    	}
    	else{
    		searchData(data);
    	}
	});
});