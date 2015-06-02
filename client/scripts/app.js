// YOUR CODE HERE:


var app = {
	"username": null,

    "init": function() {
        app.username = prompt("What is your username?");
        app.retrieve();
        setInterval(app.retrieve, 3000);
        app.addFriend();
    },

    "messages": null,

    //update the chatterbox app with latest messages (only once)
    "update": function(messages) {

        $("#messages").html("");
        _.each(messages, function(msg) {
            //convert each msg into a container
            $("#messages").append(messagePackager(msg));
        });
    },

    "retrieve": function() {
        $.ajax({
            url: 'https://api.parse.com/1/classes/chatterbox',
            type: 'GET',
            success: function(data) {
                console.log('chatterbox: Message retrieved');
                //console.log(data); //look at the data retrieved
                app.messages = data.results;
                app.update(app.messages);
            },
            error: function(data) {
                // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to retrieve messages');
            }
        });
    },
    "friends": {},
    "addFriend": function() {
        $("#messages").on("click", ".messageUser", function(event) {
            var friendName = $(this).text(); //a way to retrieve the username
            app.friends[friendName] = !app.friends[friendName];
            console.log("successfully added");
        });
    }
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




//features we need:
//clear the page whenever we fetch new messages


$(document).ready(function() {
    app.init();

});



//setInterval( retrieve, 5000);
