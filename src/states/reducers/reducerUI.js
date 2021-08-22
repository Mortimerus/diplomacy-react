/* eslint-disable max-len */
import { isZoneANeighbouringToZoneB } from '../../comps/converter/middle/dataMap/neighbouringLib';
import zoneGeography from '../../comps/converter/middle/dataMap/zoneGeography';
import { isZoneStartCenter, returnCoastalTargetForFleet } from '../../comps/converter/middle/dataMap/zonesLib';
import hasZoneDislodgedUnit from '../../comps/converter/middle/gamePositions/hasZoneDislodgedUnit';
import { zoneLabelById, zoneNameById } from '../../comps/converter/middle/getZonePropsLib';
import hasMainZoneUnit from '../../comps/converter/middle/hasZoneUnit';
import hasZoneDislodgedWithCoastals from '../../comps/converter/middle/hybrids/hasZoneDislodgedWithCoastals';
import whoOwnsThisCenter from '../../comps/converter/middle/whoOwnsThisCenter';
import whoOwnsWhichCenter from '../../comps/converter/middle/whoOwnsWhichCenter';
import zonesCSS from '../../comps/highlighters/zonesCSS';
import { resetSiteSettingsPropsObj } from '../../constants/defaults/uiConfig';
import { removeArrEntryBy4thItem, removeArrEntryBy3rdItem } from '../../tools/handleArrays';
// import { uniqArr4 } from '../../tools/handleArrays';
import { ORD_CANCEL_ONE_ORDER, ORD_CLICK_ON_MAP_ZONE } from '../selectors/ordersSelectors';
import { RS_POST_SPREAD_OBJ, RS_POST_TOGGLE_BOOL } from '../selectors/sharedSelectors';
import {
  HISTORY_SCROLL,
  RS_BOARD_TOGGLE_COMPONENT, RS_CHOOSE_BOARD_COMP, RS_DASH_TOGGLE_COMPONENT,
  RS_UI_POST_TOOGLE_SITE_SETTINGS_SUBMENUES, SET_COASTAL_ZONE, SET_ORDER_TYPE,
} from '../selectors/uiSelectors';

