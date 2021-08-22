import React, { useEffect } from 'react';
// import Draggable from 'react-draggable';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import aC3playersGET from '../../http/api/get/aC3playersGET';
// import PageTemplateOne from '../../templates/pageTemplateOne/PageTemplateOne';
import './users.css';

const Users = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { dashCompMenUsers, dataPlayers } = rs;

  useEffect(() => {
    aC3playersGET(rs, rd);
  }, []);
  return (
    <div>

      <div>
        {dashCompMenUsers ? (
          <table className="tbl-users">
            <caption>players</caption>
            <thead>
              <tr>
                <th>family name</th>
                <th>first name</th>
                <th>pseudo</th>
                <th>residence</th>
                <th>time zone</th>
              </tr>
            </thead>
            <tbody>
              {dataPlayers ? dataPlayers.map((it, index) => (
                <tr key={`keyPlayersList|${it[0]}`} className={index % 2 === 0 ? 'tr1' : 'tr2'}>
                  <td>{it[1].family_name}</td>
                  <td>{it[1].first_name}</td>
                  <td>{it[1].pseudo.replace(/_/g, ' ')}</td>
                  <td>{it[1].residence}</td>
                  <td>{it[1].time_zone}</td>
                </tr>
              )) : null}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default Users;

// {"4": {"pseudo": "four", "family_name": "", "first_name": "",
// "residence": "FRA", "nationality": "FRA",
//  "time_zone": "UTC+01:00"},
