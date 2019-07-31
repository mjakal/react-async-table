import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectAllItems: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  actionsColumnTitle: PropTypes.string.isRequired,
  onMultipleSelect: PropTypes.func.isRequired
};

const ReactAsyncTableHeader = props => {
  const { selectAllItems, columns, options, actionsColumnTitle, onMultipleSelect } = props;

  return (
    <thead>
      <tr>
        {options.multipleSelect && (
          <th>
            <input
              className="form-check-input async-table-header-checkbox"
              type="checkbox"
              name="selectAllItems"
              onChange={onMultipleSelect}
              checked={selectAllItems}
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th key={index}>{column.text}</th>
        ))}
        {options.defaultActionsColumn && <th>{actionsColumnTitle}</th>}
      </tr>
    </thead>
  );
};

ReactAsyncTableHeader.propTypes = propTypes;
export default ReactAsyncTableHeader
