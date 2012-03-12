var fs = require('fs');

var fileName = "posts.txt";
var postCollection = [];
var tags = {};
var postShort = [];

fs.readFile(fileName, function(data){
	parsePosts(JSON.parse(data));
});

function parsePosts(posts){
	for(var post in posts){
		postCollection.push(posts[post]);
		for(var tag in posts[post].tags){
			var tag = posts[post].tags;
			if(tags[tag] == undefined){ tags[tag] = [];}
			tags[tag].push(posts[post]);
		}
		
	}	
}

exports = {
	getPosts: function(from, to){
		return postCollection.slice(from, to-from);
	},
	getTag: function(rTags){
		var returnV = [];
		for(var tag in rTags){
		 	returnV.push(JSON.stringify(tags[tag]));	
		}
		return returnV.join();
	}
}
