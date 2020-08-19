import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../TableHeader/TableHeader';
import TableItem from './TableItem';
import { NoData } from '../../ReactAsyncTableComponents';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  items: PropTypes.array.isRequired,
  tableClass: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  displayData: PropTypes.bool.isRequired,
  displayNoDataComponent: PropTypes.bool.isRequired
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