import Lisbon from '../../theme/svgbgs/Lisbon';
import Skulls from '../../theme/svgbgs/Skulls';
import Topography from '../../theme/svgbgs/Topography';
import PieFactory from '../../theme/svgbgs/PieFactory';
import Overcast from '../../theme/svgbgs/Overcast';

// CONFIGS
export const MAP_ITEM_SIZE_MLTPLR = 100;
export const MAP_LINE_STROKE_WIDTH_REL = 9;
export const MAP_HEIGHT_MARKER_REL = 3;
export const MAP_WIDTH_MARKER_REL = 5;
export const MAP_LABEL_FONT_SIZE_REL = 1.5;
export const MAP_ARMY_R_REL = 2.25;
export const MAP_FLEET_REL = 5;
export const MAP_DISLODGED_CROSS_REL = 2;
export const MAP_DISLODGED_UNIT_RIGHT_REL = 2;
export const MAP_DISLODGED_UNIT_DOWN_REL = 2;
export const MAP_CITY_RECT_REL = 3;
export const MAP_CITY_CIRC_REL = 4;
export const MAP_FORBIDDENS_CROSS_REL = 0.5;
export const MAP_SUPPORT_MOVE_DEVIATION_REL = [10, 10];
export const MAP_SUPPORT_HOLD_DEVIATION_REL = [10, 10];
export const MAP_HOLD_REL = 1.5;
export const MAP_CONVOY_DEVIATION_REL = [10, 10];
export const MAP_BUILD_ARMY_REL = 2;
export const MAP_BUILD_FLEET_REL = 0.25;
export const MAP_SACK_UNIT_REL = 0.75;

// token
// export const TOKEN_LIFESPAN_IN_MS = 200000;
export const TOKEN_LIFESPAN_IN_MS = 86400000; // 3600000;
export const TOKEN_WARNING_TO_BE_EXPIRED_IN_MS = 120000;

// supported themes
export const themesArr = [
  ['light', 't_216'],
  ['dark', 't_217'],
  ['custom', 't_218'],
];

// theme color properties
export const themeVarsArr = [
  ['--play-col-mainbg1', 'background 1', 'ccUImainbg1', 'primary background', 'bg'],
  ['--play-col-maincol1', 'font 1', 'ccUImaincol1', 'primary font', 'f'],
  ['--play-col-mainbg2', 'background 2', 'ccUImainbg2', 'secondary background', 'bg'],
  ['--play-col-maincol2', 'font 2', 'ccUImaincol2', 'secondary font', 'f'],
  ['--play-col-mainbg3', 'background 3', 'ccUImainbg3', 'tertiary background', 'bg'],
  ['--play-col-sig1', 'signal 1', 'ccUIsig1', 'primary signal', 's'],
  ['--play-col-sig2', 'signal 2', 'ccUIsig2', 'secondary signal', 's'],
  ['--play-col-btn1', 'button 1', 'ccUIbtn1', 'primary button', 'bt'],
  ['--play-col-btn2', 'button 2', 'ccUIbtn2', 'secondary button', 'bt'],
  ['--play-col-mapland', 'land', 'ccUImapland', 'color of land zones', 'z'],
  ['--play-col-mapwater', 'water', 'ccUImapwater', 'color of sea zones', 'z'],
  ['--play-col-mapbordercolor', 'border color', 'ccUImapbordercolor', 'color of border', 'z'],
  ['--play-col-mapborderwidth', 'border width', 'ccUImapborderwidth', 'width ob border', 'za'],
  ['--play-col-mapbg', 'map background', 'ccUImapbg', 'background color of map', 'z'],
];

// site settings properties
export const siteSettingsPropsArr = [
  ['t_012', 'uiSubMenLanguage', 't_198'], // language
  ['t_129', 'uiSubMenHelp', 't_199'], // help
  ['t_011', 'uiSubMenUIColors', 't_200'], // theme
  ['t_188', 'uiSubMenBackgroundPattern', 't_201'], // background svg
  ['t_013', 'uiSubMenMemory', 't_202'], // memory
];

export const supportedLanguagesArr = [
  ['en', 't_014'], // english
  ['de', 't_015'], // german
  ['dev', 'development'], // development
];

export const svgbgPatternsArr = [
  ['none', '', ''],
  ['Lisbon', Lisbon, '9vmin'],
  ['Topography', Topography, '100vh'],
  ['Overcast', Overcast, '9vmin'],
  ['Skulls', Skulls, '9vmin'],
  ['PieFactory', PieFactory, '9vmin'],
];

// CONVERSIONS

// object, site setting properties set to false
export const resetSiteSettingsPropsObj = () => {
  const outp = {};
  for (let i = 0; i < siteSettingsPropsArr.length; i += 1) {
    outp[siteSettingsPropsArr[i][1]] = false;
  }
  return outp;
};

export const getLanguageNameByCode = (langCode) => {
  let outp = null;
  for (let i = 0; i < supportedLanguagesArr.length; i += 1) {
    if (supportedLanguagesArr[i][0] === langCode) {
      const languageName = supportedLanguagesArr[i][1];
      outp = languageName;
    }
  }
  return outp;
};
