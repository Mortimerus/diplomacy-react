import { RS_DB_SYS_FETCH_ERROR } from '../../../states/selectors/dbSelectors';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
// import toDataMapVariant from '../../converter/api/toDataMapVariant';

const httpMapconfig = async (variant, rs, rd) => {
  const isGeographyInRs = rs[`dataSVG|${variant}`];

  // is data in store
  if (isGeographyInRs === undefined) {
    const doCall = await fetch(`/maps/${variant}/mapconfig.json`)
      .then((it) => it.json())
      .then((res) => {
        const dataObj = {
          [`dataSVG|${variant}`]: res.map_elements,
          [`dataRoles|${variant}`]: Object.entries(res.roles),
          [`dataViewBox|${variant}`]: res.viewBox,
          [`dataColors|${variant}`]: res.colors,
          [`dataZones|${variant}`]: Object.entries(res.zones),
          [`dataCoastNames|${variant}`]: Object.entries(res.coasts),
        };
        rd({
          type: RS_POST_SPREAD_OBJ,
          payload: {
            ...dataObj,
          },
        });
        return dataObj;
      }).catch((e) => {
        rd({
          type: RS_DB_SYS_FETCH_ERROR,
          payload: {
            message: e.message,
            rsItem: `dataMap|${variant}`,
            url: `/maps/${variant}/standard.json`,
            process: 'fetching map data',
            time: Date.now(),
          },
        });
        // return error
        return '_CATCH_';
      });
      // do call
    return doCall;
  }
  // return data from rs
  return rs[`dataMap|${variant}`];
};

export default httpMapconfig;
