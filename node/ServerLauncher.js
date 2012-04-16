var http = require('http');
var router = require('./nodeRouter.js');

http.createServer(connectionManager).listen(10000);

function connectionManager(req, res) {
	var data = "";
	var url = req.url.slice(6, req.url.length);
	console.log(url);
	req.on('data', function(chunk) {
		chunk = unescape(chunk.toString());
		chunk = chunk.replace(/\+/g, ' ');
		data += chunk;
	});
	req.on('end', function(){
		console.log("url : " + url);
		console.log("data : " + data);
		if(data === ""){
			var d = req.url.slice(req.url.indexOf("?") + 1, req.url.length);
			if(d != undefined){
				data = decodeURI(d);
				url = url.substring(0, url.indexOf("?"));
			}
		}
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		if(router[url] != undefined){ //checks to see if the router has a given function. Then executes it.
			try{
				router[url](req, function(resp){
				res.end(resp);},data);
			}
			catch(err){
				console.log(err);
				console.trace();
			}
		}
		else{
			console.log(url + " does not exist");
		}
	});
};
