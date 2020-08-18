import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './components/SearchBox/SearchBox';

const propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  splitHeaderSection: PropTypes.bool.isRequired,
  displayHeaderSection: PropTypes.bool.isRequired,
  displayGridView: PropTypes.bool.isRequired,
  insertButtonClass: PropTypes.string.isRequired,
  deleteButtonClass: PropTypes.string.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.string).isRequired,
  activeTabID: PropTypes.string.isRequired,
  headerActions: PropTypes.func.isRequired,
  debounceSearch: PropTypes.func.isRequired,
  toggleGridView: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
  onHeaderAction: PropTypes.func.isRequired,
  onMultipleDelete: PropTypes.func.isRequired
};

const HeaderSection = props => {
  const {
    selectedCount,
    isLoading,
    activeTabID,
    requestFailed,
    displayHeaderSection,
    displayGridView,
    splitHeaderSection,
    insertButtonClass,
    deleteButtonClass,
    options,
    translations,
    icons,
    headerActions,
    debounceSearch,
    toggleGridView,
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
                activeTabID={activeTabID}
                onChange={debounceSearch}
              />
            )}
          </div>
          <div className="col-12 order-1 col-md-6 order-md-2 col-lg-8 col-xl-9 mb-1">
            <span className="async-table-header-actions float-right">
              {displayGridView && (
                <React.Fragment>
                  <button 
                    type="button" 
                    className="btn btn-light"
                    onClick={() => toggleGridView(false)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className="fa fa-list" />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-light"
                    onClick={() => toggleGridView(true)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className="fa fa-th" />
                  </button>
                </React.Fragment>
              )}
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
