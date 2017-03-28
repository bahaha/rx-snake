import factory, {DIRECTION} from './Snake';
import Point from './Point';
import {forEach} from 'lodash/collection';
import {get} from 'lodash/object';

describe('Snake', () => {
    const expectPositionsEqual = (actual, expected) =>  {
        forEach(actual, (point, index) => {
            expect(point.equal(get(expected, ''+index))).toBeTruthy();
        });
    };
    it('should make a snake initially, at (0, 0) position and towards DOWN with length 3', () => {
        const initialSnake = factory();
        it('position is (0, 0)', () => {
            expect(initialSnake.head.equal({x: 0, y: 0})).toBeTruthy();
        });
        it('length is 3', () => {
            expect(initialSnake.length).toBe(3);
        });
        it('towards DWON', () => {
            expect(initialSnake.direction.equal(DIRECTION.DOWN)).toBeTruthy();
        });
    });
    it('should update head and positions when moving', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const expectedPositions = [Point({x: 0, y: 3}), Point({x: 0, y: 2}), Point({x: 0, y: 1})];
        const snake = factory({
            positions: initialPositions,
        });
        const nextSnake = snake.move();
        expectPositionsEqual(nextSnake.positions, expectedPositions);
        expect(nextSnake.head.equal({x: 0, y: 3})).toBeTruthy();
    });
    it('should turn direction while direction update', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const expectedPositions = [Point({x: 1, y: 2}), Point({x: 0, y: 2}), Point({x: 0, y: 1})];
        const snake = factory({
            positions: initialPositions,
        });
        snake.direction = DIRECTION.RIGHT;
        const nextSnake = snake.move();
        expectPositionsEqual(nextSnake.positions, expectedPositions);
        expect(nextSnake.head.equal({x: 1, y: 2})).toBeTruthy();
    });
    it('should keep its positions\' length smaller than length', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        let snake = factory({
            positions: initialPositions,
        });
        snake.direction = DIRECTION.RIGHT;
        snake = snake.move();
        snake = snake.move();
        snake = snake.move();
        expect(snake.positions.length).toBe(snake.length);
    });
    it('should return true if the point is inside the snake\'s body', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const snake = factory({positions: initialPositions});
        expect(snake.inPosition({x: 0, y: 0})).toBeTruthy();
    });
    it('should return false if the point is NOT inside the snake\'s body', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const snake = factory({positions: initialPositions});
        expect(snake.inPosition({x: 0, y: 5})).toBeFalsy();
    });
    it('should return false if the direction is the same or the opposite', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const snake = factory({positions: initialPositions});
        expect(snake.shouldDirectionChange(DIRECTION.UP)).toBeFalsy();
    });
    it('should return true if the direction is NOT the same nor the opposite', () => {
        const initialPositions = [Point({x: 0, y: 2}), Point({x: 0, y: 1}), Point({x: 0, y: 0})];
        const snake = factory({positions: initialPositions});
        expect(snake.shouldDirectionChange(DIRECTION.DOWN)).toBeTruthy();
        expect(snake.shouldDirectionChange(DIRECTION.LEFT)).toBeTruthy();
        expect(snake.shouldDirectionChange(DIRECTION.RIGHT)).toBeTruthy();
    });

});