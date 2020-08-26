import React from 'react';
import PropTypes from 'prop-types';
import Paginate from './components/Pagination/Pagination';
import TableBody from './components/TableBody/TableBody';
import GridView from './components/GridView/GridView';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  gridView: PropTypes.bool.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  loader: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired
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
    onChangePage
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
          {gridView ? (
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
