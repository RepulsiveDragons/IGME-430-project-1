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

module.exports = {
  saveBuild,
};
