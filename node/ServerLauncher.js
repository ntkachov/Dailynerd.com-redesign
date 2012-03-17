http = require('http');
router = require('./nodeRouter.js');

http.createServer(connectionManager).listen(8000);

console.log(router);

function connectionManager(req, res) {
	var data;
	var url = req.url.substring(6, req.url.length);
	console.log(url);
	req.on('data', function(chunk) {
		console.log("data");
		chunk = unescape(chunk.toString());
		chunk = chunk.replace(/\+/g, ' ');
		data = chunk;
	});
	req.on('end', function(){
		console.log("end");
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		if(router[url] != undefined){
		//	try{
			router[url](req, function(resp){
				res.end(resp);},data);
			/*}
			catch(err){
				console.log();
			}*/
		}
		else{
			console.log(url + " does not exist");
		}
	});
};
