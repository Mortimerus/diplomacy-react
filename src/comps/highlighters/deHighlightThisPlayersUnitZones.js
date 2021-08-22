import getRolesUnitsById from '../converter/middle/getRolesUnitsById';

const deHighlightThisPlayersUnitZones = (units, zones, thisPlayersRole, addedClassName) => {
  if (units && zones && thisPlayersRole && addedClassName) {
    const getAllAreas = document.getElementsByClassName('area');
    for (let i = 0; i < getAllAreas.length; i += 1) {
      const oneAreaZone = getAllAreas[i].getAttribute('data-zone');
      const oneAreaElement = getAllAreas[i];
      const thisPlayersUnits = getRolesUnitsById(units, zones, thisPlayersRole);
      if (thisPlayersUnits.length) {
        for (let j = 0; j < thisPlayersUnits.length; j += 1) {
          const thisUnitsMainZone = thisPlayersUnits[j][2];
          if (oneAreaZone.toString() === thisUnitsMainZone.toString()) {
            oneAreaElement.classList.remove(addedClassName);
          }
        }
      }
    }
  }
};

export default deHighlightThisPlayersUnitZones;
