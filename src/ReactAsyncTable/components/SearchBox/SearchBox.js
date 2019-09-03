import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  placeholder: PropTypes.string,
  clearSearch: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  placeholder: 'Search...'
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { clearSearch } = this.props;
    if (prevProps.clearSearch !== clearSearch && clearSearch) this.setState({ searchTerm: '' });
  }

  onChange(event) {
    // Early exit if HOC set clearSearch to true
    if (this.props.clearSearch) return;

    const searchTerm = event.target.value;

    this.setState({ searchTerm });
    this.props.onChange(searchTerm);
  }

  onClear() {
    this.setState({ searchTerm: '' });
    this.props.onChange('');
  }

  render() {
    const { searchTerm } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          name="search"
          value={searchTerm}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn async-table-search-clear"
            onClick={this.onClear}
          >
            &times;
          </button>
        )}
      </div>
    );
  }
}

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;
export default SearchBox;
