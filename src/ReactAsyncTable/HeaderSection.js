import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import SearchBox from './components/SearchBox/SearchBox';

const propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestFailed: PropTypes.bool.isRequired,
  splitView: PropTypes.bool.isRequired,
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
    splitView,
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
  const { addButtonIcon, deleteButtonIcon, listViewIcon, gridViewIcon } = icons;

  const HeaderActions = headerActions;

  return (
    <React.Fragment>
      {displayHeaderSection && (
        <div className={`row form-group ${splitView && styles.header_section}`}>
          <div className="col-xl-4 col-lg-6 col-md-6">
            {options.searchBox && (
              <SearchBox
                placeholder={searchPlaceholder}
                activeTabID={activeTabID}
                onChange={debounceSearch}
              />
            )}
          </div>
          <div className="col-xl-8 col-lg-6 col-md-6">
            <span className={`float-right ${styles.header_actions}`}>
              {layoutType === 'FLEX_VIEW' && (
                <React.Fragment>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-html="true"
                    data-toggle="tooltip"
                    title={listViewTitle}
                    onClick={() => toggleGridView(false)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className={listViewIcon} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-html="true"
                    data-toggle="tooltip"
                    title={gridViewTitle}
                    onClick={() => toggleGridView(true)}
                    disabled={requestFailed || isLoading}
                  >
                    <i className={gridViewIcon} />
                  </button>
                </React.Fragment>
              )}
              {options.insertButton && (
                <button
                  type="button"
                  className={insertButtonClass}
                  data-html="true"
                  data-toggle="tooltip"
                  title={addButton}
                  onClick={onInsert}
                  disabled={requestFailed || isLoading}
                >
                  <i className={addButtonIcon} />
                </button>
              )}
              {HeaderActions && (
                <HeaderActions onHeaderAction={onHeaderAction} />
              )}
              {options.multipleSelect && (
                <button
                  type="button"
                  className={deleteButtonClass}
                  data-html="true"
                  data-toggle="tooltip"
                  title={`${deleteButton} (${selectedCount})`}
                  onClick={onMultipleDelete}
                  disabled={selectedCount === 0}
                >
                  <i className={deleteButtonIcon} />
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
