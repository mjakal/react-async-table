import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import PropTypes from 'prop-types';

const propTypes = {
  tableHeaderClass: PropTypes.string,
  selectAllItems: PropTypes.bool.isRequired,
  bootstrapCheckbox: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  sortableFields: PropTypes.object.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string),
  icons: PropTypes.objectOf(PropTypes.string),
  onMultipleSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

const TableHeader = props => {
  const {
    tableHeaderClass,
    selectAllItems,
    bootstrapCheckbox,
    columns,
    sortableFields,
    options,
    translations,
    icons,
    onMultipleSelect,
    onSort
  } = props;
  const { tooltipIcon, sortIcon, sortIconASC, sortIconDESC } = icons;
  const { sortTitle, actionsColumnTitle } = translations;

  return (
    <thead className={tableHeaderClass}>
      <tr>
        {options.multipleSelect && (
          <th className="header-checkbox">
            {bootstrapCheckbox ? (
              <Checkbox
                id="async_table_select_all_items"
                name="selectAllItems"
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
        {options.expandable && <th />}
        {columns.map((column, index) => {
          const dataField = column.dataField;
          const isSortable = !!column.sort;
          let sortFieldIcon = '';

          if (isSortable) {
            const currentSortOrder = sortableFields[dataField];

            switch (currentSortOrder) {
              case 'asc':
                sortFieldIcon = sortIconASC;
                break;
              case 'desc':
                sortFieldIcon = sortIconDESC;
                break;
              default:
                sortFieldIcon = sortIcon;
                break;
            }
          }

          return (
            <th
              key={index}
              onClick={event => {
                isSortable ? onSort(dataField) : event.preventDefault();
              }}
              style={{ cursor: `${isSortable ? 'pointer' : 'default'}` }}
            >
              {column.text}
              {column.tooltip && (
                <span
                  className="mr-1"
                  data-html="true"
                  data-toggle="tooltip"
                  title={column.tooltip}
                >
                  {tooltipIcon ? <i className={tooltipIcon} /> : <i>?</i>}
                </span>
              )}
              {isSortable && (
                <span
                  className="float-right"
                  data-html="true"
                  data-toggle="tooltip"
                  title={sortTitle}
                >
                  <i className={sortFieldIcon} />
                </span>
              )}
            </th>
          );
        })}
        {options.actionsColumn && <th>{actionsColumnTitle}</th>}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = propTypes;
export default TableHeader;
