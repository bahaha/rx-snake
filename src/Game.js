import React, { Component } from "react";
import Score from './Score';
import Board from './Board';
import factory, {random} from './Point';

import './Game.css';

const DIRECTION = {
    TOP:    factory({x: 0, y: -1}),
    RIGHT:  factory({x: 1, y: 0}),
    DOWN:   factory({x: 0, y: 1}),
    LEFT:   factory({x: -1, y: 0})
};
export default class Game extends Component {
    static defaultProps = {
        width: 30,
        height: 30,
        snake: factory(),
        direction: DIRECTION.DOWN
    }

    constructor(props) {
        super(props);
        const size = {
            width: props.width,
            height: props.height,
        };
        this.state = {
            score: 0,
            size,
            egg: random(size)
        };
    }
    render() {
        return (
            <div className="gameBoard">
                <header>
                    <Score score={this.state.score} />
                </header>
                <section>
                    <Board size={this.state.size} egg={this.state.egg} />
                </section>
            </div>
        );
    }
}