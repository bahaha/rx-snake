import React from 'react';
import {shallow} from 'enzyme';
import Point, {random} from './Point';
import Snake from './Snake';
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
    it('should render snake by the snake position', () => {
        const snake = Snake({
            positions: [Point({x: 1, y: 2}), Point({x: 0, y: 2}), Point({x: 0, y: 1})],
            length: 3,
        });
        const wrapper = shallow(<Board size={size} egg={eggPoint} snake={snake}/>);
        expect(wrapper.find('.cell.snake').length).toBe(3);
    })
});