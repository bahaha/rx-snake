import Point from './Point';
import {head, slice, findIndex, dropWhile} from 'lodash/array';
import {find} from 'lodash/collection';

export const DIRECTION = {
    UP:     Point({x: 0, y: -1}),
    RIGHT:  Point({x: 1, y: 0}),
    DOWN:   Point({x: 0, y: 1}),
    LEFT:   Point({x: -1, y: 0})
};
const snakeProto = {
    direction: DIRECTION.DOWN,
    length: 3,
    move: function (direction = this.direction, boundary) {
        const {length, head} = this;
        const newHead = boundary ? head.add(direction).mod(boundary) : head.add(direction);
        return factory({
            head: newHead,
            positions: [newHead,...slice(this.positions, 0, this.length -1)],
            length,
            direction
        });
    },
    inPosition: function({x, y}) {
        return find(this.positions, position => position.at({x, y}));
    },
    shouldDirectionChange: function({x, y}) {
        const forbidden = dropWhile(this.direction.reverse(), d => d.equal(this.direction));
        return findIndex(forbidden, {x, y}) === -1;
    },
    grow: function(size= 1) {
        this.length = this.length + size;
        return this;
    },
    isDead: function({x, y}) {
        return find(this.positions.slice(1), position => position.at({x, y}));
    }
}

export default function factory(option = {}) {
    const {
        positions,
        length = 3,
        direction = DIRECTION.DOWN,
        startPoint = {x: 0, y: 0}
    } = option;
    const instance = Object.create(snakeProto);
    if(positions && positions.length) {
        instance.positions = positions;
        instance.head = head(instance.positions);
    } else {
        instance.head = Point(startPoint);
        instance.positions = [instance.head];
    }
    instance.length = length;
    instance.direction = direction;
    return instance;
}