export function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], path: element };
    }
  }
  return null;
}

export function calculateWinnerAdvanced(squares: any, gameSize: any) {
  let winPath = Array(5); //track of the square that show winner's path

  const directionMove = [
    { i: 0, j: 1 }, // row: L-R
    { i: 1, j: 0 }, //col: T-B
    { i: 1, j: 1 }, //diag:TL - BR
    { i: 1, j: -1 }, //diag:TR - BL
  ];

  for (let i = 0; i < gameSize; i++) {
    for (let j = 0; j < gameSize; j++) {
      let index = i * gameSize + j;

      if (!squares[index]) {
        continue;
      }

      for (const element of directionMove) {
        let count = 1;
        let nextX = i;
        let nextY = j;

        while (count <= 4) {
          nextX = nextX + element.i;
          nextY = nextY + element.j;

          if (
            nextX < 0 ||
            nextX >= gameSize ||
            nextY < 0 ||
            nextY >= gameSize
          ) {
            break;
          } //if cur is over the size break loop

          let nextPos = nextX * gameSize + nextY;

          if (squares[index] !== squares[nextPos]) {
            break;
          } // if tha value doesn't match break loop

          winPath[count] = nextPos;
          count++;
        }

        if (count === 5) {
          winPath[0] = index;
          return { winner: squares[index], path: winPath };
        }
      }
    }
  }
  return null;
}
