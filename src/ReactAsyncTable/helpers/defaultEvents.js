export const onInsert = () => {
  console.log('Add onInsert() method to component props');
};

export const onEdit = rowID => {
  console.log('Add onEdit(rowID) method to component props');
  console.log('Edit row', rowID);
};

export const onDelete = (rowID, goToPage) => {
  console.log('Add onDelete(rowID, goToPage) method to component props');
  console.log('Delete row', rowID);
  console.log('Go to page after delete action', goToPage);
};

export const onMultipleDelete = (values, goToPage) => {
  console.log(
    'Add onMultipleDelete(values, goToPage) method to component props'
  );
  console.log('Selected values', values);
  console.log('Go to page after delete action', goToPage);
};

export const onColumnClick = () => {
  console.log('Add onColumnClick() method to component props');
};
