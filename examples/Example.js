import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactAsyncTable from '../src/index';
import { items } from './sampleData';
import 'bootstrap/scss/bootstrap.scss';

const ExampleLoader = () => (
  <p>This is an example loader component...</p>
);

const ExampleFormatedField = ({ columnKey, row, onColumnClick }) => {
  const onClick = () => onColumnClick(columnKey, row);
  
  return (
    <button className="btn btn-link" onClick={onClick}>
      {row[columnKey] ? 'Yes' : 'No'}
    </button>
  );
}

const ExpandableRowComponent = ({ row }) => (
  <p>Testing expandable row custom component Row ID: {row.id}</p>
);

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoading: true,
      search: '',
      items: [],
      page: 1,
      itemsPerPage: 20,
      totalItems: 0
    };

    this.fakeAsyncAction = this.fakeAsyncAction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMultipleDelete = this.onMultipleDelete.bind(this);
  }

  componentDidMount() {
    this.fakeAsyncAction();
  }

  fakeAsyncAction() {
    setTimeout(() => {
      const { search, page, itemsPerPage } = this.state;
      const currentIndex = (page - 1) * itemsPerPage;

      const filteredItems = items.filter(item => item.title.indexOf(search.toLowerCase()) !== -1);
      
      this.setState(() => ({
        isLoading: false,
        items: filteredItems.slice(currentIndex, currentIndex + itemsPerPage),
        totalItems: filteredItems.length,
      }));
    }, 2000);
  }

  onChangePage(page) {
    this.setState({ page });
    this.fakeAsyncAction(page);
  }

  onSearch(search) {
    this.setState({ search, page: 1 });
    this.fakeAsyncAction();
  }

  onInsert() {
    console.log('onInsert handler');
  }

  onEdit(rowID) {
    console.log('onEdit handler');
    console.log('id:', rowID);
  }

  onDelete(rowID, page) {
    console.log('onDelete handler', rowID, page);
    console.log('id:', rowID);
    console.log('page:', page);
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
    const columns = [
      {
        dataField: 'id',
        text: 'ID'
      },
      {
        dataField: 'userId',
        text: 'User ID'
      },
      {
        dataField: 'title',
        text: 'Title'
      },
      {
        dataField: 'completed',
        text: 'Completed',
        formatedField: ExampleFormatedField
      }
    ];

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
              isLoading={this.state.isLoading}
              columns={columns}
              items={this.state.items}
              currentPage={this.state.page}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.state.totalItems}
              delay={300}
              options={{
                searchBox: true,
                insertButton: true,
                multipleSelect: true,
                expandable: true,
                defaultActionsColumn: true,
                pagination: true
              }}
              translations={{
                searchPlaceholder: 'Search...',
                addButton: 'Add',
                deleteButton: 'Delete',
                actionsColumnTitle: 'Actions',
                editAction: 'Edit',
                deleteAction: 'Delete',
                noDataText: 'No data found',
                paginationFirst: 'First',
                paginationLast: 'Last'
              }}
              icons={{
                addButtonIcon: '',
                deleteButtonIcon: '',
                editActionIcon: '',
                deleteActionIcon: ''
              }}
              loader={ExampleLoader}
              expandableRowComponent={ExpandableRowComponent}
              onChangePage={this.onChangePage}
              onSearch={this.onSearch}
              onColumnClick={this.onColumnClick}
              onInsert={this.onInsert}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onMultipleDelete={this.onMultipleDelete}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Example;
