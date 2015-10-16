var path = require('path');
var express = require('express');

// Create the application itself.
// The express object is a function that when invoked returns back the application object.
var app = express();

// Somewhere inside the res.render code, express is probably doing a require('ejs').
app.set('view engine', 'ejs');

// Also need how (where) to find the view.
// Using path to find absolute position views so we don't have to worry about relative wrong paths.
// [__dirname] is a magic variable that exists in ALL node application. Is is the current folder of the node application.
app.set('views', path.resolve(__dirname, 'views'));

// One of the neat things about react and why it is so small (and powerful) is that you can extend it with middleware.
// The only middleware that comes with express > v4.0 is [static] that needs to be told what folder contains the safe static content.
app.use(express.static(path.resolve(__dirname, 'public')));

// [Routes]
app.get('*', function(req, res) {
	
	// Who wants to put text on here?
	// In order to render a view express has to know about the template language and there is a ton of them.
	// EJS (embedded javascript) is a simple templating language.
	// res.send('Hello, Express!');

	// Cool thing about express, you can render views.
	// Don't have to put the extension because it use the default set on the [view engine]
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Like node's http.createServer.
// Since it is no good to hard code magic numbers, it is ofter used environmental variables for that. It is required by heroku and windows azure.
// Without the PORT variable it won't work on azure.
app.listen(process.env.PORT || 3000);