import React from 'react';
import {padStart} from 'lodash/string';

const Score = (props) => {
    return (
        <div className="score">{padStart(props.score, 3, '0')}</div>
    )
}
Score.propTypes = {
    score: React.PropTypes.number.isRequired
};

export default Score;