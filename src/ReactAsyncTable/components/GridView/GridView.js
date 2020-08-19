import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  displayNoDataComponent: PropTypes.bool.isRequired,
  gridItemComponent: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired
};

const GridView = props => {
  const {
    keyField,
    items,
    requestFailed,
    translations,
    displayNoDataComponent,
    gridItemComponent,
  } = props;
  const { noDataText, requestFailedText } = translations;

  const GridItemComponent = gridItemComponent;
  
  return (
    <React.Fragment>
      {displayNoDataComponent && (
        <p className="text-center font-weight-normal">{requestFailed ? requestFailedText : noDataText}</p>
      )}
      <div className="row">
        {items.map(item => {
          const itemID = item[keyField];

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
            <div 
              key={item[keyField]}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
            >
              <GridItemComponent row={item} onAction={onAction} />
            </div>
          )})}
      </div>
    </React.Fragment>
  );
};

GridView.propTypes = propTypes;
export default GridView;
