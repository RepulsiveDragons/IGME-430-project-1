let armorSetObject = {};
let combinedSkillsObject = {};

const headName = document.querySelector('#headName');
const chestName = document.querySelector('#chestName');
const glovesName = document.querySelector('#glovesName');
const waistName = document.querySelector('#waistName');
const legsName = document.querySelector('#legsName');
const headImage = document.querySelector('#headImage');
const chestImage = document.querySelector('#chestImage');
const glovesImage = document.querySelector('#glovesImage');
const waistImage = document.querySelector('#waistImage');
const legsImage = document.querySelector('#legsImage');
const skillsContent = document.querySelector('#skills');

//clear the armorSetObject and the combinedSkillsObject
export const clearObjects = () => {
  armorSetObject = {};
  combinedSkillsObject = {};
};

//Adds a skill to the combinedSkillsObject if it doesnt exist alread
//If it already exists then add the value of the level to the existing level
const combineSkills = (skillName, level) => {
  if (!combinedSkillsObject[skillName]) {
    combinedSkillsObject[skillName] = {};
    combinedSkillsObject[skillName].level = 0;
  }

  combinedSkillsObject[skillName].skillName = skillName;
  combinedSkillsObject[skillName].level += level;
};

//Takes in an armor object from the external API
//Extract the necessary data from the armor object and put it in the armorSetObject
export const sendArmor = (armor) => {
  armorSetObject[armor.type] = {};
  armorSetObject[armor.type].name = armor.name;
  if(armor.assets){
    armorSetObject[armor.type].image = armor.assets.imageMale;
  }
  else{
    armorSetObject[armor.type].image = '../img/imageDNE.png'; //use a default image if an image doesnt exist
  }
  armorSetObject[armor.type].skills = [];

  for (let i = 0; i < armor.skills.length; i++) {
    const skillObject = {};
    skillObject.name = armor.skills[i].skillName;
    skillObject.level = armor.skills[i].level;
    armorSetObject[armor.type].skills.push(skillObject);
    combineSkills(armor.skills[i].skillName, armor.skills[i].level);
  }

  displayArmor(armor.type, armor.name, armorSetObject[armor.type].image);
  displaySkills(combinedSkillsObject);
};

//returns the armorSetObject with the combined skills in it
export const returnArmorSetObject = () => {
  armorSetObject['combined skills'] = combinedSkillsObject;
  return armorSetObject;
};

//display the name and the image of the armor to the client
const displayArmor = (type, name, image) => {

  switch(type){
    case 'head':
      headName.innerHTML = name;
      headImage.src = image;
      break;
    case 'chest':
      chestName.innerHTML = name;
      chestImage.src = image;
      break;
    case 'gloves':
      glovesName.innerHTML = name;
      glovesImage.src = image;
      break;
    case 'waist':
      waistName.innerHTML = name;
      waistImage.src = image;
      break;
    case 'legs':
      legsName.innerHTML = name;
      legsImage.src = image;
      break;
    default:
      return;
  }
}

//similar to the displayArmorObject but this method takes in an armorSetObject
export const displayArmorObject = (object) => {
  headName.innerHTML = object.head.name;
  chestName.innerHTML = object.chest.name;
  glovesName.innerHTML = object.gloves.name;
  waistName.innerHTML = object.waist.name;
  legsName.innerHTML = object.legs.name;

  headImage.src = object.head.image;
  chestImage.src = object.chest.image;
  glovesImage.src = object.gloves.image;
  waistImage.src = object.waist.image;
  legsName.src = object.legs.imagae;

  displaySkills(object['combined skills']);
}

//display the combined skills to the client
export const displaySkills = (combinedSkillsObject) => {

  skillsContent.innerHTML = 'Combined Skills: ';

  for (const skill in combinedSkillsObject) {
    if (Object.hasOwnProperty.call(combinedSkillsObject, skill)) { 
      skillsContent.innerHTML += `<b>${combinedSkillsObject[skill].skillName}</b>: Level ${combinedSkillsObject[skill].level}, `;
    }
  }
}
