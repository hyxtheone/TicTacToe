import { useState, useEffect } from "react";

function temNull(array) {
  return array.some(function(elemento) {
    return elemento === null;
  });
}


function ResetButton({ onButtonClick }) {
  return (
    <button className="reset" onClick={onButtonClick}>
      Resetar
    </button>
  );
}

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Next player: X");

  function handleClick(i) {

    if (calculateWinner(squares) || squares[i]) {
      console.log('continua')
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (!temNull(nextSquares) && !calculateWinner(nextSquares)) {
      setTimeout(() => {
        setStatus('Empate!');
      }, 0);
    } else {
      setTimeout(() => {
        if (calculateWinner(nextSquares)) {
          setStatus('Winner: ' + calculateWinner(nextSquares));
        } else {
          setStatus('Next player: ' + (!xIsNext ? 'X' : 'O'));
        }
      }, 0);
    }}

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
  }

  // const winner = calculateWinner(squares);

  // if (winner) {
  //   setStatus("Winner: " + winner)
  // } else{
  //   setStatus("Next player: " + (xIsNext ? "X" : "O"))
  // }

  return (
    <>
      <div className="board-main">
        <div className="status">
          <h1>{status}</h1>
        </div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
          <Square
            value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        <div>
          <ResetButton onButtonClick={() => handleReset()} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
