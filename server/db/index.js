var mysql = require('mysql');
var select = require('./select.js');
var insert = require('./insert.js');
var Sequelize = require("sequelize");

sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
exports.User = sequelize.define('users', {
  username: Sequelize.STRING
});

exports.Room = sequelize.define('room', {
  roomname: Sequelize.STRING
});

exports.Message = sequelize.define('message', {
  user_id: Sequelize.INTEGER,
  content: Sequelize.STRING,
  room_id: Sequelize.INTEGER
});

exports.User.sync();
exports.Room.sync();
exports.Message.sync();

///////////

exports.connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "chat"
});

exports.connection.connect();


// when POST request
exports.insert = function(message){
  insert.postMessage(message);
}

exports.select = function(roomname, callback){
   select.getMessages(roomname, callback);
}
