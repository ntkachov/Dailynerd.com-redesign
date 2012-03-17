var fs = require('fs');

var fileName = "posts.txt";
var postCollection = [];
var tags = {};
var postShort = [];

fs.readFile(fileName, function(data){
	//parsePosts(JSON.parse(data));
});

function parsePosts(posts){
	/*for(var post in posts){
		postCollection.push(posts[post]);
		for(var tag in posts[post].tags){
			var tag = posts[post].tags;
			if(tags[tag] == undefined){ tags[tag] = [];}
			tags[tag].push(posts[post]);
		}
		
	}	*/
}

var _exports = {
	getPost:function(timeStamp){
		return " Test " ;
	},
	getPostList:function (from, to){
		console.log("postList");
		return "[a,b,ab]";
	}
}
for( var i in _exports){
	exports[i] = _exports[i];
}
