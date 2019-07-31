import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactAsyncTable from '../src/index';
import 'bootstrap/scss/bootstrap.scss';

const contacts = [
  {
    id: 1,
    display_name: 'Testing Data',
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
    console.log('onInsert handler', search);
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
            items={contacts}
            currentPage={1}
            itemsPerPage={10}
            totalItems={contacts.length}
            delay={300}
            options={{
              searchBox: true,
              insertButton: true,
              multipleSelect: true,
              expandable: true,
              defaultActionsColumn: true,
              pagination: true
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
    );
  }
}

export default Example;
