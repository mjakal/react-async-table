import React from 'react';
import PropTypes from 'prop-types';

const Loader = () => <p>Loading data, please wait...</p>;

const CardWrapper = ({ cardClass, children }) => (
  <div className={`card ${cardClass}`}>
    <div className="card-body">{children}</div>
  </div>
);

CardWrapper.propTypes = {
  cardClass: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

const GridItemComponent = () => (
  <div className="card">
    <div className="card-body">
      <p>Missing GridItem Component</p>
    </div>
  </div>
);

const NoData = ({ totalColumns, noDataText }) => (
  <tbody>
    <tr>
      <td className="text-center font-weight-normal" colSpan={totalColumns}>
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

export {
  Loader,
  CardWrapper,
  GridItemComponent,
  NoData,
  ExpandableRowComponent
};
