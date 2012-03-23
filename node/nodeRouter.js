var posts = require('./posts.js');
var submit = require('./postmaker.js');

/*run:
 *wraps a function to avoid boilerplate argument handleing.
 *Useful for simple functions that return plain text. 
 */
function run(funct, data, res){
	console.log(data);
	if(data != undefined){
		data = JSON.parse(data);
	}
	res(funct(data));
}
/*Rudamentary routing system.
 *See: ServerLauncher.js for when these functions actually get called.
 */
exports.getPost= function(req, res, data){
		console.log("r: Get POST"); //Simple log.
		run(posts.getPost, data, res);
	},
exports.getList = function(req, res, data){
		console.log("r: Get LIST");
		run(posts.getPostList, data, res);
	}
exports.getOrder = function(req, res, data){
		run(posts.getPostOrder, data, res);
	}
exports.submitPost = function(req, res, data){
		run(submit.submitPost, data, res);
	}
