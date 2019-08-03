# React Async Table

![React Async Table Screenshot](https://i.ibb.co/PTMb4Tp/screenshot.png)

Creating yet another bootstrap based data table component, came out of necessity.
While I was working on one of my React projects, I discovered that there are a lot of solutions out there, most of them required heavy customization or lacked basic features such as built in customizable expandable rows, asynchronous filtering and pagination, so I rolled up my sleeves and voilà :)!

If you want to bring balance to the force and want a simple but flexible solution for displaying and filtering asynchronous data, give it a try.

## Key Features

- Declarative configuration
- Filterable
- Selectable rows
- Customizable loading screen
- Customizable expandable rows
- Customizable columns
- CRUD Buttons with customizable icons
- Translatable
- Pagination
- Based on Bootstrap 4

## Requirements

React Async Table component requires the following to be installed in your project:

- bootstrap >= 4.0.0
- react >= 16.3.0

* react-dom >= 16.3.0

## Installation

Open the terminal, cd into your project folder and run one of the commands below depending on your package manager.

```
npm install react-async-table
yarn add react-async-table
```

### Basic Example

```
import React from 'react';
import ReactAsyncTable from 'react-async-table';

// Table Data
const tasks = [ ... ];
// Column setup
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
    text: 'Task'
  },
  {
    dataField: 'completed',
    text: 'Status',
  }
];

class Example extends React.Component {
  render() {
    return (
      <ReactAsyncTable
        keyField="id"
        columns={columns}
        items={tasks}
        currentPage={1}
        itemsPerPage={10}
        totalItems={tasks.length}
      />
    );
  }
}

export default Example;
```

### Full Example

```
import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/css/font-awesome.min.css';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactAsyncTable from 'react-async-table';

const tasks = [ ... ];

const ExampleLoader = () => (
  <p>This is an example loader component...</p>
);

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

const ExpandableRowComponent = ({ row }) => (
  <p>Testing expandable row custom component Row ID: {row.id}</p>
);

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
    text: 'Task'
  },
  {
    dataField: 'completed',
    text: 'Status',
    formatedField: ExampleFormatedField
  }
];

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      search: '',
      items: [],
      page: 1,
      itemsPerPage: 10,
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
    this.setState({ page });
    this.fakeAsyncAction();
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
              isLoading={isLoading}
              columns={columns}
              items={items}
              currentPage={page}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
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
                addButtonIcon: 'fa fa-plus',
                deleteButtonIcon: 'fa fa-trash',
                editActionIcon: 'fa fa-pencil',
                deleteActionIcon: 'fa fa-trash'
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
```

## Testing & Development

Install the latest version of node and npm on your system and clone the repo.

```
git clone https://github.com/mjakal/react-async-table.git
```

Then, cd into react-async-table folder and run these commands.

```
npm install
npm start
```

Open your favorite browser and navigate to http://localhost:8080
