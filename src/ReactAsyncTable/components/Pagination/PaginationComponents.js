import React from 'react';
import PropTypes from 'prop-types';

const PaginationItem = ({ active, disabled, children }) => {
  const isActive = active ? 'active' : '';
  const isDisabled = disabled ? 'disabled' : '';

  return (
    <li className={`page-item ${isActive} ${isDisabled}`}>
      {children}
    </li>
  );
};

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}
PaginationItem.defaultProps = {
  active: false,
  disabled: false
};

const PaginationLink = ({ page, previous, next, onClick, children }) => {
  const onPaginate = () => onClick(page);

  if (previous || next) {
    const buttonLabel = previous ? "Previous" : 'Next';
    const buttonIcon = previous ? '‹' : '›';

    return (
      <button 
        className="page-link"
        aria-label={buttonLabel}
        onClick={onPaginate}
      >
        <span aria-hidden="true">{buttonIcon}</span>
        <span className="sr-only">{buttonLabel}</span>
      </button>
    );
  } 
  
  return (
    <button 
      className="page-link" 
      onClick={onPaginate}
    >
      {children}
    </button>
  );
};

PaginationLink.propTypes = {
  page: PropTypes.number.isRequired,
  previous: PropTypes.bool,
  next: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node
}
PaginationLink.defaultProps = {
  previous: false,
  next: false
};

export { PaginationItem, PaginationLink };