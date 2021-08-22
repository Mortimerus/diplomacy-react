import React from 'react';
import PropTypes from 'prop-types';
import './oneUserIcon.css';

const OneUserIcon = ({ className }) => (
  <svg className={`icon-oneuser ${className}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 60.671 60.671">

    <ellipse cx="30.336" cy="12.097" rx="11.997" ry="12.097" />
    <path d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9C48.354,35.818,42.661,30.079,35.64,30.079z" />

  </svg>
);

export default OneUserIcon;

OneUserIcon.propTypes = {
  className: PropTypes.string.isRequired,
};
