var posts = require('./posts.js');
function run(funct, data, res){
	data = JSON.parse(data);
	funct(data, res);
}

exports= {
	getPost: function(req, res, data){
		run(posts.getPost, data, res);
	}
};
