import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox/Checkbox';
import { isEmpty } from '../../helpers/helpers';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  selectedItems: PropTypes.object.isRequired,
  bootstrapCheckbox: PropTypes.bool.isRequired,
  expandRow: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  totalColumns: PropTypes.number.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.string).isRequired,
  actionsComponent: PropTypes.func,
  expandableRowComponent: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  onColumnClick: PropTypes.func.isRequired
};

const TableItem = props => {
  const {
    keyField,
    item,
    selectedItems,
    bootstrapCheckbox,
    expandRow,
    columns,
    translations,
    icons,
    actionsComponent,
    expandableRowComponent,
    totalColumns,
    options,
    onColumnClick
  } = props;
  const itemID = item[keyField];
  const checkboxID = `${keyField}_${itemID}`;
  const { editAction, deleteAction } = translations;
  const { expandIcon, editActionIcon, deleteActionIcon } = icons;
  const isExpandable = options.expandable;
  const ExpandableComponent = expandableRowComponent;

  const onExpand = () => props.onExpand(itemID);
  const onEdit = () => {
    props.onEdit(itemID, item);
  };
  const onDelete = () => {
    props.onDelete(itemID);
  };
  const onAction = (e, type) => {
    switch (type) {
      case 'EDIT_ITEM':
        props.onEdit(itemID, item);
        break;
      case 'DELETE_ITEM':
        props.onDelete(itemID);
        break;
      default:
        props.onAction(type, item);
        break;
    }
  };

  const ColumnComponent = ({ column }) => {
    // Early exit if row has no data
    if (isEmpty(item)) return <td />;

    const Component = column.formatedField;
    const columnKey = column.dataField || '';
    const rowClass = column.rowClass || '';

    return (
      <td className={rowClass}>
        {Component ? (
          <Component
            columnKey={columnKey}
            row={item}
            onColumnClick={onColumnClick}
          />
        ) : (
          <span>{item[columnKey]}</span>
        )}
      </td>
    );
  };

  ColumnComponent.propTypes = { column: PropTypes.object.isRequired };

  const ActionsComponent = () => {
    const Component = actionsComponent;

    return (
      <td className="action-col">
        {Component ? (
          <Component row={item} onAction={onAction} />
        ) : (
          <span>
            <button
              type="button"
              className="btn btn-link"
              onClick={onEdit}
              data-html="true"
              data-toggle="tooltip"
              title={editAction}
            >
              <i className={editActionIcon} />
            </button>
            <button
              type="button"
              className="btn btn-link"
              data-toggle="tooltip"
              title={deleteAction}
              onClick={onDelete}
            >
              <i className={deleteActionIcon} />
            </button>
          </span>
        )}
      </td>
    );
  };

  return (
    <tbody>
      <tr>
        {options.multipleSelect && (
          <td className="body-checkbox">
            {bootstrapCheckbox ? (
              <Checkbox
                id={checkboxID}
                name={`${itemID}`}
                onChange={props.onSelect}
                checked={selectedItems[itemID] || false}
              />
            ) : (
              <div className="form-check">
                <input
                  className="form-check-input position-static"
                  type="checkbox"
                  name={`${itemID}`}
                  onChange={props.onSelect}
                  checked={selectedItems[itemID] || false}
                />
              </div>
            )}
          </td>
        )}
        {isExpandable && (
          <td>
            <button
              type="button"
              className="btn btn-link"
              data-html="true"
              data-toggle="tooltip"
              title="Expand"
              onClick={onExpand}
            >
              <i className={expandIcon} />
            </button>
          </td>
        )}
        {columns.map((column, index) => (
          <ColumnComponent key={index} column={column} />
        ))}
        {options.actionsColumn && <ActionsComponent />}
      </tr>
      {isExpandable && (
        <tr className={`collapse ${expandRow[itemID] ? 'show' : ''}`}>
          <td colSpan={totalColumns}>
            <ExpandableComponent row={item} />
          </td>
        </tr>
      )}
    </tbody>
  );
};

TableItem.propTypes = propTypes;
export default TableItem;
