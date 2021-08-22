/* eslint-disable no-unused-vars */
import { API_4_ENDPOINT_GAME_ORDERS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import { RS_POST_SPREAD_OBJ } from '../../../../states/selectors/sharedSelectors';
import { uniqeArr } from '../../../../tools/handleArrays';
import hasMainZoneUnit from '../../../converter/middle/hasZoneUnit';
import { namesCoastArr, namesRolesArr, namesZonesArr } from '../../../converter/middle/orders/convertOrdersForApi';
import apiCall from '../base/apiCall';

const aC4gameOrdersGameIdPOST = async (rs, rd) => {
  rd({ type: RS_POST_SPREAD_OBJ, payload: { uiProcSendOrders: true } });
  const {
    username, thisGameId, thisVariant, thisOrders, thisPlayersRole, thisFakeUnits,
  } = rs;
  const zones = rs[`dataZones|${thisVariant}`];
  const roles = rs[`dataRoles|${thisVariant}`];
  const dataCoastNames = rs[`dataCoastNames|${thisVariant}`];

  const names = JSON.stringify({
    roles: namesRolesArr(roles),
    zones: namesZonesArr(zones),
    coasts: namesCoastArr(dataCoastNames),
  });

  const ordersForApi = (orders) => {
    let ordersArr = [];
    if (orders && rs) {
      if (orders.length) {
        for (let i = 0; i < orders.length; i += 1) {
          const [activeUnitType, activePlayersRole,
            orderType, activeUnitZone, passiveUnitZone, targetZone,
          ] = orders[i];

          const oneOrder = {
            order_type: orderType,
            active_unit: {
              type_unit: activeUnitType,
              role: activePlayersRole,
              zone: parseInt(activeUnitZone, 10),
            },
          };
          const destination = {
            destination_zone: targetZone.toString(),
          };
          const passiveUnit = {
            passive_unit: {
              zone: parseInt(passiveUnitZone, 10),
              role: activePlayersRole,
              type_unit: hasMainZoneUnit(rs, passiveUnitZone).type,
            },
          };
          // support hold
          const passiveUnit2 = {
            passive_unit: {
              zone: targetZone.toString(),
              role: activePlayersRole,
              type_unit: hasMainZoneUnit(rs, targetZone).type,
            },
          };
          if (orderType === 1) {
            ordersArr = ordersArr.concat({ ...oneOrder, ...destination });
          }
          if (orderType === 2) {
            ordersArr = ordersArr.concat({ ...oneOrder, ...destination, ...passiveUnit });
          }
          if (orderType === 3) {
            ordersArr = ordersArr.concat({ ...oneOrder, ...destination, ...passiveUnit2 });
          }
          if (orderType === 4) {
            ordersArr = ordersArr.concat({ ...oneOrder });
          }
          if (orderType === 5) {
            ordersArr = ordersArr.concat({ ...oneOrder, ...destination, ...passiveUnit });
          }
          if (orderType === 6) {
            ordersArr = ordersArr.concat({ ...oneOrder, ...destination });
          }
          if (orderType === 7) {
            ordersArr = ordersArr.concat({ ...oneOrder });
          }
          if (orderType === 8) {
            ordersArr = ordersArr.concat({ ...oneOrder });
          }
          if (orderType === 9) {
            ordersArr = ordersArr.concat({ ...oneOrder });
          }
        }
      }
    }
    return ordersArr;
  };

  const payload = {
    role_id: parseInt(thisPlayersRole, 10),
    pseudo: username,
    names,
    orders: JSON.stringify(ordersForApi(thisOrders)),
  };

  const res = await apiCall(
    'POST',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_ORDERS,
    thisGameId,
    2,
    rs,
    rd,
    false,
    payload,
    false,
  ).then((re) => {
    console.log('api reponse gameOrdersGameIdPOST \n', re);
    // Ok orders submitted SOLVEUR
    if (re.msg.includes('Ok orders submitted SOLVEUR')) {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          [`dataGameOrders|${thisGameId}`]: {
            fake_units: !thisFakeUnits.length ? rs[`dataGameOrders|${thisGameId}`].fake_units : thisFakeUnits,
            orders: thisOrders,
          },
          thisOrdersSubmitted: true,
          [`dataGameOrdersSubmitted|${thisGameId}`]: {
            needed: rs[`dataGameOrdersSubmitted|${thisGameId}`].needed,
            submitted: uniqeArr(rs[`dataGameOrdersSubmitted|${thisGameId}`].submitted.concat(thisPlayersRole)),
          },
          boardShowCurrentOrders: false,
          thisOrders: [],
          uiProcSendOrders: false,
        },
      });
    } if (re.msg.includes('Failed to submit orders')) {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: { boardOrderErrorMsg: re.msg, uiProcSendOrders: false },
      });
    }
  });
  return res;
};

export default aC4gameOrdersGameIdPOST;
