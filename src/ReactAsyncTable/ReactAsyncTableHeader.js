import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectAllItems: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  sortTitle: PropTypes.string.isRequired,
  sortIcon: PropTypes.string.isRequired,
  actionsColumnTitle: PropTypes.string.isRequired,
  onMultipleSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

const ReactAsyncTableHeader = props => {
  const { 
    selectAllItems, 
    columns, 
    options, 
    sortTitle, 
    sortIcon, 
    actionsColumnTitle, 
    onMultipleSelect, 
    onSort 
  } = props;

  return (
    <thead>
      <tr>
        {options.multipleSelect && (
          <th>
            <input
              className="form-check-input header-checkbox"
              type="checkbox"
              name="selectAllItems"
              onChange={onMultipleSelect}
              checked={selectAllItems}
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th key={index}>
            {column.text}
            {column.sort && (
              <span
                className="sort-button"
                data-toggle="tooltip"
                title={sortTitle}
                onClick={() => onSort(column.dataField)}
              >
                {sortIcon ? <i className={sortIcon} /> : <i>&#8661;</i>}
              </span>
            )}
          </th>
        ))}
        {options.actionsColumn && <th>{actionsColumnTitle}</th>}
      </tr>
    </thead>
  );
};

ReactAsyncTableHeader.propTypes = propTypes;
export default ReactAsyncTableHeader
