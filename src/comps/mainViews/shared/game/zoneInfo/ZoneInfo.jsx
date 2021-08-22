/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import getRolePropsById from '../../../../converter/middle/getRolePropsById';
import './zoneInfo.css';
import OrderEntry from '../../../../controls/orderEntry/OrderEntry';
import { SET_COASTAL_ZONE } from '../../../../../states/selectors/uiSelectors';
import { getCoastalZoneLabel } from '../../../../converter/middle/dataMap/zonesLib';
import { zoneLabelById, zoneNameById } from '../../../../converter/middle/getZonePropsLib';
import adjustWindowPosition from './adjustWindowPosition';
import hasZoneDislodgedUnit from '../../../../converter/middle/gamePositions/hasZoneDislodgedUnit';
import useCurrentDim from '../../../../startUp/useCurrentDim';

const ZoneInfo = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const dim = useCurrentDim();
  const { currentHeight, currentWidth } = dim;
  const ref = useRef();
  const {
    thisZoneInfo, thisVariant, thisPlayersRole, thisOrdersNeeded, thisClickX, thisClickY,
    boardMenZoneInfo, thisAskForCoastalZone, thisTempZone, mapRef, thisGameId, thisGameName,
    thisTurnMode,
  } = rs;
  const dataRoles = rs[`dataRoles|${thisVariant}`] || [];
  const zones = rs[`dataMap|${thisVariant}`] ? rs[`dataMap|${thisVariant}`].zones : [];
  const coastName = rs[`dataCoastNames|${thisVariant}`] || [];
  const dataZones = rs[`dataZones|${thisVariant}`] || [];
  const dataGamePositions = rs[`dataGamePositions|${thisGameId}`] || [];
  const { dislodgedOnes } = dataGamePositions || [];
  const gameTime = rs[`dataGameTime|${thisGameName}`];
  const { turnType } = gameTime || '';
  // const { clientHeight, clientWidth } = mapRef || '';
  const { dislodged } = thisZoneInfo || {};
  const { disOwner } = dislodged || {};
  const onChooseCoastalZone = (zo) => {
    rd({ type: SET_COASTAL_ZONE, payload: zo });
  };
  const [cPos, cRed] = useReducer((pos, action) => {
    switch (action.type) {
      case '_UPDATE_':
        if (ref) {
          if (ref.current) {
            if (action.thisZoneInfo !== null) {
              // -100 since some calculated positions can be minus (stp)
              if (action.thisClickY > -100 && action.thisClickX > -100) {
                ref.current.style.transitionDuration = '0.4s';
                ref.current.style.opacity = 0.975;
                return {
                  xIn: action.thisClickX + 30,
                  yIn: action.thisClickY + 15,
                  elHeight: action.ref.current.scrollHeight + 30,
                  elWidth: action.ref.current.scrollWidth + 15,
                };
              }
            } else {
              ref.current.style.opacity = 0;
              return {
                xIn: 0,
                yIn: 0,
                elHeight: 0,
                elWidth: 0,
              };
            }
          }
        }
        return pos;
      default: return pos;
    }
  }, {
    xIn: 0,
    yIn: 0,
    elHeight: 0,
    elWidth: 0,
  });

  const noScroll = () => {
    window.scrollTo(0, 0);
  };

  const scrollStart = () => {
    window.addEventListener('scroll', noScroll);
  };

  const scrollStop = () => {
    window.removeEventListener('scroll', noScroll);
  };

  useEffect(() => {
    cRed({
      type: '_UPDATE_', ref, thisClickX, thisClickY, thisZoneInfo,
    });
  }, [ref, cRed, thisClickY, thisClickX, thisZoneInfo]);

  return (
    <div className="zoneinfofr" ref={ref}>
      {
      ref && thisTurnMode === 0 && zones && dataRoles
      && thisClickX && thisClickY && boardMenZoneInfo
      && thisZoneInfo && dataGamePositions ? (

        <Draggable
          handle=".zoneinfo"
          cancel=".clickable"
          defaultClassNameDragging="dragging"
          onStart={scrollStart}
          onStop={scrollStop}
          positionOffset={{
            x: adjustWindowPosition(
              cPos.xIn, cPos.yIn, currentWidth, currentHeight, cPos.elWidth, cPos.elHeight,
            ).corrX,
            y: adjustWindowPosition(
              cPos.xIn, cPos.yIn, currentWidth, currentHeight, cPos.elWidth, cPos.elHeight,
            ).corrY,
          }}
        >
          <div className={`zoneinfo player${thisZoneInfo.owner}`}>
            {thisTurnMode === 0 ? (
              <div className="zoneinfo-fr-inner">
                <div className="zoneinfo-gr-top">
                  <div className="zoneinfo-gr-top-label">{thisZoneInfo.label}</div>
                  <div className="zoneinfo-gr-top-name">{thisZoneInfo.name}</div>
                </div>

                {!thisAskForCoastalZone && thisZoneInfo.owner > 0 && dataRoles ? (
                  <div className="zoneinfo-gr-owner">
                    <div className="zoneinfo-fr-icon">
                      <svg width="28" height="24" className={`zoneinfo-icon-owner player${thisZoneInfo.owner}`}>
                        <rect width="28" height="24" />
                        <text x="8" y="18">{getRolePropsById(thisZoneInfo.owner, dataRoles)[3]}</text>
                      </svg>
                    </div>
                    <div className="zoneinfo-fr-txt">

                      <em>{getRolePropsById(thisZoneInfo.owner, dataRoles)[1]}</em>
                    </div>
                  </div>
                ) : null}

                {(!thisAskForCoastalZone && thisZoneInfo.unit !== '') ? (
                  <div className="zoneinfo-gr-unit">
                    {thisZoneInfo.unit.type === 2 ? (
                      <div className="zoneinfo-unit-army-fr-icon">
                        <svg className={`zoneinfo-unit-army-icon player${thisZoneInfo.unit.owner}`} viewBox="0 0 32 32">
                          <polygon width="24" height="24" points="0,32 16,4, 32,32" />
                        </svg>
                      </div>
                    ) : (
                      <div className="zoneinfo-unit-navy-fr-icon">
                        <svg className={`zoneinfo-unit-navy-icon player${thisZoneInfo.unit.owner}`} viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="14" />
                        </svg>
                      </div>
                    )}
                    <div className="zoneinfo-unit-fr-owner">
                      {`${thisZoneInfo.unit.type === 2 ? t('t_098') : t('t_097')} ${getRolePropsById(thisZoneInfo.unit.owner, dataRoles)[2]}`}
                    </div>

                  </div>
                ) : null}

                {thisPlayersRole ? (
                  <>
                    {(
                      turnType !== 'retreat' && thisPlayersRole > 0 && thisZoneInfo.unit.owner
             === thisPlayersRole.toString() && thisOrdersNeeded)
           || (turnType !== 'retreat' && thisPlayersRole > 0 && thisZoneInfo.owner === thisPlayersRole)
           || (thisPlayersRole > 0
             && hasZoneDislodgedUnit(dislodgedOnes, thisZoneInfo.zid).length
             ? hasZoneDislodgedUnit(dislodgedOnes, thisZoneInfo.zid)[0]
           === thisPlayersRole.toString() : false)
           || (turnType === 'retreat' && disOwner === thisPlayersRole.toString())
                      ? (

                        <OrderEntry />

                      ) : null}

                  </>
                ) : null}

                {!thisAskForCoastalZone && thisZoneInfo.isStartCenter > 0
                  ? (
                    <div className="zoneinfo-gr-start">
                      <div className="zoneinfo-start-icon-fr">
                        <svg width="32" height="32" className={`zoneinfo-start-icon player${thisZoneInfo.isStartCenter}`} viewBox="0 0 32 32">
                          <rect x="0" y="0" height="32" width="32" />
                        </svg>
                      </div>
                      <div>
                        {t('t_099')}
                        {' '}
                        <em>
                          {getRolePropsById(thisZoneInfo.isStartCenter, dataRoles)[1]}
                        </em>

                      </div>

                    </div>
                  ) : null}

                {thisTempZone && thisAskForCoastalZone ? thisAskForCoastalZone.map((it) => (
                  <div className="zoneinfo-coastaldialog-btn-fr" key={it}>
                    <button className="btn-orders clickable" type="button" onClick={() => onChooseCoastalZone(it)}>
                      {`${zoneNameById(dataZones, thisTempZone)} (${zoneLabelById(dataZones, thisTempZone)}) ${getCoastalZoneLabel(zones, it, coastName)}`}
                    </button>
                  </div>
                )) : null}

              </div>
            ) : null}

          </div>
        </Draggable>
        ) : null
        }
    </div>
  );
};

export default ZoneInfo;
