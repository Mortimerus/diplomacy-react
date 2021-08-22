import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import './pickFeature.css';

const PickFeature = ({ themeVarsArr, onChoosePropertyToChange }) => (
  <div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`fontsf_${it[0]}`}>

          {it[4] === 'f' ? (
            <button title={it[3]} key={`fonts_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`bgf_${it[0]}`}>
          {it[4] === 'bg' ? (
            <button title={it[3]} key={`bs_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`s_${it[0]}`}>
          {it[4] === 's' ? (
            <button title={it[3]} key={`ssi_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`bb_${it[0]}`}>
          {it[4] === 'bt' ? (
            <button title={it[3]} key={`bbsi_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`z_${it[0]}`}>
          {it[4] === 'z' || it[4] === 'za' ? (
            <button title={it[3]} key={`bbz_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
    <div className="ccpckftr">
      {themeVarsArr ? themeVarsArr.map((it) => (
        <React.Fragment key={`p_${it[0]}`}>
          {it[4] === 'p' ? (
            <button title={it[3]} key={`pz_${it[0]}`} value="c" type="button" onClick={(e) => onChoosePropertyToChange(e, it)}>{it[1]}</button>
          ) : null}
        </React.Fragment>
      )) : null}
    </div>
  </div>
);

export default PickFeature;

PickFeature.propTypes = {
  themeVarsArr: PropTypes.arrayOf(oneOfType([PropTypes.string, PropTypes.array])).isRequired,
  onChoosePropertyToChange: PropTypes.func.isRequired,
};
