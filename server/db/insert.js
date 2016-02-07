var db = require('./index.js');
var Sequelize = require("sequelize");

// post message function
exports.postMessage = function(message){
  var userid = null;
  var roomid = null;

  var lookupUser = function(){
    db.connection.query("SELECT * FROM users WHERE username = ?;", message.username, function(err, result){
      if(err){
        console.log(err);
        return
      } else {
        if(result.length === 0){
          db.connection.query("INSERT INTO users (username) VALUES (?);", message.username, function(err, result){
            if(err){
              console.log(err);
              return
            } else {
              userid = result.insertId;
              lookupRoom()
            }
          })
        } else {
          userid = result[0].user_id;
          lookupRoom()
        }
      }
    })
  }

  var lookupRoom = function(){
    db.connection.query("SELECT * FROM rooms WHERE roomname = ?;", message.roomname, function(err, result){
      if(err){
        console.err(err);
        return
      } else {
        if(result.length === 0){
          db.connection.query("INSERT INTO rooms (roomname) VALUES (?);", message.roomname, function(err, result){
          if(err){
            console.log(err);
            return
          } else {
            roomid = result.insertId;
            insertMessage()
          }
          })
         } else {
          roomid = result[0].room_id;
          insertMessage()
        }
      }
    })
  }

  var insertMessage = function(){
    db.connection.query("INSERT INTO messages SET ?", {"content": message.content, "user_id": userid, "room_id": roomid}, function(err, result){
      if(err){
        console.log(err);
        return
      } else {
        console.log(result);
      }
    })
  }

  lookupUser();
}

// var message = {
//   content : "test content 4",
//   username: "Justin",
//   roomname: "test room 2"
// }

// postMessage(message);
