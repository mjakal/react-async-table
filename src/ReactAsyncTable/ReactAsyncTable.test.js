import React from 'react';
import { shallow } from 'enzyme';
import ReactAsyncTable from 'index';

describe('ReactAsyncTable', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ReactAsyncTable />);
    expect(wrapper).toHaveLength(1);
  });
});
