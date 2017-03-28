import factory from './Point';
import {random} from './Point';

describe('Point', () => {
    const getPosition = point => point.position;
    const expectPointProps = ({
        point,
        option = {},
        transform = v => v,
        getter,
    }) => {
        if(!getter) {
            return (getter = v => v) => {
                return expectPoint(getter);
            }
        }
        return expectPoint(getter);

        function expectPoint(getter) {
            const instance = point ? point : factory(option);
            return expect(getter(transform(instance)));
        }
    };

    it('should at (0, 0) by default', () => {
        const expected = {x: 0, y: 0};
        expectPointProps({getter: getPosition}).toEqual(expected);
    });
    it('should at the position just given', () => {
        const expected = {x: 100, y: 10};
        expectPointProps({
            option: {
                position: {x: 100, y: 10}
            },
            getter: getPosition
        }).toEqual(expected);
    });
    it('moveTo method should NOT mutate position values', () => {
        const expected = {x: 100, y: 10};
        const point = factory();
        const otherPoint = factory();
        const expectPoint = expectPointProps({
            point,
            transform: v => v.moveTo(expected),
        });
        // point move to the position, and is the same reference
        expectPoint(getPosition).toEqual(expected);
        expectPoint().toBe(point);
        // make sure moveTo methods don't mutate other point
        expect(getPosition(otherPoint)).toEqual({x: 0, y: 0});
    });
    it('should return true if the position values are the same', () => {
       const point = factory({position: {x: 100, y: 100}});
       const otherPoint = factory({position: {x: 100, y: 100}});
       expect(point.equal(otherPoint)).toBeTruthy();
    });
    it('should return false if the two point position are NOT the same', () => {
        const point = factory();
        const otherPoint = factory({position: {x: 100, y: 100}});
        expect(point.equal(otherPoint)).toBeFalsy();
    });
    it('should return true if point is at the position', () => {
        const point = factory({position: {x: 100, y: 100}});
        expect(point.at({x: 100, y: 100})).toBeTruthy();
    });
    it('should return true if point is NOT at the position', () => {
        const point = factory();
        expect(point.at({x: 100, y: 100})).toBeFalsy();
    });
    it('can be added to another point', () => {
        const expected = {x: 300, y: 60};
        const point = factory({position: {x: 100, y: 10}});
        const otherPoint = factory({position: {x: 200, y: 50}});
        expectPointProps({
            point,
            transform: v => v.add(otherPoint),
            getter: getPosition
        }).toEqual(expected);
    });
    it('can be modded if the coordinate are out of bounds', () => {
        const expected = {x: 1, y: 299};
        const point = factory({position: {x: 501, y: 299}});
        expectPointProps({
            point,
            transform: v => v.mod({x: 500, y: 300}),
            getter: getPosition
        }).toEqual(expected);
    });
    it('should return point when random function is called', () => {
        const point = random({width: 300, height: 300});
        expect(point).toHaveProperty('position');
        expect(point.position).toHaveProperty('x');
        expect(point.position).toHaveProperty('y');
        expect(point.add).toBeTruthy();
        expect(point.mod).toBeTruthy();
        expect(point.moveTo).toBeTruthy();
    })
});