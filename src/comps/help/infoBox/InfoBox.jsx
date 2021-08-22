import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './infoBox.css';

const InfoBox = ({ summary, list, className }) => {
  const { t } = useTranslation();

  return (
    <details className={`infobox${className !== '' ? ` ${className}` : ''}`}>
      <summary>
        {t(summary)}
      </summary>
      <ul>
        {list ? list.map((it, index) => (
          <li key={it} className={index % 2 === 0 ? 'li2' : ''}>
            {t(it)}
          </li>
        )) : null}
      </ul>

    </details>
  );
};

export default InfoBox;

InfoBox.propTypes = {
  className: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};
