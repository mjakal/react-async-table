import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles.module.css';

const propTypes = {
  placeholder: PropTypes.string,
  activeTabID: PropTypes.string.isRequired,
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
    const { activeTabID } = this.props;

    // Reset search box if activeTabID changes
    if (prevProps.activeTabID !== activeTabID) {
      this.setState({ searchTerm: '' });
    }
  }

  onChange(event) {
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
          autoFocus
          name="search"
          value={searchTerm}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {searchTerm && (
          <button
            type="button"
            className={`btn ${styles.search_clear}`}
            onClick={this.onClear}
          >
            &times;
          </button>
        )}
        <div className="input-group-append async-table-search-button">
          <span className="input-group-text">
            <i className="fa fa-search" />
          </span>
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;
export default SearchBox;
