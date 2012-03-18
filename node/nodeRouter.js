var posts = require('./posts.js');

console.log(posts);

function run(funct, data, res){
	if(data != undefined){
		data = JSON.parse(data);
	}
	res(funct(data));
}

exports.getPost= function(req, res, data){
		run(posts.getPost, data, res);
	},
exports.getList = function(req, res, data){
		console.log("r: Get LIST");
		run(posts.getPostList, data, res);
	}
exports.getOrder = function(req, res, data){
		run(posts.getPostOrder, data, res);
	}
