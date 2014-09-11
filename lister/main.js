var http = require('http');
var url = require('url');
var items = [];

var parsePath = function(req, res, callback) {

        var pathname = url.parse(req.url).pathname;
        var i = parseInt(pathname.slice(1), 10);

        if (isNaN(i)) {
            res.statusCode = 400;
            res.end('Item id not valid');
        }
        else if (!items[i]) {
            res.statusCode = 404;
            res.end('Item not found');
        }
        else {
            callback(i);
        }
}

var server = http.createServer(function(req, res) {
    switch (req.method) {
    case 'POST':
        var item = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        });
        req.on('end', function () {
            items.push(item);
            res.end('Item added\n');
        });
        break;
    case 'GET':
        items.forEach(function (item, i) {
            res.write(i + '. ' + item + '\n');
        });
        res.end();
        break;
    case 'DELETE':
        parsePath(req, res, function(i) {
            items.splice(i, 1);
            res.end('Item deleted successfully');
        });
        break;
    case 'PUT':
        parsePath(req, res, function(i) {
            req.on('data', function (chunk) {
                items[i] = chunk;
            });
            res.end('Item updated successfully');
        });
        break;
    }
});

server.listen(9000, function(){
    console.log('listening on port 9000');
});
