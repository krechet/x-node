var express = require('express')
, http = require('http')
, path = require('path')
, util = require('util')    
, routes = require('./routes')
, test = require('./routes/test')
, execute = require('./routes/execute');

var app = express();

app.configure(function(){
    
    app.set('port', process.env.PORT || 1337);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade' /* ejs */ );
    app.set('view options', {
        layout : 'layout.jade'
    });
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.cookieParser()); 
    app.use(express.session({
        secret:'secret',
        maxAge: new Date(Date.now() + 3600000)
    }));
    
    app.use(express.limit('5mb')); // for file uploading


    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});



app.configure('development', function(){
    app.use(express.errorHandler({
        dumpExceptions: true, 
        showStack: true
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/execute', execute.execute);

app.get('/test', test.test);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});