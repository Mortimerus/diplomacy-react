import { API_4_ENDPOINT_GAME_ADJUDICATIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import { namesCoastArr, namesRolesArr, namesZonesArr } from '../../../converter/middle/orders/convertOrdersForApi';
import apiCall from '../base/apiCall';

const aC4gameAdjudicationsGameIdPOST = async (rs, rd) => {
  const { thisGameId, thisVariant, username } = rs;

  const zones = rs[`dataZones|${thisVariant}`];
  const roles = rs[`dataRoles|${thisVariant}`];
  const dataCoastNames = rs[`dataCoastNames|${thisVariant}`];

  const names = JSON.stringify({
    roles: namesRolesArr(roles),
    zones: namesZonesArr(zones),
    coasts: namesCoastArr(dataCoastNames),
  });

  const payload = {
    pseudo: username,
    names,
  };

  const res = await apiCall(
    'POST',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_ADJUDICATIONS,
    thisGameId,
    2,
    rs,
    rd,
    false,
    payload,
    false,
  );

  return res;
};

export default aC4gameAdjudicationsGameIdPOST;
