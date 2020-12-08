var mysql = require('mysql'); 
console.log("db conected");
var connection1 = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database : "chad"
});
connection1.connect(function(err){
	console.log("conected");
});
module.exports=connection1;