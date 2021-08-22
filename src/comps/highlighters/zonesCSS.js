const zonesCSS = (zone, className) => {
  const getAllAreas = document.getElementsByClassName('area');

  const addClass = () => {
    if (getAllAreas.length) {
      for (let i = 0; i < getAllAreas.length; i += 1) {
        const oneAreaZone = getAllAreas[i].getAttribute('data-zone');
        if (oneAreaZone.toString() === zone.toString()) {
          getAllAreas[i].classList.add(className);
        }
      }
    }
  };

  const removeClass = () => {
    if (getAllAreas.length) {
      for (let i = 0; i < getAllAreas.length; i += 1) {
        const oneAreaZone = getAllAreas[i].getAttribute('data-zone');
        if (oneAreaZone.toString() === zone.toString()) {
          getAllAreas[i].classList.remove(className);
        }
      }
    }
  };

  return {
    addClass, removeClass,
  };
};

export default zonesCSS;
