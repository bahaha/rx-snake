import React from 'react';
import classNames from 'classnames';
import {range} from 'lodash/util';
import {pointProto} from './Point';
import Snake from './Snake';

import './Board.css';

const Board = (props) => {
    const getRows = width => makeCells => range(width).map(y => <div key={y} className="row">{makeCells(y)}</div>)
    const getCells = height => y => range(height).map(x => {
        const cellClass = classNames({
            cell: true,
            egg: props.egg.at({x, y}),
            snake: props.snake.inPosition({x, y})
        });
        return <div key={x} className={cellClass}></div>
    });
    const makeCellsPerRow = getCells(props.size.height);
    return (
        <div className="board">
            {getRows(props.size.width)(makeCellsPerRow)}
        </div>
    );
}

Board.propTypes = {
    size: React.PropTypes.shape({
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
    }),
    egg: (props, propName, componentName) => {
        if(!pointProto.isPrototypeOf(props[propName])){
            throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Use factory from Point to make a egg`);
        }
    },
}
Board.defaultProps = {
    snake: Snake()
}


export default Board;