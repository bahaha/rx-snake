import React from 'react';
import classNames from 'classnames';
import {range} from 'lodash/util';
import factory, {pointProto} from './Point';

import './Board.css';

const Board = (props) => {
    const eggPoint = factory({position: props.egg});
    const getRows = width => makeCells => range(width).map(y => <div key={y} className="row">{makeCells(y)}</div>)
    const getCells = height => y => range(height).map(x => {
        const cellClass = classNames({
            cell: true,
            egg: eggPoint.at({x, y})
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


export default Board;