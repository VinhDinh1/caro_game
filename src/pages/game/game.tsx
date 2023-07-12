import React, { useState } from "react";
import Board from "../../components/game/board/board";
import { calculateWinnerAdvanced } from "../../calc/calculate";
import { ButtonBase } from "../../components/buttonBase/ButtonBase";
import RangeBar from "../../components/range-bar/range-bar";
import Mess from "../../components/game/mess/mess";
import { useTranslation } from "react-i18next";


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


const checkFullStep = (currentBoard: any) => {
  return !currentBoard.includes(null);
};

const Game = () => {
  const [game, setGame] = useState(initialState);

  const [showMessage, setShowMessage] = useState(true);

  const [size, setSize] = useState(5);

  const history = game.history;

  const current = history[game.stepNumber];

  const { t } = useTranslation();

  const newGame = () => {
    setGame(initialState);
    setShowMessage(true);
  };

  const onChangeSizeHandler = (value: any) => {
    setSize(value);
    newGame();
  };

  const closeMessgaeHandler = () => {
    setShowMessage(false);
  }

  // const jumpTo = (step: any) => {
  //   setGame({
  //     ...game,
  //     stepNumber: step,
  //     xIsNext: step % 2 === 0,
  //   });
  //   setShowMessage(true);
  // };

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
    status = winner.winner + t("gamePlay.winner");

    message = <Mess message={status} win={true} newGame={newGame} onClose={closeMessgaeHandler} openModal={true} />
  } else {
    status = t("gamePlay.nextPlayer") + (game.xIsNext ? "X" : "O");
  }

  if (isEnd && !winner) {
    status = t("gamePlay.draw");

    message = <Mess message={status} win={false} newGame={newGame} onClose={closeMessgaeHandler} openModal={true} />
  }

  // let listMoves: any[] = [];

  // history.forEach((step, move, history) => {
  //   const current = history[move].squares;
  //   const pre = history[move > 0 ? move - 1 : 0].squares;

  //   for (let index = 0; index < current.length; index++) {
  //     if (current[index] !== null && current[index] !== pre[index]) {
  //       listMoves.push({
  //         step: move,
  //         player: current[index],
  //         position: index,
  //       });
  //     }
  //   }
  // });
  // const sortedMoves = sortMoves(listMoves, game.isAsc);
  // const moves_tmp = sortedMoves.map((move: any, step: any) => {
  //   const desc =
  //     step !== null
  //       ? `${move.player} go to ( ${move.position % size}, ${Math.round(
  //           move.position / size
  //         )})`
  //       : "Go to game start";
  //   return (
  //     <li key={step}>
  //       <ButtonBase onClick={() => jumpTo(step)}>{desc}</ButtonBase>
  //     </li>
  //   );
  // });
  // console.log(moves_tmp)

  return (
    <div className="total">
      <h1 className="title-game">{t("gamePlay.title")} </h1>

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
          <ButtonBase onClick={newGame}>{t("gamePlay.restart")} </ButtonBase>
          {/* <ol>{moves_tmp}</ol> */}
        </div>
        {showMessage && message}
      </div>
    </div>
  );
};
export default Game;
