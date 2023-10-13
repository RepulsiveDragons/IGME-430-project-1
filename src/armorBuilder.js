const armorSetArray = [];
let armorSetObject = {};
let combinedSkillsObject = {};

export const clearObjects = () => {
  armorSetObject = {};
  combinedSkillsObject = {};
};
// export const createBuild = () =>{
//   const content = document.querySelector('#headBuild');
//   let string;

//   for (let i = 0; i < 5; i++) {
//     console.log(armorSet[i]);
//     const armor = armorSet[i];
//     string += `${armor.type}: ${armor.name}, `;

//     for (const skill of armor.skills) {
//         if (!skillsObject[skill.skillName]) {
//           skillsObject[skill.skillName] = {};
//         }

//         skillsObject[skill.skillName].skillName = skill.skillName;
//         skillsObject[skill.skillName].level += skill.level;
//     }
//   }

//   content.innerHTML = string;
//   console.log(skillsObject);
// }

// get the necessary information from the armor json object
// store the data into a global object to be used later
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

  armorSetArray.push(armorSetObject);
  console.log(armorSetObject);
};

export const returnArmorSetObject = () => {
  armorSetObject['combined skills'] = combinedSkillsObject;
  return armorSetObject;
};
