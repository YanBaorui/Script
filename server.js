var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('which port?\nnode server.js 8888 do you know?')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

console.log('path\n'+ path)
  if(path == '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE>\n<html>' + 
		'<head><link rel="stylesheet" href="/style.css">' + 
		'</head><body>' + 
		'<h1>hello node.js</h1>' + 
		'<script src="/main.js"></script>' + 
		'</body></html>')
    response.end()
  }else if(path == '/style.css'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  }else if(path == '/main.js'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("JS running")')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }
 
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('Listening ' + port + ' succeed\n Now you can open the url: http://localhost:' + port)
