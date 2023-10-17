const armorSetArray = [];

const respondJson = (request, response, status, object) => {
  const header = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, header);
  response.write(JSON.stringify(object));
  response.end();
};

const saveBuild = (request, response, body) => {
  const responseJson = {
    message: 'Saved Successfully.',
  };

  const responseCode = 201;
  armorSetArray.push(body);
  return respondJson(request, response, responseCode, responseJson);
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
    console.log(params.saveName);
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
