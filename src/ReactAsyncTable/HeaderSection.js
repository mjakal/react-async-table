import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './components/SearchBox/SearchBox';

const propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  query: PropTypes.string.isRequired,
  activeTabID: PropTypes.string,
  requestFailed: PropTypes.bool,
  splitHeaderSection: PropTypes.bool,
  displayHeaderSection: PropTypes.bool,
  insertButtonClass: PropTypes.string,
  deleteButtonClass: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.bool),
  translations: PropTypes.objectOf(PropTypes.string),
  icons: PropTypes.objectOf(PropTypes.string),
  headerActions: PropTypes.func,
  onChange: PropTypes.func,
  onInsert: PropTypes.func,
  onHeaderAction: PropTypes.func,
  onMultipleDelete: PropTypes.func
};

const HeaderSection = props => {
  const {
    selectedCount,
    isLoading,
    query,
    activeTabID,
    requestFailed,
    displayHeaderSection,
    splitHeaderSection,
    insertButtonClass,
    deleteButtonClass,
    options,
    translations,
    icons,
    headerActions,
    onChange,
    onInsert,
    onHeaderAction,
    onMultipleDelete
  } = props;
  const {
    searchPlaceholder,
    addButton,
    deleteButton
  } = translations;
  const {
    addButtonIcon,
    deleteButtonIcon
  } = icons;

  const HeaderActions = headerActions;

  return (
    <React.Fragment>
      {displayHeaderSection && (
        <div className={`row form-group ${splitHeaderSection && 'async-table-header-section'}`}>
          <div className="col-12 order-2 col-md-6 order-md-1 col-lg-4 col-xl-3 mb-1">
            {options.searchBox && (
              <SearchBox
                placeholder={searchPlaceholder}
                query={query}
                activeTabID={activeTabID}
                onChange={onChange}
              />
            )}
          </div>
          <div className="col-12 order-1 col-md-6 order-md-2 col-lg-8 col-xl-9 mb-1">
            <span className="async-table-header-actions float-right">
              {options.insertButton && (
                <button 
                  type="button" 
                  className={insertButtonClass}
                  onClick={onInsert}
                  disabled={requestFailed || isLoading}
                >
                  {addButtonIcon && <i className={addButtonIcon} />} {addButton}
                </button>
              )}
              {HeaderActions && <HeaderActions onHeaderAction={onHeaderAction} />}
              {options.multipleSelect && (
                <button
                  type="button"
                  className={deleteButtonClass}
                  onClick={onMultipleDelete}
                  disabled={selectedCount === 0}
                >
                  {deleteButtonIcon && <i className={deleteButtonIcon} />} {deleteButton} <span style={{paddingTop: '8px'}} className="badge badge-pill badge-light">{selectedCount}</span>
                </button>
              )}
            </span>
          </div>  
        </div>
      )}
    </React.Fragment>
  );
};

HeaderSection.propTypes = propTypes;
export default HeaderSection;
