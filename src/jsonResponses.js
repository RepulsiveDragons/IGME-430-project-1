const armorSetArray = [];

const respondJson = (request, response, status, object) => {
  const header = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, header);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const saveBuild = (request, response, body) => {
  const responseJson = {
    message: 'Saved Successfully.',
  };
  let responseCode = 201;

  if (!body['build name']) {
    responseJson.message = 'Type in the name of the build before saving';
    responseJson.id = 'missingParam';
    return respondJson(request, response, 400, responseJson);
  }

  if (!body.head) {
    responseJson.message = 'There was no build to save. Click Create build before saving';
    responseJson.id = 'invalidBuild';
    return respondJson(request, response, 400, responseJson);
  }

  for (let i = 0; i < armorSetArray.length; i++) {
    if (armorSetArray[i]['build name'] === body['build name']) {
      armorSetArray[i] = body;
      responseCode = 204;
    }
  }

  if (responseCode === 201) {
    armorSetArray.push(body);
    return respondJson(request, response, responseCode, responseJson);
  }

  return respondJSONMeta(request, response, responseCode);
};

const getSave = (request, response, url, params) => {
  const armorSet = {};
  let responseJSON = armorSet;

  if (armorSetArray.length === 0) {
    responseJSON = {
      message: 'Nothing to load, save a build first',
      id: 'badRequest',
    };
    return respondJson(request, response, 400, responseJSON);
  }

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
