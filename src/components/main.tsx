import React, { useState } from "react";
import RangeBar from "./range-bar/range-bar";
import Board from "./board/board";
import { calculateWinnerAdvanced } from "../calc/calculate";
import styled from "styled-components";

const Mybutton = styled.button`
  width: 120px;
  height: 30px;
  margin-bottom: 0.5rem;
  background-color: #d8977e;
  border-radius: 10px;
`;

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  currenPos: null,
  isAsc: true,
  xIsNext: true,
};

const sortMoves = (moves: any, ascending: any) => {
  return moves.sort((moveA: any, moveB: any) => {
    if (ascending) {
      return moveA.step > moveB.step ? 1 : -1;
    } else {
      return moveA.step < moveB.step ? 1 : -1;
    }
  });
};

const checkFullStep = (currentBoard: any) => {
  return !currentBoard.includes(null);
};

const Main = () => {
  const [game, setGame] = useState(initialState);

  const [showMessage, setShowMessage] = useState(true);

  const [size, setSize] = useState(5);

  const history = game.history;

  const current = history[game.stepNumber];

  const newGame = () => {
    setGame(initialState);
    setShowMessage(true);
  };

  const onChangeSizeHandler = (value: any) => {
    setSize(value);
    newGame();
  };

  const jumpTo = (step: any) => {
    setGame({
      ...game,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    setShowMessage(true);
  };

  const handleClick = (i: any) => {
    const squares = current.squares.slice();
    if (calculateWinnerAdvanced(squares, size) || squares[i]) {
      return;
    }

    squares[i] = game.xIsNext ? "X" : "O";

    setGame({
      ...game,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      currenPos: i,
      stepNumber: history.length,
      xIsNext: !game.xIsNext,
    });
  };

  const isEnd = checkFullStep(current.squares);

  const winner: any = calculateWinnerAdvanced(current.squares, size);
  let status;
  let message;
  if (winner) {
    status = "Winner is " + winner.winner;
  } else {
    status = "Next player: " + (game.xIsNext ? "X" : "O");
  }

  if (isEnd && !winner) {
    status = "Oh It's a draw";
  }

  let listMoves: any[] = [];

  history.forEach((step, move, history) => {
    const current = history[move].squares;
    const pre = history[move > 0 ? move - 1 : 0].squares;

    for (let index = 0; index < current.length; index++) {
      if (current[index] !== null && current[index] !== pre[index]) {
        listMoves.push({
          step: move,
          player: current[index],
          position: index,
        });
      }
    }
  });
  const sortedMoves = sortMoves(listMoves, game.isAsc);
  const moves_tmp = sortedMoves.map((move: any, step: any) => {
    const desc =
      step !== null
        ? `${move.player} go to ( ${move.position % size}, ${Math.round(
            move.position / size
          )})`
        : "Go to game start";
    return (
      <li key={step}>
        <Mybutton onClick={() => jumpTo(step)}>{desc}</Mybutton>
      </li>
    );
  });

  return (
    <div className="total">
      <h1 className="title-game">Caro Game</h1>

      <RangeBar onChange={onChangeSizeHandler} />
      <div className="game">
        <div className="game-board">
          <Board
            size={size}
            squares={current.squares}
            selectedSquare={game.currenPos}
            onClick={(i: any) => handleClick(i)}
            winPath={winner ? winner.path : null}
          />
        </div>
        <div className="game-info">
          <h1>{status}</h1>
          <Mybutton onClick={newGame}> Bắt đầu lại</Mybutton>
          <ol>{moves_tmp}</ol>
        </div>
        {showMessage && message}
      </div>
    </div>
  );
};
export default Main;
