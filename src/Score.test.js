import React from 'react';
import {shallow} from 'enzyme';
import Score from './Score';

describe('<Score />', () => {
   it('should render 4 digits score', () => {
       const wrapper = shallow(<Score score={99} />);
       expect(wrapper.text()).toBe('0099');
   });
});