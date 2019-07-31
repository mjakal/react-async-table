import React from 'react';
import PropTypes from 'prop-types';

const NoData = props => (
  <tbody>
    <tr>
      <td
        className="text-center font-weight-normal"
        colSpan={props.totalColumns}
      >
        No data found
      </td>
    </tr>
  </tbody>
);

NoData.propTypes = { totalColumns: PropTypes.number.isRequired };

const ExpandableRowComponent = () => (
  <p>Please add your custom ExpandableRowComponent to component props</p>
);

ExpandableRowComponent.propTypes = { row: PropTypes.object };

export { NoData, ExpandableRowComponent };
