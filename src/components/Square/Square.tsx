import React from "react";

function Square({
  value,
  isWin,
  onClick,
  selectedSquare,
}: {
  value: any;
  isWin: any;
  onClick: any;
  selectedSquare: any;
}) {
  let status = "";

  if (selectedSquare) {
    status = "square selected";
  }
  if (isWin) {
    status = "square win";
  }

  return (
    <button onClick={onClick} className={`square ${value} ${status}`}>
      {value}
    </button>
  );
}

export default Square;
