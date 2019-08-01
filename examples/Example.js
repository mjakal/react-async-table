import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactAsyncTable from '../src/index';
import 'bootstrap/scss/bootstrap.scss';

const items = [
  {
    id: 1,
    display_name: 'Test Data 1',
    number: '123456789',
    mobile: '123456789'
  },
  {
    id: 2,
    display_name: 'Test Data 2',
    number: '123456789',
    mobile: '123456789'
  },
  {
    id: 3,
    display_name: 'Test Data 3',
    number: '123456789',
    mobile: '123456789'
  },
  {
    id: 4,
    display_name: 'Test Data 4',
    number: '123456789',
    mobile: '123456789'
  }
];

const CellFormatter = ({ columnKey, row, onColumnClick }) => (
  <button className="btn btn-link" onClick={onColumnClick}>
    {row[columnKey]}
  </button>
);

const ExpandableRowComponent = ({ row }) => (
  <p>Testing expandable row custom component Row ID: {row.id}</p>
);

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = { page: 1 };

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onInsert = this.onInsert.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMultipleDelete = this.onMultipleDelete.bind(this);
  }

  componentDidMount() {}

  onChangePage(page) {
    console.log('onChangePage handler', page);
  }

  onSearch(search) {
    console.log('onSearch handler', search);
  }

  onInsert() {
    console.log('onInsert handler');
  }

  onEdit(rowID) {
    console.log('onEdit handler', rowID);
  }

  onMultipleDelete(values, page) {
    console.log('onMultipleDelete handler', values,page);
  }

  render() {
    const columns = [
      {
        dataField: 'id',
        text: 'ID'
      },
      {
        dataField: 'display_name',
        text: 'Name'
      },
      {
        dataField: 'number',
        formatedField: CellFormatter,
        text: 'Number'
      },
      {
        dataField: 'mobile',
        text: 'Mobile'
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
              columns={columns}
              items={items}
              currentPage={1}
              itemsPerPage={10}
              totalItems={items.length}
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
              expandableRowComponent={ExpandableRowComponent}
              onChangePage={this.onChangePage}
              onSearch={this.onSearch}
              onInsert={this.onInsert}
              onEdit={this.onEdit}
              onMultipleDelete={this.onMultipleDelete}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Example;
