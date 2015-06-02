// YOUR CODE HERE:




$(document).ready(function() {


    app.init();

});

var appData = {
    username: null,
    roomname: null,
    messages: null,
    friends: {}
};


var app = {


    //where the app's functionality is organized 
    "init": function() {
    	appData.username = window.location.search.substr(10);
        app.get();
        setInterval(app.get, 2000);
        //app.roomChange(appData.messages);
        app.addFriend();
        app.submit();
    },

    //update the chatterbox app with latest messages stored as an array of message objects
    "update": function(messages) {
        $("#messages").html("");
        _.each(messages, function(msg) {
            //convert each msg into a container
            if (!appData.roomname) {
                $("#messages").append(messagePackager(msg));
            } else if (appData.roomname === msg.roomname) {
                $("#messages").append(messagePackager(msg));
            }
        });
    },
    //gets messages from the server and updates the app to include latest messages
    "get": function() {
        $.ajax({
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'GET',
            success: function(data) {
                console.log('chatterbox: Message retrieved');
                //console.log(data); //look at the data retrieved
                //upon success, update the application.
                appData.messages = data.results;
                app.update(appData.messages);
            },
            error: function(data) {
                // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to get messages');
            }
        });
    },
    //adds a friend upon clicking username
    "addFriend": function() {

        $("#messages").on("click", ".messageUser", function(event) {
            event.preventDefault();
            var friendName = $(this).text(); //a way to get the username
            appData.friends[friendName] = !appData.friends[friendName];
            if (appData.friends[friendName]) {
                console.log("successfully added friend");
            } else {
                console.log("successfully removed friend");
            }

        });
    },
    //submits and posts form to the server after the form is converted into a message
    "submit": function() {
        $("#main").on("click", ".submit", function(event) {
            event.preventDefault();

            var msg = {
                "username": appData.username,
                "text": $(".text").val(),
                "roomname": app.currentRoom
            };
            app.post(msg);
            app.get();
            $(".text").val("");
        });
    },
    //posts message to the server
    "post": function(msg) {
        $.ajax({
            url: "https://api.parse.com/1/classes/chatterbox",
            type: "POST",
            data: JSON.stringify(msg),
            contentTYPE: "application/json",
            success: function(data) {
                console.log("chatterbox: Message sent successfully");
            },
            error: function(data) {
                console.error("chatterbox: Failed to send message");
            }
        });
    }

    /*
        ,
        "roomChange": function(messages) {

            var rooms = {};



            $("#main").on("change", "#rooms", function(event) {

                if (this.value === 0) {
                    var newroom = prompt("Please provide name of the newly created room");
                    appData.roomname = newroom;
                    var $option = $(" <option value=" + newroom + ">" + newroom + " < /option>");
                    $("#rooms").append($option);
                } else {
                    appData.roomname = this.value;
                }

                _.each(messages, function(message) {

                    if (!rooms[message.roomname]) {
                        rooms[message.roomname] = true;
                        var $room = $(" <option value=" + room + ">" + room + " < /option>");
                        $("#rooms").append($room);
                    }
                });

               console.log("Here's the updated rooms",rooms);


            });
        }
    */
};

//convert msg into a proper HTML container
var messagePackager = function(msg) {
    var $message = $("<div class=\"message\"> </div>");
    var $user = $("<div class=\"messageUser\">" + msg.username + "</div>");
    var $text = $("<div class=\"messageText\">" + msg.text + "</div>");

    $message.append($user);
    $message.append($text);

    return $message;
};



