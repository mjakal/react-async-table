import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  selectAllItems: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  tooltipIcon: PropTypes.string,
  sortTitle: PropTypes.string,
  sortIcon: PropTypes.string,
  actionsColumnTitle: PropTypes.string,
  onMultipleSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

const ReactAsyncTableHeader = props => {
  const { 
    selectAllItems, 
    columns, 
    options, 
    tooltipIcon,
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
            {column.tooltip && (
              <button 
                type="button"
                className="btn btn-link"
                data-toggle="tooltip" 
                data-html="true"
                data-toggle="tooltip"
                title={column.tooltip}
              >
                {tooltipIcon ? <i className={tooltipIcon} /> : <i>?</i>}
              </button>
            )}
            {column.sort && (
              <button
                type="button"
                className="btn btn-link sort-button"
                data-html="true"
                data-toggle="tooltip"
                title={sortTitle}
                onClick={() => onSort(column.dataField)}
              >
                {sortIcon ? <i className={sortIcon} /> : <i>&#8661;</i>}
              </button>
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
