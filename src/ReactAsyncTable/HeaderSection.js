import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './components/SearchBox/SearchBox';

const propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  splitHeaderSection: PropTypes.bool.isRequired,
  displayHeaderSection: PropTypes.bool.isRequired,
  layoutType: PropTypes.string.isRequired,
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
    layoutType,
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
    deleteButton,
    listViewTitle,
    gridViewTitle
  } = translations;
  const {
    addButtonIcon,
    deleteButtonIcon,
    listViewIcon,
    gridViewIcon
  } = icons;

  const HeaderActions = headerActions;

  return (
    <React.Fragment>
      {displayHeaderSection && (
        <div className={`row form-group ${splitHeaderSection && 'async-table-header-section'}`}>
          <div className="col-md-6">
            {options.searchBox && (
              <SearchBox
                placeholder={searchPlaceholder}
                activeTabID={activeTabID}
                onChange={debounceSearch}
              />
            )}
          </div>
          <div className="col-md-6">
            <span className="float-right async-table-header-actions">
              {layoutType === 'FLEX_VIEW' && (
                <React.Fragment>
                  <button 
                    type="button" 
                    className="btn btn-light"
                    data-html="true"
                    data-toggle="tooltip"
                    title={listViewTitle ? listViewTitle : 'List View'}
                    onClick={() => toggleGridView(false)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className={listViewIcon ? listViewIcon : 'fa fa-list'} />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-light"
                    data-html="true"
                    data-toggle="tooltip"
                    title={gridViewTitle ? gridViewTitle : 'Grid View'}
                    onClick={() => toggleGridView(true)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className={gridViewIcon ? gridViewIcon : 'fa fa-th'} />
                  </button>
                </React.Fragment>
              )}
              {options.insertButton && (
                <button 
                  type="button" 
                  className={insertButtonClass}
                  data-html="true"
                  data-toggle="tooltip"
                  title={addButton ? addButton : 'Add'}
                  onClick={onInsert}
                  disabled={requestFailed || isLoading}
                >
                  <i className={addButtonIcon ? addButtonIcon : 'fa fa-plus'} />
                </button>
              )}
              {HeaderActions && <HeaderActions onHeaderAction={onHeaderAction} />}
              {options.multipleSelect && (
                <button
                  type="button"
                  className={deleteButtonClass}
                  data-html="true"
                  data-toggle="tooltip"
                  title={`${deleteButton ? deleteButton : 'Delete'} (${selectedCount})`}
                  onClick={onMultipleDelete}
                  disabled={selectedCount === 0}
                >
                  {deleteButtonIcon && <i className={deleteButtonIcon} />}
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
