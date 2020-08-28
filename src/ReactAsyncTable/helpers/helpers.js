export const isEmpty = object => !(object && Object.keys(object).length);

export const debounce = (debounceCallback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => debounceCallback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export const setCurrentPage = (currentPage, perPage, totalItems) => {
  if (currentPage > 1) {
    const totalPages = Math.ceil(totalItems / perPage);

    if (currentPage <= totalPages) return currentPage;

    return currentPage - 1;
  }

  return 1;
};

export const setSortableFields = columns => {
  const sortableFields = {};

  columns.forEach(col => {
    const { dataField, sort, sortOrder } = col;

    if (sort && sortOrder) sortableFields[dataField] = sortOrder;
  });

  return sortableFields;
};
