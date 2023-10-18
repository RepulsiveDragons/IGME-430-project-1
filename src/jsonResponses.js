const armorSetArray = [];

// Create the response object
const respondJson = (request, response, status, object) => {
  const header = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, header);
  response.write(JSON.stringify(object));
  response.end();
};

// head request version
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// Post response
// saves or updates an armorSetObject to the server
const saveBuild = (request, response, body) => {
  const responseJson = {
    message: 'Saved Successfully.',
  };
  let responseCode = 201;

  // check if the user inputted a name in the input field
  if (!body['build name']) {
    responseJson.message = 'Type in the name of the build before saving';
    responseJson.id = 'missingParam';
    return respondJson(request, response, 400, responseJson);
  }

  // check if there is a valid object to save
  if (!body.head) {
    responseJson.message = 'There was no build to save. Click Create build before saving';
    responseJson.id = 'invalidBuild';
    return respondJson(request, response, 400, responseJson);
  }

  // check the exisiting saves to see if they share the same name as the current post object
  // and update it
  for (let i = 0; i < armorSetArray.length; i++) {
    if (armorSetArray[i]['build name'] === body['build name']) {
      armorSetArray[i] = body;
      responseCode = 204;
    }
  }

  // save the valid object to the server
  if (responseCode === 201) {
    armorSetArray.push(body);
    return respondJson(request, response, responseCode, responseJson);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Get response
// retrieves one of the saved object in the server
// only returns an object if requested using a query
const getSave = (request, response, url, params) => {
  const armorSet = {};
  let responseJSON = armorSet;

  if (armorSetArray.length === 0) {
    responseJSON = {
      message: '<br>Nothing to load, save a build first',
      id: 'badRequest',
    };
    return respondJson(request, response, 400, responseJSON);
  }

  // if the request url had a query check the list of saved objects to see
  // which object to send to the client
  if (params.saveName) {
    for (let i = 0; i < armorSetArray.length; i++) {
      if (armorSetArray[i]['build name'] === params.saveName) {
        responseJSON = armorSetArray[i];
        return respondJson(request, response, 200, responseJSON);
      }
    }
  }

  responseJSON = {
    message: 'Missing valid query parameter',
    id: 'badRequest',
  };
  return respondJson(request, response, 400, responseJSON);
};

// Respond with a 404 error code whenever the user tries to access a page that doesn't exist
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJson(request, response, 404, responseJSON);
};

module.exports = {
  saveBuild,
  notFound,
  getSave,
};
