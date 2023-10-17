import * as armorBuilder from "../utils/armorBuilder";

//global variables;
const urlMH = 'https://mhw-db.com/armor';

const handleResponse = async (response, method) => {
  const content = document.querySelector("#status");

  switch(response.status) {
    case 200: 
      content.innerHTML = `<b>Loaded Successfully</b>`;
      break;
    case 201:
      content.innerHTML = `<b>Successful Post</b>`
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

  if(method === 'get'){
    let obj = await response.json();

    if(response.status === 400){
      content.innerHTML += obj.message;
    }
    else{
      console.log(obj);
      armorBuilder.displayArmorObject(obj);
    }
  }
  else if(method === 'head') {
    content.innerHTML += '<p>Meta Data Received</p>';
  }
  else if(method === 'post'){
    let obj = await response.json();
    console.log(obj);

    if(obj.message){
      content.innerHTML += `<p>${obj.message}</p>`;
    }
  }

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
    //send the armor json object to armorBuilder.js to extract the data
    armorBuilder.sendArmor(armor);
  });
}

//call the Monster Hunter API
const getFetch = async (headSelector,chestSelector,glovesSelector,waistSelector,legsSelector) => {

  //a query call to get only armors that are of the rank master
  fetch(urlMH + '?q={"rank":"high"}')
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
  });
};

//Call the API to get the json of the selected armor pieces
const getBuild = (headSelector,chestSelector,glovesSelector,waistSelector,legsSelector) =>{
  armorBuilder.clearObjects();

  fetchArmor(headSelector.value);
  fetchArmor(chestSelector.value);
  fetchArmor(glovesSelector.value);
  fetchArmor(waistSelector.value);
  fetchArmor(legsSelector.value);

  armorBuilder.displaySkills;
}

const getSave = async (loadButton, saveSelect) => {
  
  const loadAction = loadButton.getAttribute('action') + saveSelect.value;
  const method = 'get';

  let response = await fetch(loadAction, {
    method,
    headers: {
        'Accept': 'application/json'
    },
  });

  handleResponse(response, method);
};

const sendPost = async (saveButton, saveButtonName, saveSelect) => {
  const saveAction = saveButton.getAttribute('action');
  const saveMethod = saveButton.getAttribute('method');

  const object = armorBuilder.returnArmorSetObject();
  object["build name"] = saveButtonName.value;

  const data = JSON.stringify(object);

  let response = await fetch(saveAction, {
    method: saveMethod,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: data,
  });

  let option = document.createElement("option");
  option.value = `?saveName=${saveButtonName.value}`;
  option.text = saveButtonName.value;
  saveSelect.appendChild(option);

  handleResponse(response,saveMethod);
}

const init = () => {
  const createBuild = document.querySelector("#createBuild");
  const saveButton = document.querySelector("#saveButton");
  const saveInputName = document.querySelector("#buildNameInput");
  const saveSelect = document.querySelector("#saves");
  const loadButton = document.querySelector("#getSave");
  const headSelector = document.querySelector("#head");
  const chestSelector = document.querySelector("#chest");
  const glovesSelector = document.querySelector("#gloves");
  const waistSelector = document.querySelector("#waist");
  const legsSelector = document.querySelector("#legs");

  const getInfo = () => getBuild(headSelector,chestSelector,glovesSelector,waistSelector,legsSelector);
  getFetch(headSelector,chestSelector,glovesSelector,waistSelector,legsSelector);

  const save = (e) => {
    e.preventDefault;
    sendPost(saveButton, saveInputName, saveSelect);
    return false;
  }

  const loadSave = () => getSave(loadButton, saveSelect);

  createBuild.addEventListener('click', getInfo);
  saveButton.addEventListener('click', save);
  loadButton.addEventListener('click', loadSave);
};

window.onload = init;