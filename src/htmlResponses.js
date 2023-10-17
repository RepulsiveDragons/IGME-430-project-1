const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const client = fs.readFileSync(`${__dirname}/../client/client.js`);
const armorBuilder = fs.readFileSync(`${__dirname}/../utils/armorBuilder.js`);
const image = fs.readFileSync(`${__dirname}/../img/imageDNE.png`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(client);
  response.end();
};

const getArmorBuilder = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(armorBuilder);
  response.end();
};

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(image);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getClient,
  getArmorBuilder,
  getImage,
};
