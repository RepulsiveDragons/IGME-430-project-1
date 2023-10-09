export const armorSetArray = [];
const armorSetObject = {};

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
export const sendArmor = (armor) => {
  armorSetObject[armor.type] = {};
  armorSetObject[armor.type].name = armor.name;
  armorSetObject[armor.type].skills = [];

  // for (const skill of armor.skills) {
  //   const skillObject = {};
  //   skillObject.name = skill.skillName;
  //   skillObject.level = skill.level;
  //   armorSetObject[armor.type].skills.push(skillObject);
  // }

  for (let i = 0; i < armor.skills.length; i++) {
    const skillObject = {};
    skillObject.name = armor.skills[i].skillName;
    skillObject.level = armor.skills[i].level;
    armorSetObject[armor.type].skills.push(skillObject);
  }

  armorSetArray.push(armorSetObject);
  console.log(armorSetObject);
};

