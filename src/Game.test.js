import React from 'react';
import Game from './Game';
import Score from './Score';
import Board from './Board';
import {shallow} from 'enzyme';

describe('<Game />', () => {
    it('should render score, starts with 0', () => {
        const wrapper = shallow(<Game />);
        expect(wrapper.find(Score).length).toBe(1);
    });
    it('should render game board', () => {
        const wrapper = shallow(<Game />);
        expect(wrapper.find(Board).length).toBe(1);
    });
});