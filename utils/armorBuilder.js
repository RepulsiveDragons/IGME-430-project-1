const armorSetArray = [];
let armorSetObject = {};
let combinedSkillsObject = {};

const headName = document.querySelector('#headName');
const chestName = document.querySelector('#chestName');
const glovesName = document.querySelector('#glovesName');
const waistName = document.querySelector('#waistName');
const legsName = document.querySelector('#legsName');

export const clearObjects = () => {
  armorSetObject = {};
  combinedSkillsObject = {};
};

const combineSkills = (skillName, level) => {
  if (!combinedSkillsObject[skillName]) {
    combinedSkillsObject[skillName] = {};
    combinedSkillsObject[skillName].level = 0;
  }

  combinedSkillsObject[skillName].skillName = skillName;
  combinedSkillsObject[skillName].level += level;
};

export const sendArmor = (armor) => {
  armorSetObject[armor.type] = {};
  armorSetObject[armor.type].name = armor.name;
  armorSetObject[armor.type].skills = [];

  for (let i = 0; i < armor.skills.length; i++) {
    const skillObject = {};
    skillObject.name = armor.skills[i].skillName;
    skillObject.level = armor.skills[i].level;
    armorSetObject[armor.type].skills.push(skillObject);
    combineSkills(armor.skills[i].skillName, armor.skills[i].level);
  }

  displayArmor(armor.type, armor.name);
  //armorSetArray.push(armorSetObject);
};

export const returnArmorSetObject = () => {
  armorSetObject['combined skills'] = combinedSkillsObject;
  return armorSetObject;
};

const displayArmor = (type, name) => {

  switch(type){
    case 'head':
      headName.innerHTML = name;
      break;
    case 'chest':
      chestName.innerHTML = name;
      break;
    case 'gloves':
      glovesName.innerHTML = name;
      break;
    case 'waist':
      waistName.innerHTML = name;
      break;
    case 'legs':
      legsName.innerHTML = name;
      break;
    default:
      return;
  }
}

export const displayArmorObject = (object) => {
  headName.innerHTML = object[head].name;
  chestName.innerHTML = object[chest].name;
  glovesName.innerHTML = object[gloves].name;
  waistName.innerHTML = object[waist].name;
  legsName.innerHTML = object[legs].name;
}
