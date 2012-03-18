var fs = require('fs');

var fileName = "post.json";
var postCollection = [];
var postChrono = {};
var sortedChrono = [];

fs.readFile(fileName, "utf8",  function(err, data){
	if(err){
		console.log(err);	
		return;
	}
	parsePosts(JSON.parse(data));
});

function parsePosts(posts){
	for(var post in posts){
		post = posts[post];
		postCollection.push(posts[post]);
		postChrono[post.time] = post;
		sortedChrono.push(post.time);
	}
	sortedChrono.sort();
	sortedChrono.reverse();
	console.log(sortedChrono);
}

exports.getPost=function(timeStamp){
		return postChrono[timeStamp]; ;
	}
exports.getPostOrder = function (data){
		return  JSON.stringify(sortedChrono);
	}
exports.getPostList = function(data){
	var from = data[0], to = data[1];
	var postList = [];
	for(var i = from; i <= to; i++){
		postList.push(postChrono[sortedChrono[i]]);
	}
	return JSON.stringify(postList);
}

