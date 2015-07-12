var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.use(express.static('public'));
app.get('/', function(req, res)
{
  res.sendFile(__dirname+'/automaticsubmit.html');
});

app.post('/', function(req, res)
{ 
   console.log("yes received a post request");
   res.send("OK DONE NIRWAN"); 
});
app.listen(3000);
console.log('Server2 SSListening on port 3000');