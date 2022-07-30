/*************************************************************


You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
var allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

var _data = [];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  headers['Content-Type'] = 'text/plain';


  if (request.method === 'PUT' && request.url === '/classes/messages') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    var requestData = JSON.parse(body);
    var flag = false;

    for (var i = 0; i < _data.length; i++) {
      if (requestData.username === _data[i].username) {
        var text = requestData.text.split('@@@@@');
        if (_data[i].text === text[0]) {
          _data[i].text = text[1];
          flag = true;
          statusCode = 200;
          response.writeHead(statusCode, headers);
          request.on('end', () => {
            response.end(JSON.stringify(_data));
          });
          break;
        }
      }
    }
    if (flag === false) {
      for (var j = 0; j < _data.length; j++) {
        if (requestData.username !== _data[j].username) {
          statusCode = 200;
          response.writeHead(statusCode, headers);
          request.on('end', () => {
            _data.push(JSON.parse(body));
            response.end(JSON.stringify(_data));
          });
          break;
        }
      }
    }
  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(allowedMethods));
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(_data));
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    response.writeHead(statusCode, headers);

    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      _data.push(JSON.parse(body));
      // response.end(JSON.stringify(_data));
      response.end();
    });
  } else if (!allowedMethods.includes(request.method)) {
    statusCode = 405;
    response.writeHead(statusCode, headers);
    response.end('405: Method Not Allowed');
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('404: Page Not Found');
  }


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


module.exports.requestHandler = requestHandler;