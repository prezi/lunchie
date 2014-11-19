/*
 Configuration file contains all the configurations about the app 
 Author : Khaled Sami 
 notes : No need to commit this file 
*/

// local database configurations 


var dbName = "postgres";
var dbUserName = "postgres";
var dbPassword = "root";
var dbDialect = "postgres";

// Development Mode [ working localy or on the server ]

var deployment_local = 'local';
var deployment_server = 'heroku';


// to deploy on heroku this var's value must be changed to deployment_server

var deployment_mode = deployment_local;
//var deployment_mode = deployment_server;

exports.dbName = dbName;
exports.dbUserName = dbUserName;
exports.dbPassword = dbPassword;
exports.dbDialect = dbDialect;
exports.deployment_mode = deployment_mode;
