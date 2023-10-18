const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//parse the object body and call the call back function sending the parsed object with it
const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (object) => {
    body.push(object);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = JSON.parse(bodyString);
    handler(request, response, bodyParams);
  });
};


const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/saveBuild') {
    parseBody(request, response, jsonHandler.saveBuild);
  }
};

//an object with the request url as the key and its corresonding call back function
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/client.js': htmlHandler.getClient,
    '/utils/armorBuilder': htmlHandler.getArmorBuilder,
    '/img/imageDNE.png': htmlHandler.getImage,
    '/img/mhw_background.jpg': htmlHandler.getBackground,
    '/loadSave': jsonHandler.getSave,
    notFound: jsonHandler.notFound,
  },
  POST: {
    '/saveBuild': handlePost,
  },
};

//take in a request and call the appropriate call back function
const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl, params);
  }

  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.01:${port}`);
});
