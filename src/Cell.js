import React from 'react';
import pure from 'recompose/pure';
import classNames from 'classnames';

const Cell = (props) => {
    const cellClass = classNames({
        cell: true,
        egg: props.isEgg,
        snake: props.isSnake,
    });
    return (
        <div className={cellClass}></div>
    );
};

Cell.propTypes = {
    isSnake: React.PropTypes.bool.isRequired,
    isEgg: React.PropTypes.bool.isRequired,
}

export default pure(Cell);