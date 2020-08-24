import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderSection from './HeaderSection';
import BodySection from './BodySection';
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
import ConditionalWrapper from './components/ConditionalWrapper/ConditionalWrapper';
import { Loader, CardWrapper, GridItemComponent, ExpandableRowComponent } from './ReactAsyncTableComponents';
import { debounce, setCurrentPage, setSortableFields } from './helpers/helpers';
// Table styles
import './scss/style.scss';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  query: PropTypes.string.isRequired,
  activeTabID: PropTypes.string,
  requestFailed: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number.isRequired,
  delay: PropTypes.number,
  splitView: PropTypes.bool,
  flexView: PropTypes.bool,
  layoutType: PropTypes.string,
  bootstrapCheckbox: PropTypes.bool,
  displayHeaderSection: PropTypes.bool,
  tableClass: PropTypes.string,
  insertButtonClass: PropTypes.string,
  deleteButtonClass: PropTypes.string,
  tableHeaderClass: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.bool),
  translations: PropTypes.objectOf(PropTypes.string),
  icons: PropTypes.objectOf(PropTypes.string),
  loader: PropTypes.func,
  actionsComponent: PropTypes.func,
  headerActions: PropTypes.func,
  gridItemComponent: PropTypes.func,
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
  requestFailed: false,
  itemsPerPage: 10,
  activeTabID: '',
  delay: 300,
  displayHeaderSection: true,
  splitView: false,
  flexView: false,
  layoutType: 'SIMPLE_VIEW',
  bootstrapCheckbox: false,
  tableClass: '',
  insertButtonClass: 'btn btn-primary',
  deleteButtonClass: 'btn btn-danger',
  tableHeaderClass: '',
  options: {},
  translations: {},
  icons: {},
  loader: Loader,
  gridItemComponent: GridItemComponent,
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

const defaultOptions = {
  searchBox: true,
  insertButton: false,
  multipleSelect: false,
  expandable: false,
  actionsColumn: false,
  pagination: true
};

const defaultTranslations = {
  searchPlaceholder: 'Search...',
  addButton: 'Add',
  deleteButton: 'Delete',
  listViewTitle: "List View",
  gridViewTitle: "Grid View",
  sortTitle: 'Sort',
  actionsColumnTitle: 'Actions',
  editAction: 'Edit',
  deleteAction: 'Delete',
  noDataText: 'No data found',
  requestFailedText: 'API request failed',
  paginationFirst: 'First',
  paginationLast: 'Last'
};

const defaultIcons = {
  addButtonIcon: 'fa fa-plus',
  deleteButtonIcon: 'fa fa-trash',
  listViewIcon: "fa fa-list",
  gridViewIcon: "fa fa-th",
  tooltipIcon: 'fa fa-question',
  sortIcon: 'fa fa-sort',
  sortIconASC: 'fa fa-sort-asc',
  sortIconDESC: 'fa fa-sort-desc',
  expandIcon: 'fa fa-expand',
  editActionIcon: 'fa fa-pencil',
  deleteActionIcon: 'fa fa-trash',
};

class ReactAsyncTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridView: false,
      sortableFields: {},
      selectedCount: 0,
      selectAllItems: false,
      selectedItems: {},
      expandRow: {}
    };

    this.toggleGridView = this.toggleGridView.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onMultipleSelect = this.onMultipleSelect.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onMultipleDelete = this.onMultipleDelete.bind(this);
  }

  componentDidMount() {
    const { columns, flexView } = this.props;

    // Set the default sort order for all fields
    const sortableFields = setSortableFields(columns);

    this.setState({ gridView: flexView, sortableFields });
  }

  componentDidUpdate(prevProps) {
    const { activeTabID, columns, items, options } = this.props;

    // reset selected items on items array update
    if (options.multipleSelect && prevProps.items !== items) {
      this.setState({
        selectedCount: 0,
        selectAllItems: false,
        selectedItems: {},
        expandRow: {}
      });
    }

    // Reset sort order if activeTabID changes
    if (prevProps.activeTabID !== activeTabID) {
      const sortableFields = setSortableFields(columns);

      this.setState({ sortableFields });
    }
  }

  toggleGridView(gridViewState) {
    const { gridView } = this.state;

    if (gridView === gridViewState) return;

    this.setState({ gridView: gridViewState });
  }

  onSort(columnKey) {
    const { sortableFields } = this.state;
    const currentSortOrder = sortableFields[columnKey];
    let nextSortOrder = '';

    switch (currentSortOrder) {
      case 'asc':
        nextSortOrder = 'desc';
        break;
      case 'desc':
        nextSortOrder = 'asc';
        break;
      default:
        nextSortOrder = 'desc';
        break;
    }

    sortableFields[columnKey] = nextSortOrder;

    this.setState({ sortableFields });
    this.props.onSort(columnKey, nextSortOrder);
  }

  onDelete(rowID) {
    const { currentPage, itemsPerPage, totalItems } = this.props;

    const goToPage = setCurrentPage(currentPage, itemsPerPage, totalItems - 1);

    this.props.onDelete(rowID, goToPage);
  }

  onMultipleDelete() {
    const { keyField, items, currentPage, itemsPerPage, totalItems } = this.props;
    const { selectedItems } = this.state;
    const values = [];

    // detect keyField data type
    const itemID = items[0][keyField];
    const isString = typeof itemID === 'string';

    for (const [key, value] of Object.entries(selectedItems)) {
      if (value) values.push(isString ? key : parseInt(key, 10));
    }

    const goToPage = setCurrentPage(
      currentPage,
      itemsPerPage,
      totalItems - values.length
    );

    this.props.onMultipleDelete(values, goToPage);
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
    const { selectedCount, selectedItems } = this.state;
    const itemCount = value ? selectedCount + 1 : selectedCount - 1;

    selectedItems[name] = value;

    this.setState({ selectedCount: itemCount, selectedItems });
  }

  onMultipleSelect(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { selectedItems } = this.state;
    const { keyField, items } = this.props;
    const itemCount = value ? items.length : 0;

    for (const item of items) {
      selectedItems[item[keyField]] = value;
    }

    this.setState({
      [name]: value,
      selectedCount: itemCount,
      selectedItems
    });
  }

  render() {
    const { sortableFields, selectAllItems, selectedCount, gridView, selectedItems, expandRow } = this.state;
    const {
      displayHeaderSection,
      splitView,
      delay,
      onSearch
    } = this.props;
    
    // Set default values to options/translations/icons props
    const options = {
      ...defaultOptions,
      ...this.props.options
    };
    const translations={
      ...defaultTranslations,
      ...this.props.translations
    };
    const icons={
      ...defaultIcons,
      ...this.props.icons
    };

    const debounceSearch = debounce(searchTerm => {
      onSearch(searchTerm);
    }, delay);

    return (
      <div className="animated fadeIn">
        <ConditionalWrapper 
          condition={splitView && displayHeaderSection}
          wrap={children => (
            <CardWrapper cardClass="async-table-card-filter">
              {children}
            </CardWrapper>
          )}
        >
          <HeaderSection
            {...this.props} 
            selectedCount={selectedCount}
            gridView={gridView}
            toggleGridView={this.toggleGridView}
            debounceSearch={debounceSearch}
            options={options}
            translations={translations}
            icons={icons}
            onMultipleDelete={this.onMultipleDelete} 
          />
        </ConditionalWrapper>
        <ConditionalWrapper 
          condition={splitView}
          wrap={children => (
            <CardWrapper cardClass="async-table-card-content">
              {children}
            </CardWrapper>
          )}
        >
          <BodySection 
            {...this.props} 
            gridView={gridView}
            selectedItems={selectedItems}
            options={options}
            translations={translations}
            icons={icons}
            sortableFields={sortableFields}
            expandRow={expandRow}
            selectAllItems={selectAllItems} 
            onSelect={this.onSelect}
            onMultipleSelect={this.onMultipleSelect}
            onDelete={this.onDelete}
            onExpand={this.onExpand}
            onSort={this.onSort}
          />
        </ConditionalWrapper>
      </div>
    );
  }
}

ReactAsyncTable.propTypes = propTypes;
ReactAsyncTable.defaultProps = defaultProps;
export default ReactAsyncTable;
