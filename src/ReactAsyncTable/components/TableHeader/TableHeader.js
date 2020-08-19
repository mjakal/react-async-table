import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import PropTypes from 'prop-types';

const propTypes = {
  tableHeaderClass: PropTypes.string,
  selectAllItems: PropTypes.bool.isRequired,
  bootstrapCheckbox: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  tooltipIcon: PropTypes.string,
  sortTitle: PropTypes.string,
  sortIcon: PropTypes.string,
  actionsColumnTitle: PropTypes.string,
  onMultipleSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

const TableHeader = props => {
  const { 
    tableHeaderClass,
    selectAllItems, 
    bootstrapCheckbox,
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
    <thead className={tableHeaderClass}>
      <tr>
        {options.multipleSelect && (
          <th className="header-checkbox">
            {bootstrapCheckbox ? (
              <Checkbox
                id='async_table_select_all_items'
                name='selectAllItems'
                onChange={onMultipleSelect}
                checked={selectAllItems}
              />
            ) : (
              <div className="form-check">
                <input
                  className="form-check-input position-static"
                  type="checkbox"
                  name="selectAllItems"
                  onChange={onMultipleSelect}
                  checked={selectAllItems}
                />
              </div>
            )}
          </th>
        )}
        {options.expandable && (<th></th>)}
        {columns.map((column, index) => (
          <th 
            key={index}
            onClick={event => { column.sort ? onSort(column.dataField) : event.preventDefault();}}
            style={{ cursor: `${column.sort ? 'pointer' : 'default'}`}}
          >
            {column.text}
            {column.tooltip && (
              <button 
                type="button"
                className="btn btn-link"
                data-html="true"
                data-toggle="tooltip"
                title={column.tooltip}
              >
                {tooltipIcon ? <i className={tooltipIcon} /> : <i>?</i>}
              </button>
            )}
            {column.sort && (
              <span 
                className="sort-icon"
                data-html="true"
                data-toggle="tooltip"
                title={sortTitle}
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

TableHeader.propTypes = propTypes;
export default TableHeader;
