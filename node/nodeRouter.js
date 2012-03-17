var posts = require('./posts.js');

console.log(posts);

function run(funct, data, res){
	if(data != undefined){
		data = JSON.parse(data);
	}
	res(funct(data));
}

var _exports ={
	getPost: function(req, res, data){
		run(posts.getPost, data, res);
	},
	getList: function(req, res, data){
		console.log("r: Get LIST");
		run(posts.getPostList, data, res);
	}
};

for( var i in _exports){
	exports[i] = _exports[i];
}
