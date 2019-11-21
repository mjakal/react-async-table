export const isEmpty = object => {
  return (object && Object.keys(object).length);
}

export const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
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
