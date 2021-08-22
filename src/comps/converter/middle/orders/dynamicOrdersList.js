import getPlayersNetAssets from '../gamePositions/getPlayersNetAssets';
import hasMainZoneUnit from '../hasZoneUnit';
import whoOwnsThisCenter from '../whoOwnsThisCenter';

const dynamicOrdersList = (rs) => {
  let output = [];
  if (rs) {
    const {
      thisOrders, thisGameId, thisVariant, thisGameName, thisPlayersRole, thisFakeUnits,
    } = rs;
    if (thisOrders && thisGameId && thisVariant && thisGameName && thisPlayersRole) {
      const dataGamePositions = rs[`dataGamePositions|${thisGameId}`] || {};
      const { units, dislodgedOnes } = dataGamePositions || [];
      const dataGameOrders = rs[`dataGameOrders|${thisGameId}`] || {};
      const dataGameTime = rs[`dataGameTime|${thisGameName}`] || {};
      const dataRoles = rs[`dataRoles|${thisVariant}`] || [];
      const { orders } = dataGameOrders || [];
      const fakeUnits = dataGameOrders.fake_units;
      const { turnType } = dataGameTime || '';

      let baseUnits = [];

      let baseDispandOptions = [];

      if (units) {
        if (units.length) {
          for (let i = 0; i < units.length; i += 1) {
            if (units[i][0] === thisPlayersRole.toString()) {
              const unitsArr = units[i][1];
              if (unitsArr.length) {
                for (let j = 0; j < unitsArr.length; j += 1) {
                  const [unitType, unitZone] = unitsArr[j];
                  baseUnits = baseUnits.concat([[
                    unitType, thisPlayersRole, 'UNSET', unitZone, 'UNSET', 'UNSET',
                  ]]);
                  baseDispandOptions = baseDispandOptions.concat([unitZone]);
                }
              }
            }
          }
        }
      }

      let updatedUnits = [];

      if (baseUnits.length) {
        for (let i = 0; i < baseUnits.length; i += 1) {
          if (thisOrders) {
            if (thisOrders.length) {
              let temp = baseUnits[i];
              for (let j = 0; j < thisOrders.length; j += 1) {
                const uZone = baseUnits[i][3];
                if (thisOrders[j][3] === uZone) {
                  temp = [hasMainZoneUnit(rs, baseUnits[i][3]).type, thisOrders[j][1],
                    thisOrders[j][2], thisOrders[j][3], thisOrders[j][4], thisOrders[j][5]];
                }
              }
              updatedUnits = updatedUnits.concat([temp]);
            }
          }
        }
      }

      let updatedSubmitted = [];
      if (orders && fakeUnits) {
        if (fakeUnits.length) {
          if (orders.length) {
            for (let i = 0; i < orders.length; i += 1) {
              updatedSubmitted = updatedSubmitted.concat([
                [fakeUnits[i][1],
                  orders[i][1],
                  orders[i][2],
                  orders[i][3],
                  orders[i][4],
                  orders[i][5],
                ]]);
            }
          }
        } else if (orders.length) {
          for (let i = 0; i < orders.length; i += 1) {
            updatedSubmitted = updatedSubmitted.concat([
              [hasMainZoneUnit(rs, orders[i][3]).type,
                orders[i][1],
                orders[i][2],
                orders[i][3],
                orders[i][4],
                orders[i][5],
              ]]);
          }
        }
      }

      let baseDislodgedOnes = [];

      if (dislodgedOnes) {
        if (dislodgedOnes.length) {
          for (let i = 0; i < dislodgedOnes.length; i += 1) {
            const oneRole = dislodgedOnes[i][0];
            if (oneRole === thisPlayersRole.toString()) {
              const thatPlayersDislodgedArr = dislodgedOnes[i][1];
              if (thatPlayersDislodgedArr) {
                if (thatPlayersDislodgedArr.length) {
                  for (let j = 0; j < thatPlayersDislodgedArr.length; j += 1) {
                    const [
                      thatDislodgedUnitType, thatDislodgedZone,
                    ] = thatPlayersDislodgedArr[j];
                    baseDislodgedOnes = baseDislodgedOnes.concat([[
                      thatDislodgedUnitType, thisPlayersRole, 'UNSET', thatDislodgedZone, 'UNSET', 'UNSET',
                    ]]);
                  }
                }
              }
            }
          }
        }
      }

      let updatedDislodgedOnes = [];

      if (baseDislodgedOnes.length) {
        for (let i = 0; i < baseDislodgedOnes.length; i += 1) {
          if (thisOrders) {
            if (thisOrders.length) {
              let temp = baseDislodgedOnes[i];
              for (let j = 0; j < thisOrders.length; j += 1) {
                const uZone = baseDislodgedOnes[i][3];
                if (thisOrders[j][3] === uZone) {
                  temp = [hasMainZoneUnit(rs, baseDislodgedOnes[i][3]).type, thisOrders[j][1],
                    thisOrders[j][2], thisOrders[j][3], thisOrders[j][4], thisOrders[j][5]];
                }
              }
              updatedDislodgedOnes = updatedDislodgedOnes.concat([temp]);
            }
          }
        }
      }

      let baseBuildOptions = [];

      // get startcenters
      if (dataRoles) {
        if (dataRoles.length) {
          for (let i = 0; i < dataRoles.length; i += 1) {
            const oneRole = dataRoles[i][0];
            if (oneRole) {
              if (oneRole === thisPlayersRole.toString()) {
                const thatRolesStartCenters = dataRoles[i][1][4];
                if (thatRolesStartCenters.length) {
                  for (let j = 0; j < thatRolesStartCenters.length; j += 1) {
                    const oneStartCenter = thatRolesStartCenters[j];
                    if (!hasMainZoneUnit(rs, oneStartCenter)) {
                      if (whoOwnsThisCenter(rs, oneStartCenter) === thisPlayersRole) {
                        baseBuildOptions = baseBuildOptions.concat([[
                          'UNSET', thisPlayersRole, 'UNSET', oneStartCenter, 'USET', 'UNSET',
                        ]]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      let updatedBuildOptions = [];

      if (baseBuildOptions.length) {
        for (let i = 0; i < baseBuildOptions.length; i += 1) {
          if (thisOrders) {
            if (thisOrders.length) {
              let temp = baseBuildOptions[i];
              for (let j = 0; j < thisOrders.length; j += 1) {
                const uZone = baseBuildOptions[i][3];
                if (thisOrders[j][3] === uZone) {
                  temp = [thisFakeUnits[j][1], thisOrders[j][1],
                    thisOrders[j][2], thisOrders[j][3], thisOrders[j][4], thisOrders[j][5]];
                }
              }
              updatedBuildOptions = updatedBuildOptions.concat([temp]);
            }
          }
        }
      }

      if (turnType === 'move' && orders && thisOrders) {
        if (thisOrders.length === 0 && orders.length === 0) {
          output = baseUnits;
        } else if (thisOrders.length === orders.length) {
          output = updatedUnits;
        } else if (thisOrders.length === 0 && orders.length !== 0) {
          output = updatedSubmitted;
        } else if (thisOrders.length !== 0) {
          output = updatedUnits;
        } else {
          output = baseUnits;
        }
      }
      if (turnType === 'retreat' && thisOrders && orders) {
        if (thisOrders.length === 0 && orders.length === 0) {
          output = baseDislodgedOnes;
        } else if (thisOrders.length === orders.length) {
          output = updatedDislodgedOnes;
        } else if (thisOrders.length === 0 && orders.length !== 0) {
          output = updatedSubmitted;
        } else if (thisOrders.length !== 0) {
          output = updatedDislodgedOnes;
        } else {
          output = baseDislodgedOnes;
        }
      }

      if (turnType === 'build' && thisOrders && orders) {
        if (getPlayersNetAssets(dataGamePositions, thisPlayersRole) > 0) {
          if (thisOrders.length === 0 && orders.length === 0) {
            output = baseBuildOptions;
          } else if (thisOrders.length === orders.length) {
            output = updatedBuildOptions;
          } else if (thisOrders.length === 0 && orders.length !== 0) {
            output = updatedSubmitted;
          } else if (thisOrders.length !== 0) {
            output = updatedBuildOptions;
          } else {
            output = baseBuildOptions;
          }
        } else if (thisOrders.length === 0 && orders.length === 0) {
          output = baseUnits;
        } else if (thisOrders.length === orders.length) {
          output = updatedUnits;
        } else if (thisOrders.length === 0 && orders.length !== 0) {
          output = updatedSubmitted;
        } else if (thisOrders.length !== 0) {
          output = updatedUnits;
        } else {
          output = baseUnits;
        }
      }
    }
  }
  return output;
};

export default dynamicOrdersList;
