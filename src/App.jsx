import { useState } from 'react';
import './App.css';

function Square({value, squareFunction, classs}){
  console.log(classs);
  const classes = `${classs} button`;
  return(
    <button className={classes} onClick={squareFunction}>{value}</button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  const [winner, lines] = calculateWinner(squares);
  const gamefull = squares.includes(null);
  console.log(squares, gamefull);

  let status;
  if(winner){
    status = 'Winner: ' + winner;
  }else if(!gamefull){
    status = 'Draw';
  }else{
    status = "next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i){
    if(squares[i] || winner){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = 'x';
    }else{
      nextSquares[i] = 'o';
    }
    onPlay(nextSquares);
  }

  let containers=[];
  for(let i=0; i<=2; i++){
    let squaresButtons=[];
    for(let j=0; j<=2; j++){
      let valor= (i+i) + (i+j);
      let clase;

      if(lines){
        for(let line of lines){
          if(line === valor ){
            clase = 'winner-button' ;
          }else{
            
          }
        }
      }
      squaresButtons.push(<Square key={valor} classs={clase} value={squares[valor]} squareFunction={()=>{handleClick(valor);}}></Square>);
    }
    containers.push(<div key={i} className='board-row'>{squaresButtons}</div>);
  }
  
  return (
    <div className='board'>
      <h1>{status}</h1>
      {containers}
    </div>
  );
}

function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [order, setOrder] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, moveIndex) => {
    let description;
    let move;
    if(order){
      move = moveIndex;
    }else{
      move = (history.length - 1) - moveIndex;
    }

    if(move>0){
      description = 'Go to move #' + move;
    }else{
      description = 'Go to game start';
    }

    let element;
    if (move===currentMove) {
      if(move===0){
        element = <span>You're at the game start</span>;
      }else{
        element = <span>You're at move #{move}</span>;
      }
    }else{
      element = <button onClick={()=>jumpTo(move)}>{description}</button>;
    }

    return(
      <li key={moveIndex}>
        {element}
      </li>
    );
  });

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }  

  function toggleOrder(){
    setOrder(!order);
  }

  return(
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game__info'>
        <div className='game-info'>
          <ol>{moves}</ol>
        </div>
        <button onClick={()=>{toggleOrder();}}>Toggle Order</button>
      </div>
    </div>
  );
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i=0; i<lines.length; i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a]===squares[c]){
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

export default Game;
