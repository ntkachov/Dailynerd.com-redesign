var fs = require('fs');
var posts = require("./posts.js");
var filename = "post.json";

var password = fs.readFileSync("password.txt", "utf8").replace(/(\r\n|\n|\r)/gm,"");
console.log(password);
//For my personal use only. Not supposed to be robust or used during high traffic. Simple system to update posts
//infrequently. 
//Uses a simple method of read all the posts, append to all the posts, write everything back. Good enough. 
exports.submitPost = function(post){	
	var return_ = "sucess"; 
	if(post.password == password){
		delete post.password
		try{
			var data = fs.readFileSync(filename, "utf8")
			var posts = JSON.parse(data);
			var time = new Date().getTime();	
			post.time = time;
			posts.push(post);
			try{
				fs.writeFileSync(filename, JSON.stringify(posts), "utf8");
			}
			catch(err){
						return_ = "Error writing to file";
			}
		}
		catch(err){
			console.log(err);	
			return_ =  "Error reading file";
		}
	}
	else{
		console.log('"' + post.password + '""' + password+'"');
		return_ = "Incorrect password";
	}
	posts.refresh();
	return return_;
};
