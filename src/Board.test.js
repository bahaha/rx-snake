import React from 'react';
import {shallow} from 'enzyme';
import {random} from './Point';
import Board from './Board';

describe('<Board />', () => {
    const size = {width: 10, height: 10};
    const eggPoint = random(size);
    it('should render cells by size', () => {
       const wrapper = shallow(<Board size={size} egg={eggPoint}/>);
       expect(wrapper.find('.cell').length).toBe(10*10);
    });
    it('should render egg by the position', () => {
        const wrapper = shallow(<Board size={size} egg={eggPoint}/>);
        expect(wrapper.find('.cell.egg').length).toBe(1);
    });
});