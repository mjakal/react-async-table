import React from 'react';
import PropTypes from 'prop-types';

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

const GridItem = props => {
  const {
    keyField,
    items,
    columns,
    translations,
    icons,
    actionsComponent,
    options
  } = props;
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

  return (
    <div className="row">
      <div className="col-xl-4">
        <p>testing</p>
      </div>
    </div>
  );
};

GridItem.propTypes = propTypes;
export default GridItem;
