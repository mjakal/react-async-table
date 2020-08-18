import React from 'react';
import PropTypes from 'prop-types';
import Paginate from './components/Pagination/Pagination';
import TableBody from './components/TableBody/TableBody';
import GridView from './components/GridView/GridView';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  gridView: PropTypes.bool.isRequired,
  tableClass: PropTypes.string.isRequired,
  tableHeaderClass: PropTypes.string.isRequired,
  bootstrapCheckbox: PropTypes.bool.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.string).isRequired,
  loader: PropTypes.func.isRequired,
  actionsComponent: PropTypes.func.isRequired,
  expandableRowComponent: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  onColumnClick: PropTypes.func.isRequired,
  selectedItems: PropTypes.object.isRequired,
  expandRow: PropTypes.object.isRequired,
  selectAllItems: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onMultipleSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired
};

const BodySection = props => {
  const {
    isLoading,
    requestFailed,
    items,
    currentPage,
    itemsPerPage,
    totalItems,
    gridView,
    options,
    translations,
    loader,
    onChangePage,
  } = props;
  const { paginationFirst, paginationLast } = translations;

  const displayPagination = !isLoading && !requestFailed && options.pagination;
  const displayData = !requestFailed && items.length > 0;
  const displayNoDataComponent = requestFailed || items.length === 0;
  const Loader = loader;

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="animated fadeIn">
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          {(displayData && gridView) ? (
            <GridView 
              {...props}
              displayNoDataComponent={displayNoDataComponent}
            />
          ) : (
            <TableBody 
              {...props}
              displayData={displayData}
              displayNoDataComponent={displayNoDataComponent} 
            />
          )}
        </React.Fragment>
      )}
      {displayPagination && (
        <div className="form-group float-right">
          <Paginate
            currentPage={currentPage}
            pageSize={itemsPerPage}
            items={totalItems}
            onChangePage={onChangePage}
            firstLink={paginationFirst}
            lastLink={paginationLast}
          />
        </div>
      )}
    </React.Fragment>
  );
};

BodySection.propTypes = propTypes;
export default BodySection;