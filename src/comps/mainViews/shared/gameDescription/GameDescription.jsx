import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ROUTE_GAME } from '../../../../constants/paths/appRoutes';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import aC4gamesGameNameGET from '../../../http/api/get/aC4gamesGameNameGET';
import Loader from '../../../spinner/loader/Loader';
import PageTemplateTwo from '../../../templates/pageTemplateTwo/PageTemplageTwo';
import './gameDescription.css';

const GameDescription = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const { gameName } = useParams();
  const dataGameDetails = rs[`dataGames|${gameName}`];

  useEffect(() => {
    aC4gamesGameNameGET(rs, rd, gameName);
  }, [gameName]);

  return (
    <PageTemplateTwo>
      {dataGameDetails ? (
        <div>
          <table className="pldtls-tbl">
            <tbody>

              <tr className="tr1">
                <td>{t('t_024')}</td>
                <td className="tdcntr">
                  <em>
                    {dataGameDetails.name.replace(/_/g, ' ')}
                  </em>
                </td>
              </tr>

              <tr className="tr2">
                <td>
                  {t('t_025')}
                </td>
                <td className="tdcntr">{dataGameDetails.description}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_026')}</td>
                <td className="tdcntr">{dataGameDetails.variant}</td>
              </tr>

              <tr className="tr2">
                <td>
                  {t('t_029')}
                </td>
                <td className="tdcntr">{dataGameDetails.anonymous ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_030')}</td>
                <td className="tdcntr">
                  {dataGameDetails.archive ? '✓' : '⊖'}
                </td>
              </tr>

              <tr className="tr2">
                <td>{t('t_032')}</td>
                <td className="tdcntr">{dataGameDetails.cumulate ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_033')}</td>
                <td className="tdcntr">{dataGameDetails.fast ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_035')}</td>
                <td className="tdcntr">{dataGameDetails.manual ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_034')}</td>
                <td className="tdcntr">{dataGameDetails.play_weekend ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_031')}</td>
                <td className="tdcntr">{dataGameDetails.silent ? '✓' : '⊖'}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_117')}</td>
                <td className="tdcntr">{dataGameDetails.victory_centers === 0 ? '⊖' : dataGameDetails.victory_centers}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_038')}</td>
                <td className="tdcntr">{dataGameDetails.speed_adjustments}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_036')}</td>
                <td className="tdcntr">{dataGameDetails.speed_moves}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_037')}</td>
                <td className="tdcntr">{dataGameDetails.speed_retreats}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_039')}</td>
                <td className="tdcntr">{dataGameDetails.nb_max_cycles_to_play}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_045')}</td>
                <td className="tdcntr">{dataGameDetails.access_restriction_performance === 0 ? '⊖' : dataGameDetails.access_restriction_performance}</td>
              </tr>

              <tr className="tr1">
                <td>{t('t_044')}</td>
                <td className="tdcntr">{dataGameDetails.access_restriction_regularity === 0 ? '⊖' : dataGameDetails.access_restriction_regularity}</td>
              </tr>

              <tr className="tr2">
                <td>{t('t_043')}</td>
                <td className="tdcntr">{dataGameDetails.access_restriction_reliability === 0 ? '⊖' : dataGameDetails.access_restriction_reliability}</td>
              </tr>

              <tr className="tr1">
                <td colSpan="2" className="islink">
                  <Link to={`${ROUTE_GAME}/${dataGameDetails.variant}/${dataGameDetails.name}`}>
                    Link to game
                  </Link>
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      ) : <Loader />}
    </PageTemplateTwo>
  );
};

export default GameDescription;
