var fs = require('fs');
var pc = require("./posts.js");
var filename = "post.json";

console.log(posts);

var password = fs.readFileSync("password.txt", "utf8").replace(/(\r\n|\n|\r)/gm,"");
console.log(password);



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
	pc.refresh();
	return return_;
};
