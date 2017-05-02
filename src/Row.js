import React from 'react';
import {pointProto} from './Point';
import Cell from './Cell';
import {range} from 'lodash/util';
import shouldUpdate from 'recompose/shouldUpdate';
import {isEqual} from 'lodash/lang';


const Row = (props) => {
	const makeCells = (y, columns) => range(columns).map(x => {
		const cell = {x, y};
		return (
        	<Cell key={x} isEgg={props.egg.at(cell)} isSnake={props.snake.inPosition(cell)} ></Cell>
        );
    });

    return (
    	<div className="row">{makeCells(props.row, props.columns)}</div>
    );
};

Row.propTypes = {
	row: React.PropTypes.number.isRequired,
	columns: React.PropTypes.number.isRequired,
	snake: React.PropTypes.object.isRequired,
	egg: (props, propName, componentName) => {
        if(!pointProto.isPrototypeOf(props[propName])){
            throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Use factory from Point to make a egg`);
        }
    }
}

const getPositionInTheRow =
	(positions = [], row) => positions.filter(point => point.y === row)
		.map(point => point.x);

export const shouldRowComponentUpdate = (props, nextProps) => {
	return !props.egg.equal(nextProps.egg) ||
		!isEqual(
			getPositionInTheRow(props.snake.positions, props.row),
			getPositionInTheRow(nextProps.snake.positions, nextProps.row)
		)
};

export {Row};

export default shouldUpdate(shouldRowComponentUpdate)(Row);
