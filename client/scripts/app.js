// YOUR CODE HERE:


var app = {

    "init": function() {

        //retrieve();
        //setInterval(retrieve, 3000);
        app.retrieve();
        setInterval(app.retrieve, 3000);
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
    }
};

//convert msg into a proper HTML container
var messagePackager = function(msg) {
    var message = $("<div class=\"message\"> </div>");
    var user = $("<div class=\"messageUser\">" + msg.username + "</div>");
    var text = $("<div class=\"messageText\">" + msg.text + "</div>");

    message.append(user);
    message.append(text);

    return message;
};



//features we need:
//clear the page whenever we fetch new messages


$(document).ready(function() {
    app.init();
});



//setInterval( retrieve, 5000);
