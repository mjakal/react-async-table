import React from 'react';
import PropTypes from 'prop-types';
import Paginate from './components/Pagination/Pagination';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';
import { NoData } from './ReactAsyncTableComponents';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
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
    keyField,
    isLoading,
    requestFailed,
    columns,
    items,
    currentPage,
    itemsPerPage,
    totalItems,
    selectedItems,
    expandRow,
    tableClass,
    tableHeaderClass,
    bootstrapCheckbox,
    options,
    translations,
    icons,
    loader,
    actionsComponent,
    expandableRowComponent,
    onChangePage,
    onEdit,
    onDelete,
    onAction,
    onColumnClick,
    selectAllItems,
    onSelect,
    onMultipleSelect,
    onExpand,
    onSort
  } = props;
  const {
    sortTitle,
    actionsColumnTitle,
    noDataText,
    requestFailedText,
    paginationFirst,
    paginationLast
  } = translations;
  const {
    tooltipIcon,
    sortIcon
  } = icons;
  // Set number of table columns
  const totalColumns = columns.length +
    (options.multipleSelect ? 1 : 0) +
    (options.expandable ? 1 : 0) +
    (options.actionsColumn ? 1 : 0);

  const displayPagination = !isLoading && !requestFailed && options.pagination;
  const displayTableData = !requestFailed && items.length > 0;
  const displayNoDataComponent = requestFailed || items.length === 0;
  const Loader = loader;

  return(
    <div>
      <div className="row">
        <div className="col-md-12">
          {isLoading ? (
            <div className="animated fadeIn">
              <Loader />
            </div>
          ) : (
            <div className="table-responsive">
              <table className={`table async-table-style ${tableClass}`}>
                <TableHeader
                  tableHeaderClass={tableHeaderClass}
                  selectAllItems={selectAllItems}
                  bootstrapCheckbox={bootstrapCheckbox}
                  columns={columns}
                  options={options}
                  tooltipIcon={tooltipIcon}
                  sortTitle={sortTitle}
                  sortIcon={sortIcon}
                  actionsColumnTitle={actionsColumnTitle}
                  onMultipleSelect={onMultipleSelect}
                  onSort={onSort}
                />
                {displayNoDataComponent && (
                  <NoData 
                    totalColumns={totalColumns} 
                    noDataText={requestFailed ? requestFailedText : noDataText}
                  />
                )}
                {displayTableData && items.map(item => (
                  <TableBody
                    key={item[keyField]}
                    keyField={keyField}
                    item={item}
                    selectedItems={selectedItems}
                    bootstrapCheckbox={bootstrapCheckbox}
                    actionsComponent={actionsComponent}
                    expandRow={expandRow}
                    columns={columns}
                    totalColumns={totalColumns}
                    options={options}
                    translations={translations}
                    icons={icons}
                    expandableRowComponent={expandableRowComponent}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAction={onAction}
                    onColumnClick={onColumnClick}
                  />
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
      {displayPagination && (
        <div className="row form-group">
          <div className="col-md-12">
            <span className="float-right">
              <Paginate
                currentPage={currentPage}
                pageSize={itemsPerPage}
                items={totalItems}
                onChangePage={onChangePage}
                firstLink={paginationFirst}
                lastLink={paginationLast}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

BodySection.propTypes = propTypes;
export default BodySection;