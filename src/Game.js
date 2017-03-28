import React, { Component } from "react";
import Score from './Score';
import Board from './Board';
import {random} from './Point';
import Snake, {DIRECTION} from './Snake';
import './Game.css';
import {Observable} from "rxjs";

export default class Game extends Component {
    move$;
    static defaultProps = {
        width: 30,
        height: 30,
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
            egg: random(size),
            snake: Snake()
        };
    }

    setUpStreams() {
        const keyCodes$ = Observable.fromEvent(document.body, 'keydown')
            .map(e => e.keyCode);
        const gameStart = keyCodes$.filter(code => code === 32);
        const left$ = keyCodes$.filter(code => code === 37)
            .map(event => DIRECTION.LEFT);
        const up$ = keyCodes$.filter(code => code === 38)
            .map(event => DIRECTION.UP);
        const right$ = keyCodes$.filter(code => code === 39)
            .map(event => DIRECTION.RIGHT);
        const down$ = keyCodes$.filter(code => code === 40)
            .map(event => DIRECTION.DOWN);
        const changeDirection$ = Observable.merge(left$, up$, right$, down$)
            .filter(direction => this.state.snake.shouldDirectionChange(direction));
        this.move$ = changeDirection$.subscribe(direction => {
            const nextMove = this.state.snake.move(direction);
            this.setState((prevState, props) => ({...prevState, snake: nextMove}));
        });
    }

    componentDidMount() {
        this.setUpStreams();
    }
    componentWillUnmount() {
        this.move$.unsubscribe();
    }

    render() {
        return (
            <div className="gameBoard">
                <header>
                    <Score score={this.state.score} />
                </header>
                <section>
                    <Board size={this.state.size} egg={this.state.egg} snake={this.state.snake} />
                </section>
            </div>
        );
    }
}