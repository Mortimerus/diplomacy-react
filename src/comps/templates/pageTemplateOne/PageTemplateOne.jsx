import React from 'react';
import PropTypes from 'prop-types';
import SiteNavigation from '../../controls/siteNavigation/SiteNavigation';
import './pageTemplateOne.css';

const PageTemplateOne = ({ children }) => (
  <div className="pt1-fr">

    <SiteNavigation />

    {children}
  </div>
);

export default PageTemplateOne;

PageTemplateOne.defaultProps = {
  children: null,
};

PageTemplateOne.propTypes = {
  children: PropTypes.element,
};
