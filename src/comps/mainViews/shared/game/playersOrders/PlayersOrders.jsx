/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootState } from '../../../../../states/rootState';
import { UI_STATE_BOARDVIEW_FULLMAP } from '../../../../../states/selectors/uiStateStelectors';
import getRolePropsById from '../../../../converter/middle/getRolePropsById';
import dynamicOrdersListByRoleOrZone from '../../../../converter/middle/orders/dynamicOrdersListByRoleOrZone';
import toGameTime from '../../../../converter/middle/toGameTime';
import ShipIconWithClass from '../../../../icons/ship/ShipIconWithClass';
import TacticsIcon from '../../../../icons/tactics/TacticsIcon';
import TankIconWithClass from '../../../../icons/tank/TankIconWithClass';
import './playersOrders.css';

const PlayersOrders = () => {
  const rs = useRootState();
  const { t } = useTranslation();
  const {
    thisVariant, thisCurrentAdvancement, thisGameName, thisTurnMode,
    uiBoardLayout,
  } = rs;
  const dataMap = rs[`dataMap|${thisVariant}`] || {};
  const dataRoles = rs[`dataRoles|${thisVariant}`] || {};
  const { players } = dataMap || [];
  const dataGameDetails = rs[`dataGames|${thisGameName}`];
  const { yearZero } = dataMap || '';

  const gameTime = toGameTime({
    current_advancement: parseInt(dataGameDetails.current_advancement + thisTurnMode, 10),
    deadline: dataGameDetails.deadline,
  }, yearZero);
  const { turnType, year, season } = gameTime || '';

  const makeList = useMemo(
    () => (roleFilter, zoneFilter) => dynamicOrdersListByRoleOrZone(
      rs,
      t,
      parseInt(thisCurrentAdvancement + thisTurnMode, 10),
      roleFilter,
      zoneFilter,
    ), [rs, t, thisCurrentAdvancement, thisTurnMode],
  );

  const [listInState, dispatcher] = useReducer((state, action) => {
    switch (action.type) {
      case 'MOUNT': {
        return {
          ...state,
          show: action.show,
          filterRole: false,
        };
      }
      case 'FILTER': {
        if (state.filterRole === action.filterRole) {
          return {
            ...state,
            show: [],
            filterRole: 'none',
          };
        }
        return {
          ...state,
          show: makeList(action.filterRole, false),
          filterRole: action.filterRole,
        };
      }
      case 'TOGGLECOMP': {
        return {
          ...state,
          dispComp: !state.dispComp,
        };
      }
      default: return state;
    }
  },
  {
    filterRole: false,
    filterZone: false,
    show: [],
    dispComp: false,

  });

  const { show, filterRole, dispComp } = listInState;

  const onClickOnOrder = (e) => {
    const domUnits = document.querySelectorAll('[data-orders]');
    if (domUnits) {
      if (domUnits.length) {
        for (let i = 0; i < domUnits.length; i += 1) {
          const oneEl = domUnits[i];
          const oneVal = oneEl.dataset.orders;
          if (e.toString() === oneVal.toString()) {
            oneEl.classList.add('blow');
          }
        }
      }
    }
  };

  const onLeaveZoneButton = (e) => {
    // console.log('log', e.target);
    const domUnits = document.querySelectorAll('[data-orders]');
    if (domUnits) {
      if (domUnits.length) {
        for (let i = 0; i < domUnits.length; i += 1) {
          const oneEl = domUnits[i];
          const oneVal = oneEl.dataset.orders;
          if (e.toString() === oneVal.toString()) {
            oneEl.classList.remove('blow');
          }
        }
      }
    }
  };

  useEffect(() => dispatcher({ type: 'MOUNT', show: makeList(false, false) }), [makeList]);

  return (
    <>
      {thisTurnMode < 0 ? (
        <div className={`plor-mn-fr${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}`}>
          <div className="plor-hdr-date-fr">
            <div className="plor-hdr-inner">
              <span>{`${season} ${year}`}</span>
              <span className="plor-turntype">{turnType}</span>
            </div>
          </div>
          <div className="plor-hdr-btn-fr">
            <button type="button" onClick={() => dispatcher({ type: 'TOGGLECOMP' })}>
              <TacticsIcon />
            </button>
          </div>
          {dispComp ? (
            <div>
              <div className="plor-btns-fr">
                <button className="plor-btn-all" type="button" onClick={() => dispatcher({ type: 'FILTER', filterRole: false })}>
                  <span>
                    all
                  </span>
                </button>
                {players ? players.map((it) => (
                  <button
                    type="button"
                    key={`keyPlayersOrdersBtns|${it[0]}`}
                    onClick={() => dispatcher({ type: 'FILTER', filterRole: it[0] })}
                    style={{ borderBottom: `5px solid ${rs[`ccUIplayer${it[0]}`]}` }}
                  >
                    <span>
                      {getRolePropsById(it[0], dataRoles)[1]}
                    </span>

                  </button>
                )) : null}
              </div>
              <div className="plor-table-fr">
                {players && show ? players.map((it) => {
                  const roleId = parseInt(it[0], 10);
                  return (
                    <table className="plor-table" key={`keyDynList|roleId|${roleId}`}>
                      {filterRole === false
              || parseInt(filterRole, 10) === roleId ? (
                <thead>
                  <tr>
                    <th colSpan="9">
                      {getRolePropsById(roleId, dataRoles)[1]}
                    </th>
                  </tr>
                </thead>
                        ) : null}
                      <tbody>
                        {show.length ? show.map((dyn) => {
                          const [role, unitType, orderType,
                            activeZone, passiveZone, targetZone] = dyn;
                          const shortTranscript = dyn[6];
                          const [, unitTypeST, orderTypeST,
                            activeZoneST, passiveZoneST, targetZoneST,
                          ] = shortTranscript;
                          return (
                            <React.Fragment key={`keyDynList|${dyn[3]}`}>
                              {dyn[0] === roleId ? (
                                <>
                                  <tr
                                    key={`keyPlayersOrders|$${dyn[3]}`}
                                    onClick={() => onClickOnOrder(activeZone)}
                                    onMouseEnter={() => onClickOnOrder(activeZone)}
                                    onMouseOut={() => onLeaveZoneButton(activeZone)}
                                    onBlur={() => onLeaveZoneButton(activeZone)}
                                  >
                                    <td>
                                      {unitType === 2 ? (
                                        <ShipIconWithClass
                                          className={`player${roleId}`}
                                        />
                                      ) : (
                                        <TankIconWithClass
                                          className={`player${roleId}`}
                                        />
                                      ) }
                                    </td>
                                    {orderType === 7 || orderType === 9 || orderType === 8 ? (
                                      <td>
                                        {orderTypeST}
                                      </td>
                                    ) : null}
                                    <td>{unitTypeST}</td>
                                    <td>{activeZoneST}</td>
                                    {orderType === 1 || orderType === 2 || orderType === 3
                          || orderType === 4 || orderType === 5 || orderType === 6 ? (
                            <td>
                              {orderTypeST}
                            </td>
                                      ) : null }
                                    {passiveZone ? (
                                      <td>
                                        {passiveZoneST}
                                      </td>
                                    ) : null}
                                    {passiveZone && targetZone && orderType !== 3 ? (
                                      <td>-</td>
                                    ) : null}
                                    {targetZone && orderType !== 3 ? (
                                      <td>
                                        {targetZoneST}
                                      </td>
                                    ) : null}
                                    {!targetZone ? <td /> : null}
                                    {!passiveZone ? (
                                      <>
                                        <td />
                                        <td />
                                      </>
                                    ) : null}
                                    {orderType === 3 ? (
                                      <>
                                        <td />
                                        <td />
                                      </>
                                    ) : null}
                                  </tr>
                                </>
                              ) : null}
                            </React.Fragment>
                          );
                        }) : null}
                      </tbody>
                    </table>
                  );
                }) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default PlayersOrders;
