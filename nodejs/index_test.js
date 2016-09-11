// - get command line arguments
//var argv = require('minimist')(process.argv.slice(2));
//var port = argv['port'];
//var redis_host = argv['redis_host'];
//var redis_port = argv['redis_port'];
//var subscribe_topic = argv['subscribe_topic'];

var port = 3000;

// - setup dependency instances
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//// - setup redis client
//var redis = require('redis');
//console.log('Creating a redis client');
//var redisclient = redis.createClient(redis_port, redis_host);
//console.log('Subscribing to redis topic %s', subscribe_topic);
//redisclient.subscribe(subscribe_topic);
//redisclient.on('message', function (channel, message) {
//    if (channel == subscribe_topic) {
//        console.log('message received %s', message);
//        io.sockets.emit('data', message);
//    }
//});

setInterval(function(){
        var message = {};
        message.timestamp = Date.now();
        message.average = 20 * Math.cos(2 * Math.PI * Math.random()) + 80;
        
        var msg = JSON.stringify(message);
        console.log('message received %s', msg);
        io.sockets.emit('data', msg);
}, 300);


// - setup webapp routing
//app.use(express.static(__dirname + '/test-app'));
app.use(express.static(__dirname + '/stock-visualizer'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/smoothie', express.static(__dirname + '/node_modules/smoothie/'));
app.use('/d3', express.static(__dirname + '/node_modules/rickshaw/vendor/'));
app.use('/rickshaw', express.static(__dirname + '/node_modules/rickshaw/'));

server.listen(port, function () {
    console.log('Server started at port %d.', port);
});

// - setup shutdown hooks
var shutdown_hook = function () {
    console.log('Quitting redis client');
    redisclient.quit();
    console.log('Shutting down app');
    process.exit();
};

process.on('SIGTERM', shutdown_hook);
process.on('SIGINT', shutdown_hook);
process.on('exit', shutdown_hook);
