http = require('http');
router = require('./nodeRouter.js');

http.createServer(connectionManager).listen(8000);
var throwerror = true;

function connectionManager(req, res) {
	var data;
	var url = req.url.substring(6, req.url.length);
	console.log(url);
	req.on('data', function(chunk) {
		chunk = unescape(chunk.toString());
		chunk = chunk.replace(/\+/g, ' ');
		data = chunk;
	});
	req.on('end', function(){
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		if(router[url] != undefined){
			if(throwerror){
				router[url](req, function(resp){
				res.end(resp);},data);
			}
			else{
				try{
					router[url](req, function(resp){
					res.end(resp);},data);
				}
				catch(err){
					console.log(err);
				}
			}
		}
		else{
			console.log(url + " does not exist");
		}
	});
};
