import React from 'react';
import PropTypes from 'prop-types';
import SiteNavigation from '../../controls/siteNavigation/SiteNavigation';
import './pageTemplateTwo.css';

const PageTemplateTwo = ({ children }) => (
  <div className="pt2-fr">

    <SiteNavigation />
    <div className="pt2-cont">
      {children}
    </div>
  </div>
);

export default PageTemplateTwo;

PageTemplateTwo.defaultProps = {
  children: null,
};

PageTemplateTwo.propTypes = {
  children: PropTypes.element,
};
