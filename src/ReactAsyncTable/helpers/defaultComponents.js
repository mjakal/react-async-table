import React from 'react';

export const NoData = props => (
  <tbody>
    <tr>
      <td
        className="text-center font-weight-normal"
        colSpan={props.totalColumns}
      >
        No data found
      </td>
    </tr>
  </tbody>
);

export const ExpandableRowComponent = props => (
  <p>Please add your custom ExpandableRowComponent to component props</p>
);
