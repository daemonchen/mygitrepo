var port=8081;
var http=require('http');
var queryString=require('querystring');
var connect=require('connect');
var async=require('async');
var fs=require('fs');
var keyValue='';
var result=[0];
connect()
.use(connect.static(__dirname+'/'))
.use('/sendUrl',function(req,res){
	var postData='';
	result[0]=0;
	req.on('data',function(chunk){
		postData+=chunk;
	});
	req.on('end',function(){
		var url=queryString.parse(postData)['url'];
		keyValue=queryString.parse(postData)['key'];
		waterfallFunction(url,res);
		res.setHeader('Content-Type','text/plain');
		res.end('请打开result.json文件查看结果');
	});
	})
.listen(port);
console.log('server is started');
var waterfallFunction=function(url,res){
	var targetResponse=res;
	async.waterfall([
	function(callback){
	http.get(url,function(res){
		var chunk='';
		res.on('data',function(data){
			chunk+=data;
		});
		res.on('end',function(){
			callback(null,chunk);
		});
	});	
	
	},
	function(data,callback){
		var dataRegular=/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
		var result=[];
		var currentResult;
		while (currentResult=dataRegular.exec(data)){
			if(currentResult[1].indexOf('http')==0&&currentResult[1].indexOf('https')==-1){
				
				result.push(currentResult[1]);
				}		
			}
		callback(null,result);
	},
	function(data,callback){
		for(var i in data){
			http.get(data[i],function(res){
				var chunk='';
				res.on('data',function(data){
					chunk+=data;
				});
				res.on('end',function(){
					callback(null,chunk);
				});
			});
		}
	//	fs.writeFile('result.json',data,function(err,data){
			
	//	});
	},
	function(data,callback){
		(data.match(keyValue))?result[0]+=data.match(keyValue).length:result[0]+=0;
		//targetResponse.setHeader('Content-Type','text/plain');
		//targetResponse.end(result[0].toString());
		//console.log(result[0]);
		//result[0]+=data.match(keyValue).length;
		fs.writeFile('result.json',keyValue+':'+result[0],function(err,data){
			console.log([err,data]);
		});
	}
	],
	function(err,results){
		console.log([err,results]);
	});
};
