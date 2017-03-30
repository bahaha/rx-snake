import React from 'react';
import {Row, shouldRowComponentUpdate} from './Row';
import Point from './Point';
import Snake from './Snake';

describe('<Row />', () => {
	const size = {width: 10, height: 10};
	const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
	const egg = Point({x: 5, y: 5});

	it('should throw error if not provide any egg position', () => {
	    const validatingBoardEggProto = () => {
	        Row.propTypes.egg({row: 1}, 'egg', 'Row');
	    };
	    expect(validatingBoardEggProto).toThrow()
	});

	it('should NOT update if snake positions in the row has NOT changed', () => {
		const row = 4;
        let snake = Snake({
            positions: initialPositions,
        });
        let nextSnake = snake.move();
		expect(shouldRowComponentUpdate({row, egg, snake}, {row, egg, snake: nextSnake})).toBeFalsy();
	});
	it('should update if snake positions in the row has CHANGED', () => {
		const row = 0;
		let snake = Snake({
            positions: initialPositions,
        });
        let nextSnake = snake.move();
        expect(shouldRowComponentUpdate({row, egg, snake}, {row, egg, snake: nextSnake})).toBeTruthy();
	});
	it('should NOT update if egg in the row has NOT changed', () => {
		const row = 3;
		let snake = Snake({
            positions: initialPositions,
        });
        expect(shouldRowComponentUpdate({row, egg, snake}, {row, snake, egg: {x: 1, y: 1}})).toBeFalsy();
	});
	it('should update if egg in the row has CHANGED', () => {
		const row = 5;
		let snake = Snake({
            positions: initialPositions,
        });
        
        expect(shouldRowComponentUpdate({row, egg, snake}, {row, snake, egg: {x: 1, y: 1}})).toBeTruthy();
	});

});