const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
  let body = {};
  
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body = chunk;
    console.log(chunk);
  });

  request.on('end', () => {
    const bodyString = JSON.stringify(body);
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/saveBuild') {
    parseBody(request, response, jsonHandler.saveBuild);
  }
};

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/client.js': htmlHandler.getClient,
    '/src/armorBuilder': htmlHandler.getArmorBuilder,
  },
  POST: {
    '/saveBuild': handlePost,
  },
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);

  // const params = query.parse(parsedUrl.query);

  // const acceptedTypes = request.headers.accept.split(',');

  // if (urlStruct[parsedUrl.pathname]) {
  //   urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  // } else {
  //   urlStruct.notFound(request, response, params);
  // }

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl);
  }

  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.01:${port}`);
});
