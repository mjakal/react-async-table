import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paginate from './components/Pagination/Pagination';
import SearchBox from './components/SearchBox/SearchBox';
import ReactAsyncTableHeader from './ReactAsyncTableHeader';
import ReactAsyncTableBody from './ReactAsyncTableBody';
import {
  onChangePage,
  onSearch,
  onSort,
  onInsert,
  onEdit,
  onDelete,
  onMultipleDelete,
  onHeaderAction,
  onAction,
  onColumnClick
} from './helpers/defaultEvents';
import { Loader, NoData, ExpandableRowComponent } from './ReactAsyncTableComponents';
import { debounce, setCurrentPage } from './helpers/helpers';
// Table styles
import './scss/style.scss';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number.isRequired,
  delay: PropTypes.number,
  clearSearch: PropTypes.bool,
  options: PropTypes.objectOf(PropTypes.bool),
  translations: PropTypes.objectOf(PropTypes.string),
  icons: PropTypes.objectOf(PropTypes.string),
  loader: PropTypes.func,
  actionsComponent: PropTypes.func,
  headerActions: PropTypes.func,
  expandableRowComponent: PropTypes.func,
  onChangePage: PropTypes.func,
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
  onInsert: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onHeaderAction: PropTypes.func,
  onAction: PropTypes.func,
  onColumnClick: PropTypes.func,
  onMultipleDelete: PropTypes.func
};

const defaultProps = {
  isLoading: false,
  itemsPerPage: 10,
  delay: 300,
  clearSearch: false,
  options: {
    searchBox: true,
    insertButton: false,
    multipleSelect: false,
    expandable: false,
    actionsColumn: false,
    pagination: true
  },
  translations: {
    searchPlaceholder: 'Search...',
    addButton: 'Add',
    deleteButton: 'Delete',
    sortTitle: 'Sort',
    actionsColumnTitle: 'Actions',
    editAction: 'Edit',
    deleteAction: 'Delete',
    noDataText: 'No data found',
    paginationFirst: 'First',
    paginationLast: 'Last'
  },
  icons: {
    addButtonIcon: '',
    deleteButtonIcon: '',
    tooltipIcon: '',
    sortIcon: '',
    editActionIcon: '',
    deleteActionIcon: '',
  },
  loader: Loader,
  expandableRowComponent: ExpandableRowComponent,
  onChangePage: onChangePage,
  onSearch: onSearch,
  onSort: onSort,
  onInsert: onInsert,
  onEdit: onEdit,
  onDelete: onDelete,
  onMultipleDelete: onMultipleDelete,
  onHeaderAction: onHeaderAction,
  onAction: onAction,
  onColumnClick: onColumnClick,
};

class ReactAsyncTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortField: '',
      sortOrder: '',
      selectAllItems: false,
      selectedItems: {},
      expandRow: {}
    };

    this.onExpand = this.onExpand.bind(this);
    this.onMultipleSelect = this.onMultipleSelect.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onMultipleDelete = this.onMultipleDelete.bind(this);
  }

  componentDidMount() {
    const { columns } = this.props;

    // Set the default sort order
    for (const col of columns) {
      if (col.sort && col.sortOrder) {
        this.setState({ 
          sortField: col.dataField,
          sortOrder: col.sortOrder
        });
        break;
      }
    }
  }

  componentDidUpdate(prevPrps) {
    // reset selected items on items array update
    if (this.props.options.multipleSelect && prevPrps.items !== this.props.items) {
      this.setState({
        selectAllItems: false,
        selectedItems: {},
        expandRow: {}
      });
    }
  }

  onMultipleSelect(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { selectedItems } = this.state;
    const { keyField, items } = this.props;

    for (const item of items) {
      selectedItems[item[keyField]] = value;
    }

    this.setState({
      [name]: value,
      selectedItems
    });
  }

  onSort(columnKey) {
    const { sortField, sortOrder } = this.state;
    let nextOrder = '';

    if (sortField === columnKey) {
      nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      nextOrder = 'asc';
    }

    this.setState({ sortField: columnKey, sortOrder: nextOrder });
    this.props.onSort(columnKey, nextOrder);
  }

  onExpand(rowID) {
    const { options } = this.props;

    // Early exit if options.expandable prop is set to false
    if (!options.expandable) {
      event.preventDefault();
      return;
    }

    const { expandRow } = this.state;
    const prevValue = expandRow[rowID] || false;

    expandRow[rowID] = !prevValue;
    this.setState({ expandRow });
  }

  onSelect(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { selectedItems } = this.state;

    selectedItems[name] = value;

    this.setState({ selectedItems });
  }

  onDelete(rowID) {
    const { currentPage, itemsPerPage, totalItems } = this.props;

    const goToPage = setCurrentPage(currentPage, itemsPerPage, totalItems - 1);

    this.props.onDelete(rowID, goToPage);
  }

  onMultipleDelete() {
    const { currentPage, itemsPerPage, totalItems } = this.props;
    const { selectedItems } = this.state;
    const values = [];

    for (const [key, value] of Object.entries(selectedItems)) {
      if (value) values.push(parseInt(key, 10));
    }

    const goToPage = setCurrentPage(
      currentPage,
      itemsPerPage,
      totalItems - values.length
    );

    this.props.onMultipleDelete(values, goToPage);
  }

  render() {
    const { selectAllItems, selectedItems, expandRow } = this.state;
    const {
      keyField,
      isLoading,
      columns,
      items,
      currentPage,
      itemsPerPage,
      totalItems,
      options,
      translations,
      icons,
      delay,
      loader,
      headerActions,
      actionsComponent,
      expandableRowComponent,
      onSearch,
      onChangePage,
      onInsert,
      onEdit,
      onHeaderAction,
      onAction,
      onColumnClick,
      clearSearch
    } = this.props;
    const {
      searchPlaceholder,
      addButton,
      deleteButton,
      sortTitle,
      actionsColumnTitle,
      noDataText,
      paginationFirst,
      paginationLast
    } = translations;
    const {
      addButtonIcon,
      deleteButtonIcon,
      tooltipIcon,
      sortIcon
    } = icons;
    const Loader = loader;
    // Set number of table columns
    const totalColumns =
      columns.length +
      (options.multipleSelect ? 1 : 0) +
      (options.actionsColumn ? 1 : 0);
    
    const HeaderActions = headerActions;

    const debounceSearch = debounce(searchTerm => {
      onSearch(searchTerm);
    }, delay);

    return (
      <div>
        {isLoading ? (
          <div className="animated fadeIn">
            <Loader />
          </div>
        ) : (
          <div className="animated fadeIn">
            <div className="row form-group">
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                {options.searchBox && (
                  <SearchBox
                    placeholder={searchPlaceholder}
                    clearSearch={clearSearch}
                    onChange={debounceSearch}
                  />
                )}
              </div>
              <div className="col-sm-12 col-md-6 col-lg-8 col-xl-9">
                <span className="async-table-header-actions float-right">
                  {options.insertButton && (
                    <button 
                      type="button" 
                      className="btn btn-primary" 
                      onClick={onInsert}
                    >
                      {addButtonIcon && <i className={addButtonIcon} />} {addButton}
                    </button>
                  )}
                  {HeaderActions && <HeaderActions onHeaderAction={onHeaderAction} />}
                  {options.multipleSelect && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.onMultipleDelete}
                    >
                      {deleteButtonIcon && <i className={deleteButtonIcon} />} {deleteButton}
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table async-table-style">
                    <ReactAsyncTableHeader
                      selectAllItems={selectAllItems}
                      columns={columns}
                      options={options}
                      tooltipIcon={tooltipIcon}
                      sortTitle={sortTitle}
                      sortIcon={sortIcon}
                      actionsColumnTitle={actionsColumnTitle}
                      onMultipleSelect={this.onMultipleSelect}
                      onSort={this.onSort}
                    />
                    {items.length === 0 && (
                      <NoData totalColumns={totalColumns} noDataText={noDataText} />
                    )}
                    {items.length > 0 &&
                items.map(item => (
                  <ReactAsyncTableBody
                    key={item[keyField]}
                    keyField={keyField}
                    item={item}
                    selectedItems={selectedItems}
                    actionsComponent={actionsComponent}
                    expandRow={expandRow}
                    columns={columns}
                    totalColumns={totalColumns}
                    options={options}
                    translations={translations}
                    icons={icons}
                    expandableRowComponent={expandableRowComponent}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onEdit={onEdit}
                    onDelete={this.onDelete}
                    onAction={onAction}
                    onColumnClick={onColumnClick}
                  />
                ))}
                  </table>
                </div>
              </div>
            </div>
            {options.pagination && (
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
        )}
      </div>
    );
  }
}

ReactAsyncTable.propTypes = propTypes;
ReactAsyncTable.defaultProps = defaultProps;
export default ReactAsyncTable;
