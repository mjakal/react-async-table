import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../TableHeader/TableHeader';
import TableItem from './TableItem';
import { NoData } from '../../ReactAsyncTableComponents';

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
  displayData: PropTypes.bool.isRequired,
  displayNoDataComponent: PropTypes.bool.isRequired,
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

const TableBody = props => {
  const {
    keyField,
    requestFailed,
    columns,
    items,
    tableClass,
    options,
    translations,
    displayData,
    displayNoDataComponent
  } = props;
  const { noDataText,requestFailedText } = translations;

  // Set number of table columns
  const totalColumns = columns.length +
    (options.multipleSelect ? 1 : 0) +
    (options.expandable ? 1 : 0) +
    (options.actionsColumn ? 1 : 0);

  return (
    <div className="table-responsive">
      <table className={`table async-table-style ${tableClass}`}>
        <TableHeader {...props} />
        {displayNoDataComponent && (
          <NoData 
            totalColumns={totalColumns} 
            noDataText={requestFailed ? requestFailedText : noDataText}
          />
        )}
        {displayData && items.map(item => (
          <TableItem
            key={item[keyField]}
            {...props}
            item={item}
            totalColumns={totalColumns}
          />
        ))}
      </table>
    </div>
  );
}

TableBody.propTypes = propTypes;
export default TableBody;