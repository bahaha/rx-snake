import {get, assign, mergeWith, hasIn} from 'lodash/object';
const defaultPosition = {x: 0, y: 0};
export const pointProto = {
    position: defaultPosition,
    moveTo: function moveTo({x, y}) {
        this.position = {x, y};
        return this;
    },
    add: function add(point = defaultPosition) {
        const nextPosition = mergeWith(
            this.position,
            get(point, 'position'),
            (nowPosition, transform = 0) => nowPosition + transform);
        return this.moveTo(nextPosition);
    },
    mod: function mod(boundary) {
        const nextPosition = mergeWith(
            this.position,
            boundary,
            (nowPosition, max = 1) => nowPosition % max
        );
        return this.moveTo(nextPosition);
    },
    equal: function equal(other) {
        return this.position.x === other.position.x &&
                this.position.y === other.position.y;
    },
    at: function at({x, y}) {
        return this.position.x === x && this.position.y === y;
    }
};

export default function factory(option) {
    const instance = Object.create(pointProto);
    if(option && hasIn(option, 'x') && hasIn(option, 'y')){
        option.position = {
            x: option.x,
            y: option.y
        };
    }
    assign(instance, option);
    return instance;
}

export function random({width, height}) {
    return factory({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    });
}