import { API_4_ENDPOINT_VARIANTS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';
import toDataMapVariant from '../../../converter/api/toDataMapVariant';

const aC4variantsVariantGET = async (rs, rd, variant) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_VARIANTS,
    variant,
    0,
    rs,
    rd,
    `dataMap|${variant}`,
    false,
    toDataMapVariant,
  );
  return res;
};

export default aC4variantsVariantGET;
