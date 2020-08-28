import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactAsyncTable from 'react-async-table';
import 'react-async-table/dist/index.css';
import { tasks } from './sampleData';

const ExampleLoader = () => (
  <p>This is an example loader component...</p>





  
);

const ExampleHeaderActions = ({ onHeaderAction }) => (
  <span>
    <button
      type="button"
      className="btn btn-secondary"
      data-html="true"
      data-toggle="tooltip"
      title="Action 1"
      onClick={e => onHeaderAction('HEADER_ACTION_1')}
    >
      <i className="fa fa-pencil" />
    </button>
    <button
      type="button"
      className="btn btn-secondary"
      data-html="true"
      data-toggle="tooltip"
      title="Action 2"
      onClick={e => onHeaderAction('HEADER_ACTION_2')}
    >
      <i className="fa fa-wrench" />
    </button>
  </span>
);

const ExampleGridItemComponent = ({ row, onAction }) => {
  const columnIcon = row['completed'] ? 'fa fa-check' : 'fa fa-times';
  const columnText = row['completed'] ? 'Completed' : 'Pending';
  
  return (
    <div className="card mb-2">
      <div className="card-header">Task</div>
      <div className="card-body" style={{ height: '80px' }}>
        <p>{row["title"]}</p>
      </div>
      <div className="card-footer">
        <span style={{ lineHeight: '2rem'}}><i className={columnIcon} /> {columnText}</span>
        <span className="float-right">
          <button
            type="button"
            className="btn btn-light"
            onClick={e => onAction(e, 'EDIT_ITEM')}
            data-html="true"
            data-toggle="tooltip"
            title="Edit Item"
          >
            <i className="fa fa-pencil" />
          </button>
          <button
            type="button"
            className="btn btn-light"
            data-toggle="tooltip"
            title="Custom Action"
            onClick={e => onAction(e, 'CUSTOM_ACTION')}
          >
            <i className="fa fa-plus" />
          </button>
          <button
            type="button"
            className="btn btn-light"
            data-toggle="tooltip"
            title="Delete Item"
            onClick={e => onAction(e, 'DELETE_ITEM')}
          >
            <i className="fa fa-minus" />
          </button>
        </span>
      </div>
    </div>
  )
};

const ExampleFormatedField = ({ columnKey, row, onColumnClick }) => {
  const columnIcon = row[columnKey] ? 'fa fa-check' : 'fa fa-times';
  const columnText = row[columnKey] ? 'Completed' : 'Pending';
  const onClick = () => onColumnClick(columnKey, row);
  
  return (
    <button className="btn btn-link" onClick={onClick}>
      <i className={columnIcon} /> {columnText}
    </button>
  );
}

const ExampleActionsComponent = ({ row, onAction }) => {
  return (
    <span>
      <button
        type="button"
        className="btn btn-link"
        onClick={e => onAction(e, 'EDIT_ITEM')}
        data-html="true"
        data-toggle="tooltip"
        title="Edit Item"
      >
        <i className="fa fa-pencil" />
      </button>
      <button
        type="button"
        className="btn btn-link"
        data-toggle="tooltip"
        title="Custom Action"
        onClick={e => onAction(e, 'CUSTOM_ACTION')}
      >
        <i className="fa fa-plus" />
      </button>
      <button
        type="button"
        className="btn btn-link"
        data-toggle="tooltip"
        title="Delete Item"
        onClick={e => onAction(e, 'DELETE_ITEM')}
      >
        <i className="fa fa-minus" />
      </button>
    </span>
  );
}

const ExpandableRowComponent = ({ row }) => {
  return (
    <p>Testing expandable row custom component Row ID: {row.id}</p>
  );
}

