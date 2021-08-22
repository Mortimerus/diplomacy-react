import React from 'react';
import PageTemplateOne from '../../../templates/pageTemplateOne/PageTemplateOne';
import DashboardControls from '../../../controls/dashboardControls/DashboardControls';
import Games from '../../../dashboardComps/games/Games';
import GMCreateGame from '../../../dashboardComps/gmCreateGame/GMCreateGame';
import Users from '../../../dashboardComps/users/Users';
import MyGames from '../../../dashboardComps/myGames/MyGames';
import NewUser from '../../../help/newUser/NewUser';

const Play = () => (
  <PageTemplateOne>
    <div>
      <NewUser />
      <DashboardControls />
      <Games />
      <GMCreateGame />
      <Users />
      <MyGames />
    </div>
  </PageTemplateOne>
);

export default Play;
