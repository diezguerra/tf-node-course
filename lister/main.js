var http = require('http');
var url = require('url');
var items = [];
var fs = require('fs');
var parse = require('url').parse;
var join = require('path').join;
var root = __dirname;

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

var serveIndex = function serveIndex(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    listOfItems = '';
    for(var item in items) {
        listOfItems += (
                '<div><li style="display:inline">' +
                items[item].replace('item=', '') +
                '</li><form method="POST" style="display:inline" action="/' +
                item + '?_method=DELETE"><button type="submit">X</button>' +
                '</form></div>');
    }
    fs.readFile('index.html', function(err, data) {
        var template = data.toString();
        template = template.replace('{{ advanced_templating }}', listOfItems);
        res.write(template);
        res.end();
    });
}

var server = http.createServer(function(req, res) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var _method = query._method;

    if(req.method === "POST" && _method === "DELETE") {
        req.method = "DELETE";
    }

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
        if(req.url == '/'){
            serveIndex(req, res);
            break;
        }
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