const reducerUI = (state, action) => {
  switch (action.type) {
    case RS_POST_SPREAD_OBJ:
      return {
        ...state,
        ...action.payload,
      };
    case RS_POST_TOGGLE_BOOL:
      // close all sub menus on closing site settings menu
      if (state.uiMenSiteSettings === true && action.payload === 'uiMenSiteSettings') {
        return {
          ...state,
          uiMenSiteSettings: false,
          uiSubSubMenCustomTheme: false,
          uiTempCustomThemeOpenPickersArr: [],
          ...resetSiteSettingsPropsObj(),
        };
      }
      // close all color pickers on closing custom theme menu
      if (state.uiMenSiteSettings === true && action.payload === 'uiSubSubMenCustomTheme') {
        return {
          ...state,
          [action.payload]: !state[action.payload],
          uiTempCustomThemeOpenPickersArr: action.payload === 'uiSubSubMenCustomTheme' && state.uiSubSubMenCustomTheme
            ? []
            : state.uiTempCustomThemeOpenPickersArr,
        };
      }
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case RS_UI_POST_TOOGLE_SITE_SETTINGS_SUBMENUES:
      return {
        ...state,
        uiSubMenUIColors: (action.payload === 'uiSubMenUIColors') && !state[action.payload],
        uiSubMenMemory: (action.payload === 'uiSubMenMemory') && !state[action.payload],
        uiSubMenLanguage: (action.payload === 'uiSubMenLanguage') && !state[action.payload],
        uiSubMenHelp: (action.payload === 'uiSubMenHelp') && !state[action.payload],
        uiSubMenBackgroundPattern: (action.payload === 'uiSubMenBackgroundPattern') && !state[action.payload],
        // reset custom theme menu
        uiTempCustomThemeOpenPickersArr: [],
        uiSubSubMenCustomTheme: false,
      };

    case RS_DASH_TOGGLE_COMPONENT:
      return {
        ...state,
        // [action.payload]: !state[action.payload],
        dashCompMenGames: action.payload === 'dashCompMenGames',
        dashCompGMMenCreateGame: action.payload === 'dashCompGMMenCreateGame',
        dashCompMenUsers: action.payload === 'dashCompMenUsers',
        dashCompMenMyGames: action.payload === 'dashCompMenMyGames',
      };

      // in use?
    case RS_BOARD_TOGGLE_COMPONENT:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };

    case RS_CHOOSE_BOARD_COMP:
      return {
        ...state,
        boardSubMenGGI: action.payload === 'generalInfo',
        boardSubMenStats: action.payload === 'stats',
      };

      // ORDERS
    case SET_ORDER_TYPE:
      return {
        ...state,

        thisHighlight: (() => {
          if (
            action.orderType === 4
            || action.orderType === 8
            || action.orderType === 9

          ) {
            for (let i = 0; i < state.thisHighlight.length; i += 1) {
              zonesCSS(state.thisHighlight[i], 'isactive').removeClass();
            }
            return [];
          }
          return state.thisHighlight;
        })(),

        boardIsEnteringOrders: true,

        thisOrderType: (action.orderType === 4
          || action.orderType === 9
          || action.orderType === 8
          || action.orderType === 7
        ) ? 0 : action.orderType,

        boardMenZoneInfo: false,
        // for displaying build orders on order entry
        thisFakeUnits: (() => {
          if (action.orderType === 8 && action.typeUnit !== undefined) {
            if (state.thisFakeUnits.length) {
              for (let i = 0; i < state.thisFakeUnits.length; i += 1) {
                if (state.thisFakeUnits[i][2] === parseInt(action.unitZone, 10)) {
                  const removedCurrentFakeUnit = removeArrEntryBy3rdItem(
                    state.thisFakeUnits,
                    parseInt(action.hasCoastalChoice !== undefined
                      ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10),
                  );
                  return removedCurrentFakeUnit.concat([[
                    0,
                    action.typeUnit,
                    parseInt(action.hasCoastalChoice !== undefined
                      ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10),
                    state.thisPlayersRole,
                    0,
                    1,
                  ]]);
                }
                return state.thisFakeUnits.concat([[
                  0,
                  action.typeUnit,
                  parseInt(action.hasCoastalChoice !== undefined
                    ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10),
                  state.thisPlayersRole,
                  0,
                  1,
                ]]);
              }
            }

            return [[
              0,
              action.typeUnit,
              parseInt(action.hasCoastalChoice !== undefined
                ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10),
              state.thisPlayersRole,
              0,
              1,
            ]];
          }
          return [];
        })(),

        thisOrders: (() => {
          if (state.thisOrders.length) {
            // order for active unit present?
            for (let i = 0; i < state.thisOrders.length; i += 1) {
              if (state.thisOrders[i][3] === parseInt(action.unitZone, 10)) {
              // remove current order for this unit
                const removedCurrentOrderOfActiveUnit = removeArrEntryBy4thItem(
                  state.thisOrders,
                  parseInt(action.unitZone, 10),
                );
                // add HOLD after duplicate removed
                if (action.orderType === 4 || action.orderType === 9
                  || action.orderType === 8 || action.orderType === 7) {
                  return removedCurrentOrderOfActiveUnit.concat([[
                    action.typeUnit === undefined ? state.thisZoneInfo.unit.type : action.typeUnit,
                    state.thisPlayersRole,
                    // DEV 4
                    action.orderType,
                    (() => {
                      if (state[`dataGameTime|${state.thisGameName}`].turnType === 'retreat') {
                        return parseInt(state.thisZoneInfo.dislodged.disUnitZone, 10);
                      }
                      if (action.typeUnit === undefined) {
                        return parseInt(state.thisZoneInfo.unit.zone, 10);
                      }
                      return parseInt(action.hasCoastalChoice !== undefined
                        ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10);
                    })(),
                    0,
                    0,
                  ]]);
                }
                // default
                return removedCurrentOrderOfActiveUnit;
              }
            }
            // add HOLD, no duplicates
            if (action.orderType === 4 || action.orderType === 9
              || action.orderType === 8 || action.orderType === 7) {
              return state.thisOrders.concat([[
                // state.thisZoneInfo.unit.type,
                action.typeUnit === undefined ? state.thisZoneInfo.unit.type : action.typeUnit,
                state.thisPlayersRole,
                // 4,
                action.orderType,
                // parseInt(state.thisZoneInfo.unit.zone, 10), // active unit
                (() => {
                  if (state[`dataGameTime|${state.thisGameName}`].turnType === 'retreat') {
                    return parseInt(state.thisZoneInfo.dislodged.disUnitZone, 10);
                  }
                  if (action.typeUnit === undefined) {
                    return parseInt(state.thisZoneInfo.unit.zone, 10);
                  }
                  return parseInt(action.hasCoastalChoice !== undefined
                    ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10);
                })(),
                0,
                0,
              ]]);
            }
          }
          // add HOLD first order
          if (action.orderType === 4 || action.orderType === 9
            || action.orderType === 8 || action.orderType === 7) {
            return [[
              // state.thisZoneInfo.unit.type,
              action.typeUnit === undefined ? state.thisZoneInfo.unit.type : action.typeUnit,
              state.thisPlayersRole,
              action.orderType,
              // 4,
              // parseInt(state.thisZoneInfo.unit.zone, 10), // active unit
              (() => {
                if (state[`dataGameTime|${state.thisGameName}`].turnType === 'retreat') {
                  return parseInt(state.thisZoneInfo.dislodged.disUnitZone, 10);
                }
                if (action.typeUnit === undefined) {
                  return parseInt(state.thisZoneInfo.unit.zone, 10);
                }
                return parseInt(action.hasCoastalChoice !== undefined
                  ? action.hasCoastalChoice : state.thisZoneInfo.zid, 10);
              })(),
              0,
              0,
            ]];
          }
          return state.thisOrders;
        })(),

        thisZoneInfo: (() => {
          // set to null if hold order
          if (action.orderType === 4 || action.orderType === 9
            || action.orderType === 8 || action.orderType === 7) {
            return null;
          }
          return state.thisZoneInfo;
        })(),

        thisForbidden: (() => {
          if (action.orderType === 6) {
            const forb = hasZoneDislodgedUnit(state[`dataGamePositions|${state.thisGameId}`].dislodgedOnes, state.thisZoneInfo.zid);
            if (forb.length) {
              return [forb[2]];
            }
          }
          return [];
        })(),

      };

    case SET_COASTAL_ZONE:
      console.log('action', action);
      // works for attack
      console.log('insiside setcoastalzone', action);
      return {
        ...state,
        thisZoneInfo: null,
        boardMenZoneInfo: false,
        thisAskForCoastalZone: null,
        thisOrderType: 0,
        thisOrders: state.thisOrders.concat([[
          state.thisZoneInfo.unit.type,
          state.thisPlayersRole,
          state.thisOrderType,
          // active
          parseInt(state.thisZoneInfo.unit.zone, 10), // active unit
          // passive
          (() => {
            if (state.thisOrderType === 1) {
              return 0;
            }

            return state.thisPassiveZone;
          })(),
          // 0,
          // target
          (() => {
            if (state.thisOrderType === 1) {
              return action.payload;
            }
            return action.payload;
          })(),
        ]]),
      };
    case ORD_CLICK_ON_MAP_ZONE:

      // DEV VIBRATE
      if (state.thisZoneInfo
      && state.client.hasVibrate
      && state.thisTurnMode === 0
      ) {
        window.navigator.vibrate([1000, 30, 100]);
      }

      if (!state.thisZoneInfo
      && state.client.hasVibrate
      && state.thisTurnMode === 0
      ) {
        window.navigator.vibrate(900);
      }

      // ask for coastal zone if > 1
      if (state.thisZoneInfo) {
        if (
          state.thisZoneInfo.unit.type === 2
          && state.thisOrderType !== 0
          // && hasMainZoneUnit(state, state.thisPassiveZone).type === 2
        ) {
          const costalZoneArrForFleet = returnCoastalTargetForFleet(
            state[`dataMap|${state.thisVariant}`],
            state.thisZoneInfo.unit.zone,
            action.payload,
          );
          if (costalZoneArrForFleet.length > 1
          // && (hasMainZoneUnit(state, action.payload).type !== 1
          // && (hasMainZoneUnit(state, state.thisPassiveZone).type !== 1)
        && (
          (
            state.thisOrderType === 1 && state.thisPassiveZone === null
          )
          || (
            state.thisOrderType === 2 && state.thisPassiveZone !== null
            && hasMainZoneUnit(state, state.thisPassiveZone).type === 2
          )
          || (
            state.thisOrderType === 3
            && hasMainZoneUnit(state, action.payload).type === 2
          )
        )
          ) {
            return {
              ...state,
              thisAskForCoastalZone: costalZoneArrForFleet,
              boardMenZoneInfo: true,
              thisTempZone: action.payload,
            };
          }
        }
      }
      // check if attack order is valid NOT IN USE
      if (state.thisZoneInfo && state.thisOrderType !== 0) {
        if (isZoneANeighbouringToZoneB(
          state.thisZoneInfo.unit.zone,
          action.payload,
          state.thisZoneInfo.unit.type,
          state[`dataMap|${state.thisVariant}`].neighbouring,
        )) {
          console.log('is ok.....');
        }
      }
      return {
        ...state,

        boardMenGameInfo: false,

        thisHighlight: (() => {
          if (state.thisTurnMode === 0) {
            if (state.thisHighlight.length) {
              if (
                // toggle
                (state.thisZoneInfo !== null && state.thisOrderType === 0)
                // order with passive unit
                || (state.thisPassiveZone !== null)
                || (state.thisOrderType === 1)
                || (state.thisOrderType === 3)
              ) {
                for (let i = 0; i < state.thisHighlight.length; i += 1) {
                  zonesCSS(state.thisHighlight[i], 'isactive').removeClass();
                }
                return [];
              }
              zonesCSS(action.payload, 'isactive').addClass();
              return state.thisHighlight.concat([action.payload]);

              // zonesCSS(state.thisZoneInfo.zid, 'isactive').removeClass();
              // zonesCSS(action.payload, 'isactive').addClass();
            }
            zonesCSS(action.payload, 'isactive').addClass();
            return state.thisHighlight.concat([action.payload]);
          }
          for (let i = 0; i < state.thisHighlight.length; i += 1) {
            zonesCSS(state.thisHighlight[i], 'isactive').removeClass();
          }
          return [];

          // return state.thisHighlight;
        })(),

        thisOrders: (() => {
        // set ATTACK, SUPORT HOLD order
          if ((state.thisOrderType === 1 || state.thisOrderType === 3 || state.thisOrderType === 6)
            && action.payload.toString() !== state.thisZoneInfo.zid.toString()) {
            return state.thisOrders.concat([[
              state.thisZoneInfo.unit.type,
              state.thisPlayersRole,
              state.thisOrderType,
              // coastals
              parseInt(state[`dataGameTime|${state.thisGameName}`].turnType === 'retreat' ? state.thisZoneInfo.dislodged.disUnitZone
                : state.thisZoneInfo.unit.zone,
              10), // active unit
              0, // passive unit
              // parseInt(action.payload, 10), // target zone
              (() => {
                if (
                  state.thisZoneInfo.unit.type === 1
                  || hasMainZoneUnit(state, action.payload).type === 1) {
                  return action.payload;
                }
                return returnCoastalTargetForFleet(
                  state[`dataMap|${state.thisVariant}`],
                  state.thisZoneInfo.unit.zone,
                  action.payload,
                )[0];
              })(),
              /*

              state.thisZoneInfo.unit.type === 1
                ? action.payload
                : returnCoastalTargetForFleet(
                  state[`dataMap|${state.thisVariant}`],
                  state.thisZoneInfo.unit.zone,
                  action.payload,
                )[0],
                */
            ]]);
          }
          // fix fleet supports army to area with coastal zone
          // =========
          if (
            // SUPPORT MOVE order
            (state.thisOrderType === 2 && state.thisPassiveZone !== null)
            // CONVOY order
          || (state.thisOrderType === 5 && state.thisPassiveZone !== null)) {
            return state.thisOrders.concat([[
              state.thisZoneInfo.unit.type,
              state.thisPlayersRole,
              state.thisOrderType,
              parseInt(state.thisZoneInfo.unit.zone, 10), // active unit
              state.thisPassiveZone,
              // parseInt(action.payload, 10), // target zone
              // hasMainZoneUnit(state, state.thisPassiveZone).type === 1
              (() => {
                if (
                  state.thisZoneInfo.unit.type === 1
                  || hasMainZoneUnit(state, state.thisPassiveZone).type === 1) {
                  return action.payload;
                }
                return returnCoastalTargetForFleet(
                  state[`dataMap|${state.thisVariant}`],
                  state.thisZoneInfo.unit.zone,
                  action.payload,
                )[0];
              })(),
              /*
              state.thisZoneInfo.unit.type === 1
                ? action.payload
                : returnCoastalTargetForFleet(
                  state[`dataMap|${state.thisVariant}`],
                  state.thisZoneInfo.unit.zone,
                  action.payload,
                )[0],
                */
            ]]);
          }
          return state.thisOrders;
        })(),

        // thisOrderType: state.thisOrderType !== 0 ? 0 : state.orderType,
        thisOrderType: (() => {
          if (
            // reset after ATTACK
            (state.thisOrderType === 1 || state.thisOrderType === 3 || state.thisOrderType === 6)
            // reset after SUPPORT MOVE
            || (state.thisOrderType === 2 && state.thisPassiveZone !== null)
            // reset after CONVOY
            || (state.thisOrderType === 5 && state.thisPassiveZone !== null)
          ) {
            return 0;
          }
          return state.thisOrderType;
        })(),

        thisClickX: action.thisClick.clientX,
        thisClickY: action.thisClick.clientY,

        thisPassiveZone: (() => {
          if (
          // reset after SUPPORT MOVE
            (state.thisOrderType === 2 && state.thisPassiveZone === null)
            // reset after CONVOY
            || (state.thisOrderType === 5 && state.thisPassiveZone === null)
          ) {
            return action.payload;
          }
          return null;
        })(),

        boardMenZoneInfo: (() => {
          if (state.thisOrderType !== 0) {
            return false;
          }
          return true;
        })(),

        thisZoneInfo: (() => {
          if (state.thisOrderType === 0 && state[`dataMap|${state.thisVariant}`] && state[`dataGamePositions|${state.thisGameId}`]) {
            // toggle
            if (state.thisZoneInfo !== null) {
              return null;
            }
            return {
              zid: action.payload,
              owner: whoOwnsThisCenter(state, action.payload),
              label: zoneLabelById(
                state[`dataZones|${state.thisVariant}`],
                action.payload,
              ),
              name: zoneNameById(
                state[`dataZones|${state.thisVariant}`],
                action.payload,
              ),
              unit: hasMainZoneUnit(state, action.payload),
              isStartCenter: isZoneStartCenter(state[`dataMap|${state.thisVariant}`].zones, action.payload),
              geography: zoneGeography(state[`dataMap|${state.thisVariant}`], action.payload),
              dislodged: hasZoneDislodgedWithCoastals(
                state[`dataMap|${state.thisVariant}`].zones,
                state[`dataGamePositions|${state.thisGameId}`].dislodgedOnes,
                action.payload,
              ),
            };
          }
          if (
            // keep zone info alive while SUPPORT MOVE passive unit selection
            (state.thisOrderType === 2 && state.thisPassiveZone === null)
            // keep zone info alive while CONVOY passive unit selection
            || (state.thisOrderType === 5 && state.thisPassiveZone === null)
          ) {
            return state.thisZoneInfo;
          }
          return null;
        })(),

        thisForbidden: [],
      };

    case ORD_CANCEL_ONE_ORDER:
      return {
        ...state,
        thisOrders: removeArrEntryBy4thItem(state.thisOrders, action.payload),
        thisZoneInfo: null,
        boardMenZoneInfo: null,
        thisPassiveZone: null,
        thisOrderType: 0,
        boardIsEnteringOrders: false,
        thisFakeUnits: removeArrEntryBy3rdItem(state.thisFakeUnits, action.payload),
        thisHighlight: (() => {
          if (state.thisHighlight.length) {
            for (let i = 0; i < state.thisHighlight.length; i += 1) {
              zonesCSS(state.thisHighlight[i], 'isactive').removeClass();
            }
          }
          return [];
        })(),
      };

    case HISTORY_SCROLL:
      if (state.thisHighlight.length) {
        for (let i = 0; i < state.thisHighlight.length; i += 1) {
          zonesCSS(state.thisHighlight[i], 'isactive').removeClass();
        }
      }

      if (action.dir) {
        // const dataGameTransitionsNowMinusOne = state[`dataGameTransitions|${state.thisGameId}|${parseInt(state.thisCurrentAdvancement + state.thisTurnMode, 10)}`] || {};
        // const dataGameTransitionsNowMinusTwo = state[`dataGameTransitions|${state.thisGameId}|${parseInt(state.thisCurrentAdvancement - 1 + state.thisTurnMode, 10)}`] || {};

        if (action.dir === 'bck') {
          // now minus one
          // if (state.thisTurnMode === 0) {
          const dataGamePositions = state[`dataGamePositions|${state.thisGameId}`];
          const ownershipsNow = dataGamePositions.ownerships || [];

          const dataGameTransitionsNowMinusOne = state[`dataGameTransitions|${state.thisGameId}|${parseInt(state.thisCurrentAdvancement + state.thisTurnMode - 1, 10)}`];
          const dataOwnershipsNowMinusOne = dataGameTransitionsNowMinusOne.ownerships || [];

          const dataMap = state[`dataMap|${state.thisVariant}`];
          const { zones } = dataMap || [];

          const now = whoOwnsWhichCenter(ownershipsNow, zones);
          const nowMinusOne = whoOwnsWhichCenter(dataOwnershipsNowMinusOne, zones);

          if (now.length && state.thisTurnMode === 0) {
            for (let i = 0; i < now.length; i += 1) {
              const [zoneNow, ownerNow] = now[i];
              if (nowMinusOne.length) {
                for (let j = 0; j < nowMinusOne.length; j += 1) {
                  const [zoneNowMinusOne, ownerNowMinusOne] = nowMinusOne[j];
                  if (zoneNow === zoneNowMinusOne && ownerNow !== ownerNowMinusOne) {
                    zonesCSS(zoneNow, `player${ownerNow}`).removeClass();
                    zonesCSS(zoneNowMinusOne, `player${ownerNowMinusOne}`).addClass();
                    // console.log('____________', ownerNowMinusOne, ownerNow);
                  }
                }
              }
            }
          } else if (now.length && state.thisTurnMode < 0) {
            console.log('dummy');
          }
          // }
          if (state.thisTurnMode < 0) {
            console.log('not');
          }
        }
        if (action.dir === 'fwd' && state.thisTurnMode < 0) {
          console.log('fwd');
        }
      }

      return {
        ...state,
        thisTurnMode: (() => {
          if (action.dir === 'bck') {
            return state.thisTurnMode - 1;
          }
          if (action.dir === 'fwd' && state.thisTurnMode !== 0) {
            return state.thisTurnMode + 1;
          }
          return state.thisTurnMode;
        })(),
        thisHighlight: [],
        thisZoneInfo: null,
      };

    default:
      return state;
  }
};

export default reducerUI;
