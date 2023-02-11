// se importan las librerias 
import { useState } from 'react';
// funcion para agregar un boton 
function Square({ value, onSquareClick }) {
  // devuelve un botón
  return (
    // codigo del boton 
    <button className="square" onClick={onSquareClick}>
    // valor de O ó X
      {value}
//se cierra el  boton 
    </button>
  );
}

//funcion para realizar el fondo del juego 
function Board({ xIsNext, squares, onPlay }) {
  //funcion para ver a cuales botones y les dieron click
  function handleClick(i) {
    // constante para ver si sigue el juego 
    if (calculateWinner(squares) || squares[i]) {
      //se regresa
      return;
    }
    //variable para ver los estados de los cuadrados 
    const nextSquares = squares.slice();
    //condicional para saber su la variable xIsNext es igual a x ó o y asi se sabra que jugador va 
   //para poder altenerar los tornos
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
// variable winner que llama a la funcion para calcualar si se gano
  const winner = calculateWinner(squares);
  
  let status;
  //condicional si winner es igual a winner se agrega winner
  if (winner) {
    status = 'Winner: ' + winner;
    // si no se cumple se dice que va el otro participante 
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        //Square  es el componente para recibir el value
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        //Square  es el componente para recibir el value
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        //Square  es el componente para recibir el value
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        //Square  es el componente para recibir el value
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        //Square  es el componente para recibir el value
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        //Square  es el componente para recibir el value
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        //Square  es el componente para recibir el value
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        //Square  es el componente para recibir el value
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        //Square  es el componente para recibir el value
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//el Game componente para realizar un seguimiento del paso que el usuario está viendo actualmente
export default function Game() {
  // se cran las constantes con un array de 9 espacios null
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //se crea una nueva variable
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  
  //funcion para eñ guardado del historial del juego
  function handlePlay(nextSquares) {
    //crea una nueva matrix y almacena los elementos de history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
//Funcion para ver el historial del juego
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//se crea una variavle constante para convertit el hstorial en un React
  const moves = history.map((squares, move) => {
    //se crea la variable descripcion 
    let description;
    //si los movimientos son diferente 0 
    if (move > 0) {
      //descripcion dira vamos tu movimiento # 
      description = 'Go to move #' + move;
      // si no cumple 
    } else {
      //decripcion a vamos a iniciar el juego
      description = 'Go to game start';
    }
    //regresa la descripcion 
    return (
      // en una lista con un boton 
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
// funcion para ver si uno de los jugadores gano 
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
