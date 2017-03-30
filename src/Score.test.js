import React from 'react';
import {mount} from 'enzyme';
import Score from './Score';

describe('<Score />', () => {
   it('should render 3 digits score', () => {
       const wrapper = mount(<Score score={99} />);
       expect(wrapper.text()).toBe('099');
   });
});