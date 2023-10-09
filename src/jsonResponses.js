const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;

    if (!params.valid || params.valid !== 'true') {
      let responseXMLError = '<response>';
      responseXMLError = `${responseXMLError} <message>Missing valid query parameter set to true</message>`;
      responseXMLError = `${responseXMLError} <id>badRequest</id>`;
      responseXMLError = `${responseXMLError} </response>`;

      return respond(request, response, 400, responseXMLError, 'text/xml');
    }
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respond(request, response, 400, JSON.stringify(responseJSON), 'application/json');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;

    if (!params.loggedIn || params.loggedIn !== 'yes') {
      let responseXMLError = '<response>';
      responseXMLError = `${responseXMLError} <message>Missing valid query parameter set to true</message>`;
      responseXMLError = `${responseXMLError} <id>unathorized</id>`;
      responseXMLError = `${responseXMLError} </response>`;

      return respond(request, response, 401, responseXMLError, 'text/xml');
    }
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'unauthorized';

    return respond(request, response, 401, JSON.stringify(responseJSON), 'application/json');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This resource is forbidden',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This resource is forbidden</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(responseJSON), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The server is on fire',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The server is on fire</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(responseJSON), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This request is not implemented by the client',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This request is not implemented by the client</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(responseJSON), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  notImplemented,
  internal,
};
