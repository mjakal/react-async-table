import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  selectedItems: PropTypes.object.isRequired,
  expandRow: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  totalColumns: PropTypes.number.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  expandableRowComponent: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onColumnClick: PropTypes.func.isRequired
};

const ReactAsyncTableBody = props => {
  const {
    keyField,
    item,
    selectedItems,
    expandRow,
    columns,
    expandableRowComponent,
    totalColumns,
    options
  } = props;
  const itemID = item[keyField];
  const ExpandableComponent = expandableRowComponent;

  const onExpand = e => props.onExpand(e, itemID);
  const onSelectClick = e => e.stopPropagation();
  const onEdit = e => props.onEdit(e, itemID);
  const onDelete = e => props.onDelete(e, itemID);

  return (
    <tbody>
      <tr onClick={onExpand}>
        {options.multipleSelect && (
          <td>
            <input
              className="form-check-input async-table-body-checkbox"
              type="checkbox"
              name={itemID}
              onClick={onSelectClick}
              onChange={props.onSelect}
              checked={selectedItems[itemID] || false}
            />
          </td>
        )}
        {columns.map((column, index) => {
          const cellData = item[column.dataField];
          let cellWrapper = cellData;

          // Format Cell using custom component
          if (column.formatedField) {
            const Component = column.formatedField;
            cellWrapper = (
              <Component
                columnKey={column.dataField}
                row={item}
                onColumnClick={props.onColumnClick}
              />
            );
          }

          return <td key={index}>{cellWrapper}</td>;
        })}
        {options.defaultActionsColumn && (
          <td className="action-col">
            <span>
              <button
                type="button"
                className="btn btn-link"
                onClick={onEdit}
                data-html="true"
                data-toggle="tooltip"
                title="Edit"
              >
                <i className="far fa-pencil action-icon" />
              </button>
              <button
                type="button"
                className="btn btn-link"
                data-toggle="tooltip"
                title="Delete"
                onClick={onDelete}
              >
                <i className="far fa-trash-alt action-icon" />
              </button>
            </span>
          </td>
        )}
      </tr>
      {options.expandable && (
        <tr className={`collapse ${expandRow[itemID] && 'show'}`}>
          <td colSpan={totalColumns}>
            <ExpandableComponent row={item} />
          </td>
        </tr>
      )}
    </tbody>
  );
};

ReactAsyncTableBody.propTypes = propTypes;
export default ReactAsyncTableBody;
