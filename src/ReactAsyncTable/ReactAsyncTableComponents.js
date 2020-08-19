import React from 'react';
import PropTypes from 'prop-types';

export const Loader = () => (
  <p>Loading data, please wait...</p>
);

export const GridItemComponent = ({ row }) => (
  <div className="card">
    <div className="card-body">
      <p>Missing GridItem Component</p>
    </div>
  </div>
);

GridItemComponent.propTypes = {
  row: PropTypes.object.isRequired
};

const NoData = ({ totalColumns, noDataText }) => (
  <tbody>
    <tr>
      <td
        className="text-center font-weight-normal"
        colSpan={totalColumns}
      >
        {noDataText}
      </td>
    </tr>
  </tbody>
);

NoData.propTypes = { 
  totalColumns: PropTypes.number.isRequired,
  noDataText: PropTypes.string.isRequired
};

const ExpandableRowComponent = () => (
  <p>Please add your custom ExpandableRowComponent to component props</p>
);

ExpandableRowComponent.propTypes = { row: PropTypes.object };

export { NoData, ExpandableRowComponent };
