import React, { Component } from "react";
import Score from './Score';
import Board from './Board';
import {random} from './Point';
import Snake, {DIRECTION} from './Snake';
import BezierEasing from './util/bezier-easing';
import './Game.css';
import {Observable, BehaviorSubject, Scheduler} from "rxjs";

export default class Game extends Component {
    static defaultProps = {
        width: 30,
        height: 30,
    }

    initGameBoard = (size) =>  ({
        isOver: false,
        score: 0,
        size,
        egg: random(size),
        snake: Snake()
    });

    constructor(props) {
        super(props);
        const size = {
            width: props.width,
            height: props.height,
        };
        this.state = this.initGameBoard(size);
    }

    setUpChangeDirectionStream() {
        const keyCodes$ = Observable.fromEvent(document.body, 'keydown')
            .map(e => e.keyCode);
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
        return changeDirection$;
    }

    setUpStreams() {
        const easing = BezierEasing(0, 1.35, .81, .9);
        const headPosition$ = new BehaviorSubject(this.state.snake.head);
        const gameOver$ = headPosition$.filter(head => this.state.snake.isDead(head))

        const changeDirection$ = this.setUpChangeDirectionStream();
        const speed$ = new BehaviorSubject(200);
        const tick$ = speed$.switchMap(t => Observable.interval(t))
            .map(() => this.state.snake.direction);

        const move$ = tick$.merge(changeDirection$)
            .takeUntil(gameOver$);

        move$
            .subscribeOn(Scheduler.animationFrame)
            .subscribe(direction => {
                const nextMove = this.state.snake.move(direction, this.state.size);
                this.setState((prevState, props) => ({...prevState, snake: nextMove}));
                headPosition$.next(this.state.snake.head);
            });

        const ate$ = headPosition$.filter(position => position.equal(this.state.egg))
            .takeUntil(gameOver$);
        ate$.subscribe(position => {
           this.setState((prevState, props) => ({
               ...prevState,
               egg: random(this.state.size),
               score: this.state.score + 1,
               snake: this.state.snake.grow()
           }));
           speed$.next(200 * (1 - easing(this.state.score / 150)) + 15);
        });

        //restart after over by hitting space (32)
        const restart$ = gameOver$.switchMap(() =>
            Observable.fromEvent(document.body, 'keydown')
                .map(e => e.keyCode)
                .filter(code => code === 32)
        ).take(1);

        restart$.subscribe(restart => {
            this.setState((prevState, props) => ({...prevState, isOver: false, score: 0}));
            this.setUpStreams()
        });

        //reset game board <== side effect
        gameOver$.subscribe(() => this.setState((prevState, props) => ({
            ...prevState,
            ...this.initGameBoard(prevState.size),
            score: prevState.score,
            isOver: true
        })));
    }

    componentDidMount() {
        this.setUpStreams();
    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div className="gameBoard">
                <header>
                    <Score score={this.state.score} />
                </header>
                <section>
                    <Board size={this.state.size}
                           score={this.state.score}
                           egg={this.state.egg}
                           snake={this.state.snake}
                           isOver={this.state.isOver} />
                </section>
            </div>
        );
    }
}