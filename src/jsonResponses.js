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
  console.log(body.head.name);
  return respondJson(request, response, responseCode, responseJson);
};

const getSave = (request, response) => {
  const armorSet = armorSetArray[0];
  const responseJSON = armorSet;

  if (armorSetArray.length === 0) {
    return respondJson(request, response, 400, responseJSON);
  }

  return respondJson(request, response, 200, responseJSON);
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
