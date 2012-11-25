var http = require('http');

http.createServer(function(req,res){
	res.writeHeader(200,{'Content-Type':'text/plain'});
	res.end('Hello World\n');
}).listen(8081);
http.on();


