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

	$('#postText').keyup(function(){
    	let postData = document.getElementById("postText").value;

		updateCharsLeft(postData);
	});
});