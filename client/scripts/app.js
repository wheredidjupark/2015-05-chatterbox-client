// YOUR CODE HERE:

var retrieve = function() {
    $.ajax({
        // always use this url
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        success: function(data) {
            //var parse = JSON.parse(data);

            //$("#messages").append(JSON.parse(data));

            console.log('chatterbox: Message received');
            console.log(data);

            var results = data.results;
            $("messages").html("");

            for (var i = 0; i < results.length; i++) {
                $("#messages").append(results[i].text);
            }

            //$("#messages").append(data.results[0][text]);

            //we now know we are receiving proper data.
        },
        error: function(data) {
            // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to retrieve messages');
        }
    });
};



$(document).ready(function() {
    retrieve();
});



//setInterval( retrieve, 5000);
