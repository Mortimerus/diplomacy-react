import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../states/selectors/sharedSelectors';
import './httpErrorMsg.css';

const HttpErrorMsg = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const { dbSysFetchErrors } = rs;

  const removeThisMessage = (timeString) => {
    let newArr = [];
    if (dbSysFetchErrors.length) {
      for (let i = 0; i < dbSysFetchErrors.length; i += 1) {
        if (timeString !== dbSysFetchErrors[i].time) {
          newArr = newArr.concat([dbSysFetchErrors[i]]);
        }
      }
    }
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: { dbSysFetchErrors: newArr },
    });
  };

  if (dbSysFetchErrors.length) {
    return (
      <div className="httperrmsgfr">
        <ul>
          {dbSysFetchErrors.map((it) => (
            <React.Fragment key={it.time}>
              <li>
                <div>{t('t_016')}</div>
                <div>{`process: ${it.process}`}</div>
                <div>{`message: ${it.message}`}</div>
                <div>{`url: ${it.url}`}</div>
                <br />
                <button type="button" onClick={() => removeThisMessage(it.time)}>
                  ok
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export default HttpErrorMsg;
