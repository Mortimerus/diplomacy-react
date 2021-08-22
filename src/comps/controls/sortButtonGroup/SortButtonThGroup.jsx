import React from 'react';
import PropTypes from 'prop-types';
import './sortButtonThGroup.css';

const SortButtonThGroup = ({
  itemLabel, sortItem, value1, value2, onSortList,
}) => (
  <th className="th-sortbtn-grp">
    <div>
      {itemLabel}
    </div>
    <div>
      <button className="th-sortbtn-btn" type="button" value={value1} name={sortItem} onClick={(e) => onSortList(e)}>↓</button>
      <button className="th-sortbtn-btn" type="button" value={value2} name={sortItem} onClick={(e) => onSortList(e)}>↑</button>
    </div>
  </th>
);

export default SortButtonThGroup;

SortButtonThGroup.propTypes = {
  itemLabel: PropTypes.string.isRequired,
  sortItem: PropTypes.string.isRequired,
  value1: PropTypes.string.isRequired,
  value2: PropTypes.string.isRequired,
  onSortList: PropTypes.func.isRequired,
};
