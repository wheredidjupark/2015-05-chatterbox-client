// YOUR CODE HERE:


var app = {
    "username": null,
    "roomname": null,
    "init": function() {
        app.username = prompt("What is your username?") || "Anonymous";
        app.get();
        setInterval(app.get, 2000);
        //app.roomChange(app.messages);
        app.addFriend();
        app.submit();
    },
    "messages": null,
    //update the chatterbox app with latest messages (only once)
    "update": function(messages) {
        $("#messages").html("");
        _.each(messages, function(msg) {
            //convert each msg into a container
            if (!app.roomname) {
                $("#messages").append(messagePackager(msg));
            } else if (app.roomname === msg.roomname) {
                $("#messages").append(messagePackager(msg));
            }
        });
    },
    "get": function() {
        $.ajax({
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'GET',
            success: function(data) {
                console.log('chatterbox: Message retrieved');
                //console.log(data); //look at the data retrieved
                //upon success, update the application.
                app.messages = data.results;
                app.update(app.messages);
            },
            error: function(data) {
                // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to get messages');
            }
        });
    },
    "friends": {},
    "addFriend": function() {

        $("#messages").on("click", ".messageUser", function(event) {
            event.preventDefault();
            var friendName = $(this).text(); //a way to get the username
            app.friends[friendName] = !app.friends[friendName];
            console.log("successfully added");
        });
    },
    "submit": function() {
        $("#main").on("click", ".submit", function(event) {
            event.preventDefault();
            //var text = $(".text").val();

            var msg = {
                "username": app.username,
                "text": $(".text").val(),
                "roomname": app.currentRoom
            };
            post(msg);
            app.get();
            $(".text").val("");
        });
    }/*
    ,
    "roomChange": function(messages) {

        var rooms = {};



        $("#main").on("change", "#rooms", function(event) {

            if (this.value === 0) {
                var newroom = prompt("Please provide name of the newly created room");
                app.roomname = newroom;
                var $option = $(" <option value=" + newroom + ">" + newroom + " < /option>");
                $("#rooms").append($option);
            } else {
                app.roomname = this.value;
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

var post = function(msg) {
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
};

//features we need:
//clear the page whenever we fetch new messages


$(document).ready(function() {
    app.init();

});



//setInterval( retrieve, 5000);
