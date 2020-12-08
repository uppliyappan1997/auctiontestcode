const url = require('url');
var mysql =require('mysql');
const saltedMd5 = require('salted-md5');
var md5 = require('md5');
var connect=require('./db/db.js');
getData = function (req, res) {
     console.log(req.body)
     const reqUrl = url.parse(req.url, true);
     var name = reqUrl.query.username;
     var psw = reqUrl.query.password;
     console.log(reqUrl);
    var sql="SELECT project.project_title,project.date_end as Project_End_Date,project.status,user.username,user.subcategories FROM ilance_projects as project INNER JOIN ilance_users as user ON project.user_id=user.user_id;";
    connect.query(sql, function (err, result) {
        console.log(sql);
       if (err){
            var obj={status:false,message:err.message};                
        }
        else{
            var obj={status:true,result:result};
        }
        res.end(JSON.stringify(obj));
    });
}
login = function (req, res) {
    const saltedHashAsync =  saltedMd5(req.body.password,'@123#', false);
    var sql="SELECT username,password,salt FROM `ilance_users` WHERE username='"+req.body.username+"';";
    connect.query(sql, function (err, result) {
        console.log(sql);
       if (err){
            var obj={status:false,message:err.message};                
        }
        else{
            if(result.length!=0){
                if(saltedHashAsync==result[0].password){
                    var obj={status:true,message:"Valid User"};                
                    res.end(JSON.stringify(obj));
                }else{
                    var obj={status:false,message:"IN Valid Password"};
                    res.end(JSON.stringify(obj));
                }
            }else{
                var obj={status:false,message:"Invalid User"};                
                res.end(JSON.stringify(obj));
            }
            
        }
    });
    console.log("select all recordoutside ");  
}
invaliduser = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
}
module.exports={
    getData,
    login,
    invaliduser,
};