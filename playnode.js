var fs =require('fs');
var async=require('async');
var defaultUser='{"name":"Daemon","sex":"male","age":25}';
var fileName='user.json';
async.waterfall([
	function(callback){
		fs.exists(fileName,function(exists){
			callback(null,exists);
			//console.log('exist??');
			//console.log(callback.toString());
	});
	},
	function(exists,callback){
		console.log('daemon');
		//console.log(exists);
		if(exists){			
			fs.readFile(fileName,function(error,data){
				console.log(['fileData',data.toString()]);
			});
			
		}
		else{
			console.log('unexist');
			//callback(null,defaultUser);
		}
	},
	function(userData,callback){
		var user=JSON.parse(userData);
		user.age++;
		console.log(user.age);
		fs.writeFile(fileName,JSON.stringify(user),callback);
	}	
	],
	function(err,results){
	console.log(['ERROR:',err,results]);
});

