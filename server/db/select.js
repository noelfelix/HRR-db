var db = require('./index.js');
var Sequelize = require("sequelize");
// db.sequelize

exports.getMessages = function(roomname, callback){
  db.Room.sync()
    .then(function(){
      return db.Room.findOrCreate({where: {'roomname': roomname}});
    })
    .then(function(room){
      db.Message.sync();
      return room;
    })
    .then(function(room){
      return db.Message.findAll({where:{room_id: room.id}})
    })
    .then(function(messages){
      console.log("MESSAGES: ", messages)
      callback(messages);
  });
}
  // var roomID = null;

  // db.connection.query("SELECT * FROM rooms WHERE roomname = ?;", roomname, function(err, result){
  //   if(err){
  //     console.log(err);
  //     return
  //   } else {
  //     if(result.length === 0){
  //       console.log("making new room");
  //       db.connection.query("INSERT INTO rooms (roomname) VALUES (?);", roomname, function(err, result){
  //         console.log("made room, selecting messages");
  //         console.log(result);
  //         roomID = result.insertId;
  //         selectMessages();
  //       })
  //     } else {
  //       console.log("room exists, selecting messages");
  //       roomID = result[0].room_id;
  //       selectMessages();
  //     }
  //   }
  // });

  // var selectMessages = function(){
  //   db.connection.query('select messages.content, users.username, rooms.roomname' +
  //                       ' from messages' +
  //                       ' inner join users on messages.user_id = users.user_id' +
  //                       ' inner join rooms on messages.room_id = rooms.room_id' +
  //                       ' where rooms.room_id = ?', roomID, function(err, result){
  //     if(err){
  //       console.log(err);
  //       return
  //     } else {
  //       results = JSON.parse(JSON.stringify(result));
  //       console.log(results);
  //       callback(results);
  //     }
  //   });
  // }

