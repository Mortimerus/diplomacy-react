import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_CHECKS_CREATE_GAME } from './gmcgDefaults';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import intiCreateGame from './initCreateGame';
import reducerCreateGame from './reducerCreateGame';
import { GMC_POST_ITEM } from './selectorsCreateGame';
import { STATE_VAL_CMCG_ALL_OK, STATE_VAL_GMCG_NAME_TOO_LONG } from './stateValuesCreateGame';
import './gmCreateGame.css';
import ac4gamesPOST from '../../http/api/post/aC4gamesPOST';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import DownArrowIcon from '../../icons/downArrow/DownArrowIcon';

const GMCreateGame = () => {
  const [createGameState, dCGS] = useReducer(reducerCreateGame, intiCreateGame);
  const [nameInp, setNameInp] = useState(false);
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const { dashCompGMMenCreateGame, username } = rs;
  const {
    warning1, featuresOpen, archive, anonymous, silent, cumulate, fast,
    manual, description, name, pseudo, variant, callProcess,
  } = createGameState;

  const onNameInput = (e) => {
    const nameVal = e.target.value.replace(/ /g, '_');
    if (nameVal.length > 2 && nameVal.length < 20) {
      setNameInp(true);
      dCGS({
        type: GMC_POST_ITEM, item: 'name', payload: nameVal,
      });
      dCGS({
        type: GMC_POST_ITEM, item: 'warning1', payload: STATE_VAL_CMCG_ALL_OK,
      });
    } else {
      setNameInp(false);
      if (nameVal.length > 20) {
        dCGS({
          type: GMC_POST_ITEM, item: 'warning1', payload: STATE_VAL_GMCG_NAME_TOO_LONG,
        });
      }
    }
  };

  const onCreateGame = (e) => {
    e.preventDefault();
    dCGS({
      type: GMC_POST_ITEM, item: 'callProcess', payload: 1,
    });
    ac4gamesPOST(rs, rd, {
      name,
      description,
      variant,
      archive,
      anonymous,
      silent,
      cumulate,
      speed_moves: createGameState.speed_moves,
      speed_retreats: createGameState.speed_retreats,
      speed_adjustments: createGameState.speed_adjustments,
      play_weekend: createGameState.play_weekend,
      manual,
      access_code: createGameState.access_code,
      access_restriction_reliability: createGameState.access_restriction_reliability,
      access_restriction_regularity: createGameState.access_restriction_regularity,
      access_restriction_performance: createGameState.access_restriction_performance,
      nb_max_cycles_to_play: createGameState.nb_max_cycles_to_play,
      fast,
      pseudo,

    }).then((r) => {
      if (r.msg.indexOf('Ok game created') !== -1) {
        dCGS({
          type: GMC_POST_ITEM, item: 'callProcess', payload: 2,
        });
        setTimeout(() => rd({
          type: RS_POST_SPREAD_OBJ,
          payload: { dashCompGMCreateGame: false },
        }), 3000);
      }
      if (r.msg.indexOf('already exists') !== -1) {
        dCGS({
          type: GMC_POST_ITEM, item: 'callProcess', payload: 3,
        });
      }
    });
  };

  useEffect(() => {
    if (username) {
      dCGS({
        type: GMC_POST_ITEM, item: 'pseudo', payload: username,
      });
    }
  }, [username]);

  return (
    <>
      {dashCompGMMenCreateGame ? (
        <>
          {callProcess === 1 ? t('t_047') : null}
          {callProcess === 2 ? t('t_048') : null}
          {callProcess === 1 ? t('t_049') : null}
          <form hidden={callProcess > 0} className="frm-gm-create-game" onSubmit={onCreateGame}>
            <fieldset>
              <legend className="frm-gm-create-game-toplegend">
                <span>
                  {t('t_022')}
                </span>
              </legend>

              <fieldset className="frm-gm-create-game-group">
                <legend>
                  <span>
                    {t('t_023')}
                  </span>
                </legend>

                <label htmlFor="crgana">
                  <span className="frm-gm-label-span">{t('t_024')}</span>
                  <input className={nameInp && warning1 === STATE_VAL_CMCG_ALL_OK ? 'isok' : ''} id="crgana" type="text" onChange={(e) => onNameInput(e)} required name="name" />
                </label>
                <span className="crgana-toolong">
                  {warning1 === STATE_VAL_GMCG_NAME_TOO_LONG ? t('t_046') : null}
                </span>

                <label htmlFor="crgdes">
                  <span className="frm-gm-label-span tr2">{t('t_025')}</span>

                  <input
                    className={description ? 'isok' : ''}
                    id="crgana"
                    type="text"
                    onChange={(e) => dCGS({
                      type: GMC_POST_ITEM,
                      item: e.target.name,
                      payload: e.target.value,
                    })}
                    required
                    name="description"
                  />

                </label>

                <label htmlFor="crgvar">
                  <span className="frm-gm-label-span">{t('t_026')}</span>

                  <select
                    id="crgvar"
                    name="variant"
                    onChange={(e) => dCGS({
                      type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                    })}
                    onBlur={(e) => dCGS({
                      type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                    })}
                  >
                    <option value="standard">standard</option>
                    <option value="variant1">to be followed 1</option>
                    <option value="variant2">to be followed 2</option>
                    <option value="variant3">to be followed 3</option>
                  </select>
                </label>
              </fieldset>

              <fieldset className="frm-gm-create-game-group">

                <legend>
                  <span>
                    {t('t_027')}
                  </span>
                </legend>
                <button
                  className={createGameState.featuresOpen ? 'isopen' : ''}
                  type="button"
                  name="featuresOpen"
                  onClick={(e) => dCGS({
                    type: GMC_POST_ITEM, item: e.target.name, payload: !featuresOpen,
                  })}
                >
                  <DownArrowIcon />
                </button>
                {featuresOpen ? (
                  <>
                    <label htmlFor="crgarc">

                      <span className="frm-gm-label-span tr2">{t('t_030')}</span>
                      <input
                        id="crgarc"
                        type="checkbox"
                        name="archive"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: archive === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.archive}
                      />
                    </label>

                    <label htmlFor="crgano">

                      <span className="frm-gm-label-span">{t('t_029')}</span>
                      <input
                        id="crgano"
                        type="checkbox"
                        name="anonymous"
                        onClick={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: anonymous === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.anonymous}
                      />
                    </label>

                    <label htmlFor="crgsil">

                      <span className="frm-gm-label-span tr2">{t('t_031')}</span>
                      <input
                        id="crgsil"
                        type="checkbox"
                        name="silent"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: silent === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.silent}
                      />
                    </label>

                    <label htmlFor="crcum">

                      <span className="frm-gm-label-span">
                        {' '}
                        {t('t_032')}
                      </span>
                      <input
                        id="crcum"
                        type="checkbox"
                        name="cumulate"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: cumulate === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.cumulate}
                      />
                    </label>

                    <label htmlFor="crgfas">

                      <span className="frm-gm-label-span tr2">
                        {' '}
                        {t('t_033')}
                      </span>
                      <input
                        id="crgfas"
                        type="checkbox"
                        name="fast"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: fast === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.fast}
                      />
                    </label>
                    <label htmlFor="crgwee">

                      <span className="frm-gm-label-span">
                        {' '}
                        {t('t_034')}
                      </span>
                      <input
                        id="crgwee"
                        type="checkbox"
                        name="play_weekend"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: createGameState.play_weekend === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.play_weekend}
                      />
                    </label>

                    <label htmlFor="crgman">

                      <span className="frm-gm-label-span tr2">{t('t_035')}</span>
                      <input
                        id="crgman"
                        type="checkbox"
                        name="manual"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: manual === 0 ? 1 : 0,
                        })}
                        defaultChecked={DEFAULT_CHECKS_CREATE_GAME.manual}
                      />
                    </label>

                    <label htmlFor="crgspe">

                      <span className="frm-gm-label-span">{t('t_036')}</span>
                      <input
                        className={createGameState.speed_moves ? 'isok' : ''}
                        id="crgspe"
                        type="number"
                        name="speed_moves"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM,
                          item: e.target.name,
                          payload: e.target.value,
                        })}
                        value={createGameState.speed_moves}
                      />
                    </label>

                    <label htmlFor="crgspr">

                      <span className="frm-gm-label-span tr2">{t('t_037')}</span>
                      <input
                        className={createGameState.speed_retreats ? 'isok' : ''}
                        id="crgspr"
                        type="number"
                        name="speed_retreats"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.speed_retreats}
                      />
                    </label>

                    <label htmlFor="crgspa">

                      <span className="frm-gm-label-span">
                        {' '}
                        {t('t_038')}
                      </span>
                      <input
                        className={createGameState.speed_adjustments ? 'isok' : ''}
                        id="crgspa"
                        type="number"
                        name="speed_adjustments"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.speed_adjustments}
                      />
                    </label>

                    <label htmlFor="crgnbx">

                      <span className="frm-gm-label-span tr2">{t('t_039')}</span>
                      <input
                        className={createGameState.nb_max_cycles_to_play ? 'isok' : ''}
                        id="crgnbx"
                        type="number"
                        name="nb_max_cycles_to_play"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.nb_max_cycles_to_play}
                      />
                    </label>
                  </>
                ) : null}

              </fieldset>

              <fieldset className="frm-gm-create-game-group">
                <legend>
                  <span>{t('t_040')}</span>
                </legend>
                <button
                  className={createGameState.accessOpen ? 'isopen' : ''}
                  type="button"
                  name="accessOpen"
                  onClick={(e) => dCGS({
                    type: GMC_POST_ITEM, item: e.target.name, payload: !createGameState.accessOpen,
                  })}
                >
                  <DownArrowIcon />
                </button>
                {createGameState.accessOpen ? (
                  <>
                    <label htmlFor="crgacc">

                      <span className="frm-gm-label-span tr2">
                        {' '}
                        {t('t_042')}
                      </span>
                      <input
                        className={createGameState.access_code !== '' ? 'isok' : ''}
                        id="crgacc"
                        type="number"
                        name="access_code"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.access_code}
                      />
                    </label>

                    <label htmlFor="crgacr">

                      <span className="frm-gm-label-span">{t('t_043')}</span>
                      <input
                        className={createGameState.access_restriction_reliability !== '' ? 'isok' : ''}
                        id="crgacr"
                        type="number"
                        name="access_restriction_reliability"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.access_restriction_reliability}
                      />
                    </label>

                    <label htmlFor="crgagul">

                      <span className="frm-gm-label-span tr2">{t('t_044')}</span>
                      <input
                        className={createGameState.access_restriction_regularity !== '' ? 'isok' : ''}
                        id="crgagul"
                        type="number"
                        name="access_restriction_regularity"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.access_restriction_regularity}
                      />
                    </label>

                    <label htmlFor="crgper">
                      <span className="frm-gm-label-span">{t('t_045')}</span>
                      <input
                        className={createGameState.access_restriction_performance !== '' ? 'isok' : ''}
                        id="crgper"
                        type="number"
                        name="access_restriction_performance"
                        onChange={(e) => dCGS({
                          type: GMC_POST_ITEM, item: e.target.name, payload: e.target.value,
                        })}
                        value={createGameState.access_restriction_performance}
                      />
                    </label>
                  </>
                ) : null}
              </fieldset>
              <fieldset className="frm-gm-create-game-group subm">
                <label htmlFor="crgsss">
                  <input disabled={!nameInp} id="crgsss" type="submit" value={t('t_019')} />
                </label>
              </fieldset>
            </fieldset>
            {console.log('createGame \n', createGameState)}
          </form>
        </>
      ) : null }
    </>
  );
};

export default GMCreateGame;
