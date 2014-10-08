var express = require('express'),
    port = 9000;

var app = express();

app.get('/', function(req, res){ res.send('get request'); });
app.post('/', function(req, res){ res.send('post request'); });
app.put('/', function(req, res){ res.send('put request'); });
app.patch('/', function(req, res){ res.send('patch request'); });
app.delete('/', function(req, res){ res.send('delete request'); });

app.listen(port, function(){
  console.log('listening on port ' + port);
});
