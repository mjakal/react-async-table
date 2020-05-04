import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  styles: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  query: PropTypes.string.isRequired,
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

  componentDidMount() {
    const { query } = this.props;
    
    this.setState({ searchTerm: query });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      // Reset search box if query is an empty string
      if (!this.props.query && this.state.searchTerm) {
        this.setState({ searchTerm: '' });
      }
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
    const { styles, placeholder } = this.props;

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
            className={`${styles.async_table__search_clear} btn`}
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
