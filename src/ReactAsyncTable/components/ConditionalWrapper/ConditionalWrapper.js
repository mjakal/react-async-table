import PropTypes from 'prop-types';

const propTypes = {
  condition: PropTypes.bool.isRequired,
  wrap: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

const ConditionalWrapper = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;

ConditionalWrapper.propTypes = propTypes;
export default ConditionalWrapper;
