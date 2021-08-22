import { themeVarsArr } from '../../../../../constants/defaults/uiConfig';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import createCSSSelector from '../../../../../theme/createCSSSelector';
import toGameTime from '../../../../converter/middle/toGameTime';
import highlightOwnerships from '../../../../highlighters/highlightOwnerships';
import aCa3playerIdentifiersPseudoGET from '../../../../http/api/get/aC3playerIdentifiersPseudoGET';
import aCa4gameAllocationsGameIdGET from '../../../../http/api/get/aC4gameAllocationsGameIdGET';
import aC4gameIdentifiersGET from '../../../../http/api/get/aC4gameIdentifiersGET';
import aC4gameOrdersGameIdGET from '../../../../http/api/get/aC4gameOrdersGameIdGET';
import aC4gameOrdersSubmittedGameIdGET from '../../../../http/api/get/aC4gameOrdersSubmittedGameIdGET';
import aC4gamePositionsGameIdGET from '../../../../http/api/get/aC4gamePostionsGET';
import aC4gamesGameNameGET from '../../../../http/api/get/aC4gamesGameNameGET';
import aCa4gameTransitionsGameIdCurrentAdvancementGET from '../../../../http/api/get/aC4gameTransitionsGameIdCurrentAdvancementGET';
import aC4variantsVariantGET from '../../../../http/api/get/aC4variantsVariantGET';
import httpMapconfig from '../../../../http/static/httpMapconfig';

