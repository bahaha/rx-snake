import {assign, mergeWith} from 'lodash/object';
import {unionWith} from 'lodash/array';
export const pointProto = {
    x: 0,
    y: 0,
    moveTo: function moveTo({x = this.x, y = this.y}) {
        return factory({x, y});
    },
    add: function add({x, y}) {
        const nextPosition = mergeWith(
            {x: this.x, y: this.y},
            {x,y},
            (nowPosition, transform = 0) => nowPosition + transform);
        return factory(nextPosition);
    },
    mod: function mod({width, height}) {
        const x = this.x < 0 ? width + this.x : this.x;
        const y = this.y < 0 ? height + this.y : this.y;
        const nextPosition = mergeWith(
            {x, y},
            {x: width, y: height},
            (nowPosition, max = 1) => nowPosition % max
        );
        return factory(nextPosition);
    },
    equal: function equal(other) {
        return this.x === other.x && this.y === other.y;
    },
    at: function at({x, y}) {
        return this.equal({x,y});
    },
    reverse: function() {
        return unionWith(
            [{x: this.x, y: -this.y}, {x: -this.x, y: this.y}].map(point => factory(point)),
            (p, op) => this.equal(p) || p.equal(op)
        );
    }
};

export default function factory(option) {
    const instance = Object.create(pointProto);
    assign(instance, option);
    return instance;
}

export function random({width, height}) {
    return factory({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    });
}