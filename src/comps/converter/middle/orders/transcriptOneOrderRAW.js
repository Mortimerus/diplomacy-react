import { zoneLabelById, zoneNameById } from '../getZonePropsLib';

const transcriptOneOrderRaw = (rs, oneOrderEntry, zoneId, t) => {
  let strOutput = '';
  let arrOutput = [];
  const orderType = (type) => {
    let output = '';
    if (type) {
      if (type === 1) {
        output = t('t_108');
      }
      if (type === 2) {
        output = t('t_103');
      }
      if (type === 3) {
        output = t('t_102');
      }
      if (type === 4) {
        output = t('t_110');
      }
      if (type === 5) {
        output = t('t_111');
      }
      if (type === 6) {
        output = t('t_112');
      }
      if (type === 7) {
        output = t('t_113');
      }
      if (type === 8) {
        output = t('t_114');
      }
      if (type === 9) {
        output = t('t_115');
      }
    }
    return output;
  };

  const unitType = (type) => {
    let output = '';
    if (type) {
      if (type === 1) {
        output = 'A';
      }
      if (type === 2) {
        output = 'F';
      }
    }
    return output;
  };
  const { thisVariant } = rs;
  const dataZones = rs[`dataZones|${thisVariant}`];

  if (oneOrderEntry.length && dataZones.length) {
    for (let i = 0; i < oneOrderEntry.length; i += 1) {
      const [unitTypeO, , orderTypeO, activeZoneO,
        passiveZoneO, targetZoneO] = oneOrderEntry[i];
      if (activeZoneO.toString() === zoneId.toString()) {
        const activeZoneLabel = zoneLabelById(dataZones, activeZoneO);
        const activeZoneName = zoneNameById(dataZones, activeZoneO);

        if (orderTypeO === 4 || orderTypeO === 9 || orderTypeO === 8 || orderTypeO === 7) {
          strOutput = `${unitType(unitTypeO)} ${activeZoneName} (${activeZoneLabel}) ${orderType(orderTypeO)}`;
          arrOutput = [unitTypeO, orderTypeO, activeZoneLabel, null, null];
        }
        const targetZoneName = zoneNameById(dataZones, targetZoneO);
        const targetZoneLabel = zoneLabelById(dataZones, targetZoneO);
        if (orderTypeO === 1 || orderTypeO === 3 || orderTypeO === 6) {
          strOutput = `${unitType(unitTypeO)} ${activeZoneName} (${activeZoneLabel}) ${orderType(orderTypeO)} ${targetZoneName} (${targetZoneLabel})`;
          arrOutput = [unitTypeO, orderTypeO, activeZoneLabel, null, targetZoneLabel];
        }
        const passiveZoneName = zoneNameById(dataZones, passiveZoneO);
        const passiveZoneLabel = zoneLabelById(dataZones, passiveZoneO);
        if (orderTypeO === 2 || orderTypeO === 5) {
          strOutput = `${unitType(unitTypeO)} ${activeZoneName} (${activeZoneLabel}) ${orderType(orderTypeO)} ${passiveZoneName} (${passiveZoneLabel}) ${t('t_116')} ${targetZoneName} (${targetZoneLabel})`;
          arrOutput = [unitTypeO, orderTypeO, activeZoneLabel, passiveZoneLabel, targetZoneLabel];
        }
      }
    }
  }

  return {
    strOutput,
    arrOutput,
  };
};

export default transcriptOneOrderRaw;