const gameStartupProc = (rs, rd, variant, gameName, username, isAuth) => {
  let dataMapZonesTemp = [];
  let customPlayersColors = [];
  const customThemeDummyObjTemp = {};
  const dataPlayersColorsTempObj = {};

  // fetch variant config
  if (variant && rs && rd) {
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: { thisGameName: gameName, thisVariant: variant, thisTurnMode: 0 },
    });
    aC4variantsVariantGET(rs, rd, variant).then((variantConfig) => {
      if (variantConfig) {
        dataMapZonesTemp = variantConfig.zones;
        const dataMapYearZero = variantConfig.yearZero;
        // get game details, set gameTime
        if (gameName && dataMapYearZero) {
          aC4gamesGameNameGET(rs, rd, gameName).then((gameDetails) => {
            if (gameDetails && gameName && rs && rd) {
              const currentAdv = gameDetails.current_advancement;
              const thisCurrentState = gameDetails.current_state;
              rd({
                type: RS_POST_SPREAD_OBJ,
                payload: {
                  [`dataGameTime|${gameName}`]: toGameTime(gameDetails, dataMapYearZero),
                  thisCurrentAdvancement: currentAdv,
                  thisCurrentState,
                },
              });
              aC4gameIdentifiersGET(rs, rd, gameName).then((gameId2) => {
                if (currentAdv > 0) {
                  aCa4gameTransitionsGameIdCurrentAdvancementGET(rs, rd,
                    gameId2, currentAdv - 1);
                }
                if (currentAdv > 1) {
                  aCa4gameTransitionsGameIdCurrentAdvancementGET(rs, rd,
                    gameId2, currentAdv - 2);
                }
              });
            }
          });
        }
      }
    });
  }
  // fetch gameId by gameName
  if (rs && rd && gameName && dataMapZonesTemp) {
    aC4gameIdentifiersGET(rs, rd, gameName).then((gameid) => {
      if (gameid && rd) {
        rd({ type: RS_POST_SPREAD_OBJ, payload: { thisGameId: gameid } });
      }
      // fetch current position, highlight ownerships
      aC4gamePositionsGameIdGET(rs, rd, gameid).then((positionData) => {
        if (positionData) {
          const { ownerships } = positionData;
          highlightOwnerships(ownerships, dataMapZonesTemp);
        }
      });
      // fetch allocation of players
      aCa4gameAllocationsGameIdGET(rs, rd, gameid).then((thisGamesAllocations) => {
        if (isAuth && username) {
          aCa3playerIdentifiersPseudoGET(rs, rd, username).then((playerId) => {
            if (playerId && thisGamesAllocations) {
              if (thisGamesAllocations.length) {
                for (let i = 0; i < thisGamesAllocations.length; i += 1) {
                  if (thisGamesAllocations[i][0].toString() === playerId.toString()) {
                    const thisPlayersRole = thisGamesAllocations[i][1];
                    // set shortcut state
                    rd({
                      type: RS_POST_SPREAD_OBJ,
                      payload: { thisPlayersRole },
                    });
                    // if player fetch orders-submitted
                    if (thisGamesAllocations[i][1] > -1) {
                      if (thisGamesAllocations[i][1] > 0) {
                        aC4gameOrdersGameIdGET(rs, rd, gameid);
                      }
                      aC4gameOrdersSubmittedGameIdGET(rs, rd, gameid).then((subm) => {
                        if (subm) {
                          const { submitted, needed } = subm;
                          if (needed) {
                            if (needed.length) {
                              if (needed.includes(thisPlayersRole)) {
                                if (submitted.length) {
                                  if (!submitted.includes(thisPlayersRole)) {
                                  // set shortcut variable
                                    rd({
                                      type: RS_POST_SPREAD_OBJ,
                                      payload: {
                                        thisOrdersNeeded: true,
                                      },
                                    });
                                  } else {
                                    rd({
                                      type: RS_POST_SPREAD_OBJ,
                                      payload: {
                                        thisOrdersNeeded: true, thisOrdersSubmitted: true,
                                      },
                                    });
                                  }
                                } else {
                                  rd({
                                    type: RS_POST_SPREAD_OBJ,
                                    payload: { thisOrdersNeeded: true },
                                  });
                                }
                              }
                            }
                          }
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      });
    });
  }

  // get geography / svg / game config
  if (variant) {
    httpMapconfig(variant, rs, rd).then((res) => {
      if (res) {
        const colorSettings = res[`dataColors|${variant}`];
        const roles = res[`dataRoles|${variant}`];
        // apply styling if defined by mapconfig.json
        if (colorSettings !== undefined) {
          // const { land, water } = colorSettings;
          setTimeout(() => {
            rd({ type: RS_POST_SPREAD_OBJ, payload: { mapUIstylingDefault: false } });
            /**
             * DEV
             * DISABLE OVERRIDE COLORS SETTINGS FROM MAPCONFIG.JSON
             */
            // document.documentElement.style.setProperty('--play-col-mapland', land);
            // document.documentElement.style.setProperty('--play-col-mapwater', water);
            // document.documentElement.style.setProperty('--play-col-mapbg', background);
          }, 200);
        }
        // create CSS custom variables for roles/players colors
        if (roles) {
          for (let i = 0; i < roles.length; i += 1) {
            const oneRolesColor = roles[i][1][5][0];
            document.documentElement.style.setProperty(`--play-col-player${i}`, oneRolesColor);
            if (i > 0) {
              dataPlayersColorsTempObj[`ccUIplayer${i}`] = oneRolesColor;
              customPlayersColors = customPlayersColors.concat([[`--play-col-player${i}`, roles[i][1][1], `ccUIplayer${i}`, `main color of ${roles[i][1][1]}`, 'p']]);
              // create CSS classes/selectors for players' colors ... player<roleId>
              // createCSSSelector(`.area.player${i}`, `fill:var(--play-col-player${i});`);
              createCSSSelector(`.player${i}`, `fill:var(--play-col-player${i});`);
              customThemeDummyObjTemp[`ccUIplayer${i}`] = null;
              if (i === roles.length - 1) {
                const { customTheme } = rs;
                customPlayersColors = customPlayersColors.concat(themeVarsArr);
                rd({
                  type: RS_POST_SPREAD_OBJ,
                  payload: {
                    ccUIThemeProps: customPlayersColors,
                    ...dataPlayersColorsTempObj,
                    customTheme: { ...customTheme, ...customThemeDummyObjTemp },
                  },
                });
              }
            }
          }
        }
      }
    });
  }
};

export default gameStartupProc;
