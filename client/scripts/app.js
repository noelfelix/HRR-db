var app = {};

$(document).ready(function(){

  app.server = "http://127.0.0.1:3000/classes/chatterbox";
  app.friends = {};
  app.user = window.location.search.substr(10);
  app.limit = 50;

  app.init = function(){
    app.fetch();
    setInterval(app.fetch, 3000);
  };

  app.send = function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  };

  app.addMessage = function(message){
    var $messageDiv = $('<div class="chat" />');
    var $message = $('<span class="message" />');
    var $username = $('<span class="username" />');
    $message.text(_.escape(message.content)).appendTo($messageDiv);
    $username.html(_.escape(message.username )+'<br />').attr('data-username', _.escape(message.username))
             .appendTo($messageDiv);
    if(message.username in app.friends){
      $messageDiv.addClass('friend');
    }
    $message.text(_.escape(message.content)).appendTo($messageDiv);
    $('#chats').append($messageDiv);
  }

  app.fetch = function(){
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/JSON',
      data: {roomname: $('#roomSelect').val()},
      success: function(response){
        response = JSON.parse(response);
        app.clearMessages();
        console.log(response);
        if(response.results.length === 0){
          return;
        }
        for (var i = 0; i < response.results.length; i++) {
          console.log("processing: ", response.results[i]);
          var found = false;
          $('option').each(function(item){
            if($(this).val()===response.results[i].roomname){
              console.log("found room");
              found = true;
            }
          })
          if(!found){
            console.log("didn't find room, adding");
            app.addRoom(response.results[i].roomname)
          }
          if(response.results[i].roomname === $('#roomSelect').val()){
            console.log("adding message")
            app.addMessage(response.results[i]);
          }
        };
      },
      error: function(){
        console.log('There was an error', data);
      }
    })
  }

  app.handleSubmit = function(){
    //create message
    var message = {
      roomname: $('#roomSelect').val(),
      username: app.user,
      content: $('#message').val()
    }
    app.send(message);
    $('#message').val('');
    app.fetch();
  }

  $('#send').on('submit',function(event){
    console.log('click');
    event.preventDefault();
    app.handleSubmit();
  })

  app.clearMessages = function(){
    $('#chats').empty();
  }

  app.addRoom = function(roomName){
    if(roomName){
      roomName = _.escape(roomName);
      $('#roomSelect').append("<option val=" + roomName + ">" + roomName + "</option>");
    }
  }

  $('#roomSelect').change(function(){
    var selected = $('#roomSelect').val();
    app.clearMessages();
    if(selected === 'newRoom'){
      var newRoom = prompt('Enter a new room name');
      app.addRoom(newRoom);
      $('#roomSelect').val(newRoom);
    } else {
      app.fetch();
    }
  })

  app.addFriend = function(username){
    if(!app.friends.hasOwnProperty(username)){
      app.friends[username] = true;
      app.fetch();
    }
  }

  $('#main').on('click', '.username',function(){
    app.addFriend($(this).data('username'));
  });

  app.init();
});

