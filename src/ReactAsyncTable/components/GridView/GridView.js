import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../helpers/helpers';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.string).isRequired,
  actionsComponent: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  onColumnClick: PropTypes.func.isRequired
};

const GridView = props => {
  const {
    keyField,
    items,
    columns,
    translations,
    icons,
    actionsComponent,
    options
  } = props;
  // const itemID = item[keyField];
  const itemID = 0;
  const { editAction, deleteAction } = translations;
  const { editActionIcon, deleteActionIcon } = icons;

  const onEdit = () => {
    // props.onEdit(itemID, item);
  };

  const onDelete = () => {
    // props.onDelete(itemID);
  };

  const onAction = (e, type) => {
    switch (type) {
      case 'EDIT_ITEM':
        props.onEdit(itemID, item);
        return;
      case 'DELETE_ITEM': 
        props.onDelete(itemID);
        return;
      default:
        break;
    }

    props.onAction(type, item);
  };

  const ColumnComponent = ({ item, column }) => {
    // Early exit if row has no data
    if (isEmpty(item)) return (<td />);

    const Component = column.formatedField;
    const columnKey = column.dataField || '';

    return (
      <div>
        {Component ? (
          <Component
            columnKey={columnKey}
            row={item}
            onColumnClick={props.onColumnClick}
          />
        ) : (
          <span>{item[columnKey]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="row">
      {items.map(item => (
        <div 
          key={item[keyField]}
          className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
        >
          <div className="card">
            <div className="card-body">
              {columns.map((column, index) => (
                <ColumnComponent key={index} item={item} column={column} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

GridView.propTypes = propTypes;
export default GridView;
