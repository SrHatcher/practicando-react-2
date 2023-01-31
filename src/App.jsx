import { useState } from 'react';
import './App.css';

function Square({value, squareFunction}){
  return(
    <button className='button' onClick={squareFunction}>{value}</button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = 'x';
    }else{
      nextSquares[i] = 'o';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='board'>
      <h1>hola fernando</h1>
      <div className='board-row'>
        <Square value={squares[0]} squareFunction={()=>{handleClick(0);}} />
        <Square value={squares[1]} squareFunction={()=>{handleClick(1);}} />
        <Square value={squares[2]} squareFunction={()=>{handleClick(2);}} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} squareFunction={()=>{handleClick(3);}} />
        <Square value={squares[4]} squareFunction={()=>{handleClick(4);}} />
        <Square value={squares[5]} squareFunction={()=>{handleClick(5);}} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} squareFunction={()=>{handleClick(6);}} />
        <Square value={squares[7]} squareFunction={()=>{handleClick(7);}} />
        <Square value={squares[8]} squareFunction={()=>{handleClick(8);}} />
      </div>
    </div>
  );
}

export default Board;
