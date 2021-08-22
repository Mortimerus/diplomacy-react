import zonePropsById from './zonePropsById';

export const unitCordsByZoneId = (zones, id) => {
  if (zones && id) {
    const coords = zonePropsById(zones, id).unit_pos[0];
    return {
      x: coords[0],
      y: coords[1],
    };
  }
  return {};
};

export const zoneLabelById = (zones, id) => {
  if (zones && id) {
    const val = zonePropsById(zones, id).label;
    return val;
  }
  return '';
};

export const zoneNameById = (zones, id) => {
  if (zones && id) {
    const val = zonePropsById(zones, id).name;
    return val;
  }
  return '';
};
