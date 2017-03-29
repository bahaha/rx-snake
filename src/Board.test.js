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
    it('should throw error if not provide any egg position', () => {
        const validatingBoardEggProto = () => {
            Board.propTypes.egg({size}, 'egg', 'Board');
        };
        expect(validatingBoardEggProto).toThrow()
    });
    it('should render snake by the snake position', () => {
        const snake = Snake({
            positions: [Point({x: 1, y: 2}), Point({x: 0, y: 2}), Point({x: 0, y: 1})],
            length: 3,
        });
        const wrapper = shallow(<Board size={size} egg={eggPoint} snake={snake}/>);
        expect(wrapper.find('.cell.snake').length).toBe(3);
    });
    it('should render mask and score when game is over', () => {
        const wrapper = shallow(<Board size={size} egg={eggPoint} score={99} isOver={true}/>);
        expect(wrapper.find('.score span').text()).toBe('99');
        expect(wrapper.find('.mask.active').length).toBe(1);
    });
    it('should NOT show the mask if game is NOT over', () => {
        const wrapper = shallow(<Board size={size} egg={eggPoint} score={99} isOver={false}/>);
        expect(wrapper.find('.mask.active').length).toBe(0);
    });
});