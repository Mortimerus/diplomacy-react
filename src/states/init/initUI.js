import initUIclient from './initUIclient';
import initUIcustomTheme from './initUIcustomTheme';
import initUIboard from './initUIboard';
import { themeVarsArr } from '../../constants/defaults/uiConfig';
import initUIdashboard from './initUIdashboard';

const initUI = {
  isAuth: false,
  username: null,
  password: null,
  jwtToken: null,
  jwtTime: null,
  jwtExpireMsg: null,

  dom: {
    refMain: null,
  },
  currentLanguage: null,

  uiProcLoginIsSending: false,
  uiProcLoginError: false,
  uiProcSendOrders: false,

  uiShowHelp: true,
  isNewUser: false,

  client: initUIclient,
  ccUIThemeProps: themeVarsArr,

  customTheme: initUIcustomTheme,

  themeColor: 'light',
  uiMenSiteSettings: false,
  uiSubMenUIColors: false,
  uiSubMenMemory: false,
  uiSubMenLanguage: false,
  uiSubMenHelp: false,
  uiSubMenBackgroundPattern: false,
  uiSubSubMenCustomTheme: false,
  uiTempCustomThemeOpenPickersArr: [],
  uiTempCustomThemeHasUnsavedChanges: false,
  uiBackgroundPattern: 'Lisbon',

  mapUIstylingDefault: true,
  uiMenSiteNav: true,

  ...initUIboard,
  ...initUIdashboard,

  thisGameId: null,
  thisCurrentAdvancement: null,
  thisGameName: null,
  thisVariant: null,
  thisTurnMode: 0,
  thisPlayersRole: null,
  thisOrdersNeeded: false,
  thisOrdersSubmitted: false,
  thisZoneInfo: null,
  thisEnteringOrders: false,
  thisClickY: null,
  thisClickX: null,
  thisOrders: [],
  thisFakeUnits: [],
  thisOrderType: 0,
  thisAskForCoastalZone: null,
  thisTempZone: null,
  thisPassiveZone: null,
  thisForbidden: [],
  thisHighlight: [],

  boardMenMessages: false,
  boardMenOrders: true,
  boardMenZoneInfo: true,
  boardShowCurrentOrders: false,
  boardOrderErrorMsg: null,
  boardIsEnteringOrders: false,
  boardAllowSplitView: true,
  boardMenGameInfo: false,
  boardMenGameAction: false,
  boardMenGameMaster: false,

  boardMenGI: false,
  boardSubMenStats: false,
  boardSubMenGGI: true,

  boardSubMenStatsExpanded: false,
  boardSubMenGGIExpanded: true,
};

export default initUI;
