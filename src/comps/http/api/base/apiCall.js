import { RS_DB_SYS_FETCH_ERROR } from '../../../../states/selectors/dbSelectors';
import { RS_POST_SPREAD_OBJ } from '../../../../states/selectors/sharedSelectors';

const apiCall = async (
  meth, // method 'GET'
  api, // api base https
  endpoint, // path of endpoint
  queryString, // query string || false
  sendToken, // jwt token 0 || 1 || 2
  rs, // rs state
  rd, // rs dispatch
  rsKey, // rs key
  payload, // payload || false
  convertFunc, // func, converts payload || false
) => {
  const isResourceInRs = rs[rsKey];

  const inputCheck = () => {
    let outp = true;
    if (
      meth === undefined
        || api === undefined
        || endpoint === undefined
        || queryString === undefined
        || sendToken === undefined
        || rs === undefined
        || rd === undefined
        || rsKey === undefined
        || payload === undefined
        || convertFunc === undefined
    ) {
      outp = false;
    }
    return outp;
  };
  if (inputCheck() && isResourceInRs === undefined) {
    const urlString = `${api}${endpoint}${queryString ? `/${queryString}` : ''}`;
    const callMeth = { method: meth };
    let callBody = {};
    const callHeaders = new Headers();
    let token = false;
    if (sendToken > 0 && rs !== false) {
      const { jwtToken } = rs;
      token = jwtToken;
    }
    const typeJson = ['Content-Type', 'application/json'];

    if (sendToken === 0 && meth !== 'GET') {
      callHeaders.append(typeJson[0], typeJson[1]);
    }
    if (sendToken === 1 && token !== '') {
      callHeaders.append('Authorization', `Bearer ${token}`);
      callHeaders.append(typeJson[0], typeJson[1]);
    }
    if (sendToken === 2 && token !== '') {
      callHeaders.append('AccessToken', token);
      callHeaders.append(typeJson[0], typeJson[1]);
    }

    if (meth !== 'GET' && payload !== 0) {
      callBody = {
        body: JSON.stringify({
          ...payload,
        }),
      };
    }

    const allOptions = {
      ...callMeth,
      headers: callHeaders,
      ...callBody,
    };

    const doCall = await fetch(urlString, {
      ...allOptions,
    })
      .then((it) => it.json())
      .then((res) => {
        let outpDat = null;
        if (convertFunc) {
          outpDat = convertFunc(res);
        } else {
          outpDat = res;
        }
        if (rd && rsKey) {
          rd({
            type: RS_POST_SPREAD_OBJ,
            payload: {
              [rsKey]: outpDat,
            },
          });
        }
        return outpDat;
      }).catch((e) => {
        console.log('EEEEEEEEEEEEEEEe', e);
        rd({
          type: RS_DB_SYS_FETCH_ERROR,
          payload: {
            message: e,
            rsItem: rsKey,
            url: urlString,
            process: 'failed api call',
            time: Date.now(),
          },
        });
        // return error
        // return '_CATCH_';
      });
      // do call
    return doCall;
  }
  // return data from rs
  return rs[rsKey];
};

export default apiCall;
