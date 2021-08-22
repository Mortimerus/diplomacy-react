/* eslint-disable max-len */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */

/**
 * outputs:
 * one order by zone,
 * [playersRole, unitType, orderType,
 *  activeZone, passiveZone, targetZone]
 * orders of one player,
 * orders of all players
 */
import { uniqArr3 } from '../../../../tools/handleArrays';
import getRolePropsById from '../getRolePropsById';
import { zoneLabelById, zoneNameById } from '../getZonePropsLib';
import returnOrderType from './returnOrderType';
import returnOrderTypeWithLabel from './returnOrderTypeWithLabel';

const dynamicOrdersListByRoleOrZone = (
  rs, t, currentAdvancement, optionalByFilterRole, optionalFilterByZone,
) => {
  let output = [];
  let tBase = [];
  if (rs) {
    const {
      thisGameId, thisVariant, thisGameName,
    } = rs;
    if (thisGameId && thisVariant && thisGameName && currentAdvancement) {
      const dataGameTransitionsNow = rs[`dataGameTransitions|${thisGameId}|${currentAdvancement}`] || {};
      const { dislodgedOnes, orders, units } = dataGameTransitionsNow || {};
      const fakeUnits = dataGameTransitionsNow.fake_units || [];
      const dataRoles = rs[`dataRoles|${thisVariant}`]
      const dataZones = rs[`dataZones|${thisVariant}`];
      /**
       * TODO DISLODGED ONES
       */

      // UNITS BASE
      if (units && orders && fakeUnits && dataRoles && dataZones) {
        let unitsBase = [];
        if (units.length) {
          for (let i = 0; i < units.length; i += 1) {
            const [unitsUnitOwner, unitsUnitsArr] = units[i];
            if (unitsUnitsArr.length && (optionalByFilterRole === false
              || optionalByFilterRole.toString() === unitsUnitOwner.toString())) {
              for (let j = 0; j < unitsUnitsArr.length; j += 1) {
                const [unitsArrUnitType, unitsArrUnitZone] = unitsUnitsArr[j];
                  let realUnitType = 0;
                  // has fake units / is build phase
                  if (fakeUnits.length) {
                    for (let k = 0; k < fakeUnits.length; k += 1) {
                      const [, fakeUnitsUnitType, fakeUnitsActiveZone] = fakeUnits[k];
                      if (fakeUnitsActiveZone.toString() === unitsArrUnitZone.toString()) {
                        realUnitType = fakeUnitsUnitType;
                      } else {
                        realUnitType = unitsArrUnitType;
                      }
                    }
                  } else {
                    realUnitType = unitsArrUnitType;
                  }
                  // handle dislodgedOnes / retreat phase
                  let helperDisOwner = null;
                  let helperDisType = null;
                  let helperDisZone = null;
                  if (dislodgedOnes.length) {
                    for (let k = 0; k < dislodgedOnes.length; k += 1) {
                      const dislodgedOwner = dislodgedOnes[k][0];
                      const thisOwnersDislodgedOnes = dislodgedOnes[k][1];
                      for (let l = 0; l < thisOwnersDislodgedOnes.length; l += 1) {
                        const [dislodgedType, dislodgedFrom, forbiddenZone] = thisOwnersDislodgedOnes[l];
                        helperDisOwner = dislodgedOwner;
                        helperDisType = dislodgedType;
                        helperDisZone = dislodgedFrom;
                        tBase = tBase.concat([
                          [helperDisOwner, helperDisType, helperDisZone],
                        ])
                        unitsBase = uniqArr3(tBase)
                      }
                    }
                  }
                  unitsBase = unitsBase.concat([
                    [unitsUnitOwner, realUnitType, unitsArrUnitZone],
                  ]);
              }
            }
          }
        }
        // ORDERS BASE
        let ordersBase = [];
        if (orders.length) {
          for (let i = 0; i < orders.length; i += 1) {
            const [, ordersRole, ordersOrderType, ordersActiveZone,
              ordersPassiveZone, ordersTargetZone] = orders[i];
              if (unitsBase.length) {
                for (let j = 0; j < unitsBase.length; j += 1) {
                  const [, unitsBaseUnitType, untisBaseActiveZone] = unitsBase[j];
                  if (
                    untisBaseActiveZone.toString() === ordersActiveZone.toString()
                  && (optionalByFilterRole === false
                    || ordersRole.toString() === optionalByFilterRole.toString())) {
                    ordersBase = ordersBase.concat([[
                      ordersRole, unitsBaseUnitType, ordersOrderType, ordersActiveZone,
                      ordersPassiveZone, ordersTargetZone,
                      // transcript short
                      [
                        getRolePropsById(ordersRole, dataRoles)[3],
                        unitsBaseUnitType === 1 ? 'A' : 'F',
                        returnOrderType(ordersOrderType),
                        zoneLabelById(dataZones, ordersActiveZone),
                        ordersPassiveZone === 0 ? null
                        : zoneLabelById(dataZones, ordersPassiveZone),
                        ordersTargetZone === 0 ? null
                        : zoneLabelById(dataZones, ordersTargetZone),
                      ],
                      // transcript long
                      [
                        getRolePropsById(ordersRole, dataRoles)[2],
                        unitsBaseUnitType === 1 ? t('t_097') : t('t_098'),
                        returnOrderTypeWithLabel(ordersOrderType, t),
                        `${zoneNameById(dataZones, ordersActiveZone)} (${zoneLabelById(dataZones, ordersActiveZone)})`,
                        ordersPassiveZone === 0 ? null
                        : `${zoneNameById(dataZones, ordersPassiveZone)} (${zoneLabelById(dataZones, ordersPassiveZone)})`,
                        ordersTargetZone === 0 ? null
                        : `${zoneNameById(dataZones, ordersTargetZone)} (${zoneLabelById(dataZones, ordersTargetZone)})`,
                      ],
                    ]]);
                  } else if (fakeUnits.length && j === unitsBase.length - 1) {
                    for (let k = 0; k < fakeUnits.length; k += 1) {
                      // const fakeUnitZone = fakeUnits[k][2];
                      if ((ordersActiveZone.toString() === fakeUnits[k][2].toString())
                      && (optionalByFilterRole === false || (optionalByFilterRole.toString() === ordersRole.toString()))
                      ) {
                        const realUnitType = fakeUnits[k][1];
                        ordersBase = ordersBase.concat([[
                          ordersRole, realUnitType, ordersOrderType, ordersActiveZone,
                          ordersPassiveZone, ordersTargetZone,
                          // transcript short
                          [
                            getRolePropsById(ordersRole, dataRoles)[3],
                            realUnitType === 1 ? 'A' : 'F',
                            returnOrderType(ordersOrderType),
                            zoneLabelById(dataZones, ordersActiveZone),
                            ordersPassiveZone === 0 ? null
                            : zoneLabelById(dataZones, ordersPassiveZone),
                            ordersTargetZone === 0 ? null
                            : zoneLabelById(dataZones, ordersTargetZone),
                          ],
                          // transcript long
                          [
                            getRolePropsById(ordersRole, dataRoles)[2],
                            realUnitType === 1 ? t('t_097') : t('t_098'),
                            returnOrderTypeWithLabel(ordersOrderType, t),
                            `${zoneNameById(dataZones, ordersActiveZone)} (${zoneLabelById(dataZones, ordersActiveZone)})`,
                            ordersPassiveZone === 0 ? null
                            : `${zoneNameById(dataZones, ordersPassiveZone)} (${zoneLabelById(dataZones, ordersPassiveZone)})`,
                            ordersTargetZone === 0 ? null
                            : `${zoneNameById(dataZones, ordersTargetZone)} (${zoneLabelById(dataZones, ordersTargetZone)})`,
                          ],
                        ]]);
                      }
                    }
                }
                }
              }
          }
        }
        output = ordersBase;
      }
    }
  }
  return output;
};

export default dynamicOrdersListByRoleOrZone;
