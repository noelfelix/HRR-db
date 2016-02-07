var db = require('./index.js');
var Sequelize = require("sequelize");
var Promise = require("bluebird");
var join = Promise.join;

// post message function

exports.postMessage = function(message){

  var getUsername = function(){
    return (db.User.findOrCreate({where: {'username': message.username}}));
  };
  var getRoomname = function(){
    return db.Room.findOrCreate({where: {'roomname': message.roomname}})
  };

  join(getUsername(), getRoomname(), function(username, roomname){
    var user_id = JSON.parse(JSON.stringify(username))[0].id;
    var room_id = JSON.parse(JSON.stringify(roomname))[0].id;
    db.Message.findOrCreate({where: {content: message.content, room_id: room_id, user_id: user_id}})
  })
}