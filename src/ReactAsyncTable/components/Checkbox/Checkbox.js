import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.any,
  inline: PropTypes.bool
};

const defaultProps = {
  label: ''
};

const Checkbox = props => {
  const { id, name, defaultChecked, onChange, checked, label, inline } = props;

  return (
    <div
      className={`custom-control custom-checkbox ${
        inline ? 'custom-control-inline' : ''
      }`}
    >
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
export default Checkbox;
