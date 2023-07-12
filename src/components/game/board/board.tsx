import React from "react";
import Square from "../square/square";

const renderSquare = (
  i: any,
  squares: any,
  onClick: any,
  winPath: any,
  selectedSquare: any
) => {
  let isWin = false;
  let selected = selectedSquare === i ? true : false;
  if (winPath) {
    const check = winPath.find((item: any) => item === i);
    if (check || check === 0) {
      isWin = true;
    }
  }

  return (
    <Square
      key={i}
      isWin={isWin}
      selectedSquare={selected}
      value={squares[i]}
      onClick={onClick.bind(null, i)}
    />
  );
};

const Board = ({
  size,
  squares,
  onClick,
  winPath,
  selectedSquare,
}: {
  size: any;
  squares: any;
  onClick: any;
  winPath: any;
  selectedSquare: any;
}) => {
  const gameBoard = [];

  for (let i = 0; i < size; i++) {
    let list = [];

    for (let k = 0; k < size; k++) {
      list.push(
        renderSquare(size * i + k, squares, onClick, winPath, selectedSquare)
      );
    }
    gameBoard.push(
      <div className="board-row" key={i}>
        {list}
      </div>
    );
  }

  return <div>{gameBoard}</div>;
};
export default Board;