const columns = [
  {
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'userId',
    text: 'User ID',
  },
  {
    dataField: 'title',
    text: 'Task',
    tooltip: 'Example Tooltip',
    sort: true,
    sortOrder: 'default' // values: default|asc|desc
  },
  {
    dataField: 'completed',
    text: 'Status',
    formatedField: ExampleFormatedField
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoading: true,
      search: '',
      items: [],
      page: 1,
      itemsPerPage: 12,
      totalItems: 0
    };

    this.fakeAsyncAction = this.fakeAsyncAction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMultipleDelete = this.onMultipleDelete.bind(this);
  }

  componentDidMount() {
    this.fakeAsyncAction();
  }

  fakeAsyncAction() {
    const dataDelay = Math.floor(Math.random() * (1000 - 300 + 1) + 300);

    setTimeout(() => {
      const { search, page, itemsPerPage } = this.state;
      const currentIndex = (page - 1) * itemsPerPage;

      const filteredItems = tasks.filter(item => item.title.indexOf(search.toLowerCase()) !== -1);
      
      this.setState(() => ({
        isLoading: false,
        items: filteredItems.slice(currentIndex, currentIndex + itemsPerPage),
        totalItems: filteredItems.length,
      }));
    }, dataDelay);
  }

  onChangePage(page) {
    this.setState({ page, isLoading: true });
    this.fakeAsyncAction();
  }

  onSearch(search) {
    console.log("query", search);
    this.setState({ search, page: 1, isLoading: true });
    this.fakeAsyncAction();
  }

  onSort(sortField, sortOrder) {
    const { items } = this.state;

    console.log('onSort handler');
    console.log('sortField:', sortField);
    console.log('sortOrder:', sortOrder);

    items.sort((a, b) => a[sortField].localeCompare(b[sortField]));

    const sortedItems = sortOrder === 'asc' ? items : items.reverse();

    this.setState({ items, sortedItems });
  }

  onInsert() {
    console.log('onInsert handler');
  }

  onEdit(rowID, row) {
    console.log('onEdit handler');
    console.log('id:', rowID);
    console.log('row:', row);
  }

  onDelete(rowID, page) {
    console.log('onDelete handler');
    console.log('id:', rowID);
    console.log('page:', page);
  }

  onHeaderAction(type) {
    console.log('onHeaderAction handler');
    console.log('type:', type);
  }
  
  onAction(type, row) {
    console.log('onAction handler');
    console.log('type:', type);
    console.log('row:', row);
  }

  onMultipleDelete(values, page) {
    console.log('onMultipleDelete handler');
    console.log('ids:', values);
    console.log('page:', page);
  }

  onColumnClick(columnKey, row) {
    console.log('onColumnClick handler');
    console.log('column:', columnKey);
    console.log('row data:', row);
  }

  render() {
    const { isLoading, items, page, itemsPerPage, totalItems  } = this.state;
    
    return (
      <div className="container">
        <Card>
          <CardHeader>
            <span className="btn btn-outline-light active btn-no-click">
              <b> React Async Table Example</b>
            </span>
          </CardHeader>
          <CardBody>
            <ReactAsyncTable
              keyField="id"
              activeTabID=""
              isLoading={isLoading}
              displayHeaderSection={true}
              splitView={false}
              flexView={false} // table/grid view
              layoutType="FLEX_VIEW" // available layout types: SIMPLE_VIEW, FLEX_VIEW
              bootstrapCheckbox={true}
              requestFailed={false}
              columns={columns}
              items={items}
              tableClass="table-outline"
              tableHeaderClass="thead-light"
              currentPage={page}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              delay={300}
              options={{
                searchBox: true,
                insertButton: true,
                multipleSelect: true,
                expandable: true,
                actionsColumn: true,
                pagination: true
              }}
              translations={{
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
              }}
              icons={{
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
                deleteActionIcon: 'fa fa-trash'
              }}
              loader={ExampleLoader}
              headerActions={ExampleHeaderActions}
              gridItemComponent={ExampleGridItemComponent}
              actionsComponent={ExampleActionsComponent}
              expandableRowComponent={ExpandableRowComponent}
              onChangePage={this.onChangePage}
              onSearch={this.onSearch}
              onSort={this.onSort}
              onColumnClick={this.onColumnClick}
              onInsert={this.onInsert}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onHeaderAction={this.onHeaderAction}
              onAction={this.onAction}
              onMultipleDelete={this.onMultipleDelete}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default App;
