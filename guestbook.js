var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write('<form action="fileupload" method="post" enctype="application/x-www-form-urlencoded">');
    res.write('<input type="text" name="namn" id="namn">');
    res.write('<input type="text" name="email" id="email">');
    res.write('<input type="text" name="comment" id="comment">')

}).listen(8080);

