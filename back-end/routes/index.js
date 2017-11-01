var express = require('express');
var router = express.Router();
var cred= require('../models/credentials.json');
var conf=require('../models/config.json')
var request = require('request');
/* GET home page. */
router.get('/get_client', function(req, res, next) {
  res.send(cred);

});
router.post('/store_ccode', function(req,res,next){
	
	if(!req.body.code){
		res.status(406).message('No code found !');
	}
	else{
		req.session.code=req.body.code;
		request.post({
			url:'https://redbooth.com/oauth2/token',
			body :{
				client_id:cred.client_id,
				client_secret:cred.client_secret,
				code:req.session.code,
				redirect_uri:conf.front_end_url+'/verified',
				grant_type:'authorization_code'
			},
			json:true
		},function(err,response,token){
			if(err){
				console.log(err, token);
				res.sendStatus(406);
			}
			if(token.access_token){
				console.log(typeof token,token)
				req.session.access_token=token.access_token;
				req.session.refresh_token=token.refresh_token;
				
				res.sendStatus(200);
			}
			else{
				console.log(token)
				console.log({
				cleint_id:cred.client_id,
				client_secret:cred.client_secret,
				code:req.session.code,
				redirect_uri:conf.front_end_url+'/verified',
				grant_type:'authorization_code'}
			)
				res.sendStatus(406);
			}
		});
	}
	
})
router.post('/process',function(req,res,next){
	if(!req.body.data){
		console.log(req.session);
		res.sendStatus(403);
	}
	//console.log(req.cookies);
	//console.log('======\n',req.session.code);
	try {
		var content= req.body.data.split("\n");
	// //check fields in data;
		//res.writeHead(200, {"Content-Type": "text/plain"});
		let loss=[];
		content.forEach((val,index)=>{
			let data= val.split("|");
		 	if(data.length!=5){
				loss.push(val);
			}
			else{
				request.post({
					url : 'https://redbooth.com/api/3/comments',
					headers : {
						'Authorization': 'Bearer '+req.session.access_token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					form:{
						target_id: data[4],
						body: data[2],
						minutes:parseFloat(data[3])*60,
						time_tracking_on: data[1].split(" ")[0],
						target_type: 'task'
					},
				},function(error, response, body){
					if(error){
						console.log(body);
						console.log({
							target_id: data[4],
							body: data[2],
							minutes:parseFloat(data[3])*60,
							time_tracking_on: data[1].split(" ")[0],
							type: "task"
						});
						loss.push(val);
					}
					else{
						console.log("pass", body, response.headers);
						console.log({
							target_id: data[4],
							body: data[2],
							minutes:parseFloat(data[3])*60,
							time_tracking_on: data[1].split(" ")[0],
							type: "task"
						})
					}
					if(index == content.length -1){
						res.status(200).send(loss);
					}
					console.log('https://redbooth.com/api/3/comments');
				})
			}
		})

	}
	catch(e){
		res.send(406);
	}

});
module.exports = router;
