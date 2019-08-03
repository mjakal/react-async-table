import React from 'react';
import PropTypes from 'prop-types';
import { PaginationItem, PaginationLink } from './PaginationComponents';

const propTypes = {
  items: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  firstLink: PropTypes.string,
  lastLink: PropTypes.string
};

const defaultProps = {
  currentPage: 1,
  firstLink: 'First',
  lastLink: 'Last'
};

/*
const PaginationItem = props => {
  const { active, disabled, children } = props;
  const isActive = active ? 'active' : '';
  const isDisabled = disabled ? 'disabled' : '';

  return (
    <li className={`page-item ${isActive} ${isDisabled}`}>
      {children}
    </li>
  );
}

const PaginationLink = props => (
  <button 
    className="page-link" 
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
*/  

class Paginate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pager: {}
    };

    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    // set page if items not empty
    if (this.props.items) {
      this.setPage(this.props.currentPage, false);
    }
  }

  componentDidUpdate(prevProps) {
    // reset current page
    if (this.props.currentPage !== prevProps.currentPage) {
      this.setPage(this.props.currentPage, false);
    }
    // reset page if items has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.currentPage, false);
    }
  }

  range(start, end) {
    return Array.from({ length: end - start }, (v, k) => k + start);
  }

  setPage(page, callParentComponent = true) {
    const items = this.props.items || 1;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // set default page size from component props
    const pageSize = this.props.pageSize || 10;

    // get new pager object for specified page
    pager = this.getPager(items, page, pageSize);

    // get new page
    const selectedPage = page;

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    if (callParentComponent) this.props.onChangePage(selectedPage);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages for pager control
    const pages = this.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    const pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <nav aria-label="pagination">
        <ul className="pagination">
          <PaginationItem disabled={pager.currentPage === 1}>
            <PaginationLink page={1} onClick={this.setPage}>
              {this.props.firstLink}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={pager.currentPage === 1}>
            <PaginationLink
              page={pager.currentPage - 1}
              onClick={this.setPage}
              previous
            />
          </PaginationItem>
          {pager.pages.map((page, index) => (
            <PaginationItem key={index} active={pager.currentPage === page}>
              <PaginationLink page={page} onClick={this.setPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={pager.currentPage === pager.totalPages}>
            <PaginationLink
              page={pager.currentPage + 1}
              onClick={this.setPage}
              next
            />
          </PaginationItem>
          <PaginationItem disabled={pager.currentPage === pager.totalPages}>
            <PaginationLink page={pager.totalPages} onClick={this.setPage}>
              {this.props.lastLink}
            </PaginationLink>
          </PaginationItem>
        </ul>
      </nav>
    );
  }
}

Paginate.propTypes = propTypes;
Paginate.defaultProps = defaultProps;
export default Paginate;
