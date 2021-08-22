// <roleId>, <rs[`dataRoles|${thisVariant}`]>
// return array of role props
const getRolePropsById = (roleId, dataRoles) => {
  if (dataRoles) {
    if (dataRoles.length) {
      for (let i = 0; i < dataRoles.length; i += 1) {
        if (roleId.toString() === dataRoles[i][0].toString()) {
          return dataRoles[i][1];
        }
      }
    }
  }
  return [];
};

export default getRolePropsById;
