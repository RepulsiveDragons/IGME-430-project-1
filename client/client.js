import * as armorBuilder from "../src/armorBuilder";

//global variables;
const urlMH = 'https://mhw-db.com/armor';
const armorSet = [];

const handleResponse = async (response) => {
  const content = document.querySelector("#content");

  switch(response.status) {
    case 200: 
      content.innerHTML = `<b>Success</b>`;
      break;
    case 400: 
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 401:
      content.innerHTML = `<b>Unathorized Access</b>`;
        break;
    case 403:
      content.innerHTML = `<b>Forbidden</b>`;
        break;
    case 404: 
      content.innerHTML = `<b>Not Found</b>`;
      break;
    case 500:
      content.innerHTML = `<b>Internal Server Error</b>`;
      break;
    case 501:
      content.innerHTML = `<b>Status Code Not Implemented</b>`;
      break;
    default: 
      content.innerHTML = `<p>Not Found</p>`;
      break;
  }

  response.text().then((resText) => {
    const contentType = response.headers.get('Content-Type');

    if(contentType === 'application/json') {
      const parsedResponse = JSON.parse(resText);
      console.log(parsedResponse);
      content.innerHTML += `<p>${parsedResponse.message}</p>`;
    } else if (contentType === 'text/xml') { 
      const parsedResponse = new window.DOMParser().parseFromString(resText, 'text/xml');
      console.log(parsedResponse);
      content.innerHTML += `<p>${parsedResponse.querySelector('message').textContent}</p>`;
    }
  })

  //let resObj = await response.json();

  //content.innerHTML += `<p>${resObj.message}</p>`;
};

const sendFetch = async (url, acceptedType) => {
  const options = {
    method: 'GET',
    headers: {'Accept': acceptedType},
  }

  const promise = fetch(url,options);
  promise.then((response) => { handleResponse(response) });
};

//create the drop down menus dynamically with each option being
//one of the pieces of armor
const createOptions = (list,selector) => {
  for (let i = 0; i < list.length; i++) {
    let option = document.createElement("option");
    option.value = list[i].id;
    option.text = list[i].name;
    option.name = list[i].name;
    option.slug = list[i].slug;
    selector.appendChild(option);
  }
}

//this call gets a specific armor piece from the API
const fetchArmor = async (id) => {
  fetch(urlMH + '/' + id)
  .then(response => response.json())
  .then((armor) => {
    //armorSet.push(armor);

    //send the armor json object to armorBuilder.js to extract the data
    armorBuilder.sendArmor(armor);
  });
}

//call the Monster Hunter API
const getFetch = async (headSelector,chestSelector,glovesSelector,waistSelector,legsSelector) => {

  //a query call to get only armors that are of the rank master
  fetch('https://mhw-db.com/armor?q={"rank":"master"}')
  .then(response => response.json())
  .then(armor => {
    const listOfHeads = [];
    const listOfChests = [];
    const listOfGloves = [];
    const listOfWaists = [];
    const listOfLegs = [];
    for(let i = 0; i < armor.length; i++){
      if(armor[i].type === 'head'){
        listOfHeads.push(armor[i]);
      }
      if(armor[i].type === 'chest'){
        listOfChests.push(armor[i]);
      }
      if(armor[i].type === 'gloves'){
        listOfGloves.push(armor[i]);
      }
      if(armor[i].type === 'waist'){
        listOfWaists.push(armor[i]);
      }
      if(armor[i].type === 'legs'){
        listOfLegs.push(armor[i]);
      }
    }

    //create 5 different drop down menus for
    //the 5 armor types: head,chest,gloves,waist,legs
    createOptions(listOfHeads, headSelector);
    createOptions(listOfChests, chestSelector);
    createOptions(listOfGloves, glovesSelector);
    createOptions(listOfWaists, waistSelector);
    createOptions(listOfLegs, legsSelector);
    console.log(headSelector);

  });
};

//Call the API to get the json of the selected armor pieces
const getBuild = (headSelector,chestSelector,glovesSelector,waistSelector,legsSelector) =>{
  fetchArmor(headSelector.value);
  fetchArmor(chestSelector.value);
  fetchArmor(glovesSelector.value);
  fetchArmor(waistSelector.value);
  fetchArmor(legsSelector.value);

  //createBuild(armorSet);
  //armorBuilder.createBuild();
}

const init = () => {
  const getMHAPI = document.querySelector("#getMH");
  const headSelector = document.querySelector("#head");
  const chestSelector = document.querySelector("#chest");
  const glovesSelector = document.querySelector("#gloves");
  const waistSelector = document.querySelector("#waist");
  const legsSelector = document.querySelector("#legs");

  const getInfo = () => getBuild(headSelector,chestSelector,glovesSelector,waistSelector,legsSelector);
  getFetch(headSelector,chestSelector,glovesSelector,waistSelector,legsSelector);

  getMHAPI.addEventListener('click', getInfo);
};

window.onload = init;