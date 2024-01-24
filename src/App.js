import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBlueTurn, setIsBlueTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  useEffect(() => {
    const savedBlueScore = localStorage.getItem('blueScore');
    const savedRedScore = localStorage.getItem('redScore');

    if (savedBlueScore && savedRedScore) {
      setBlueScore(parseInt(savedBlueScore, 10));
      setRedScore(parseInt(savedRedScore, 10));
    }
  }, []);

  const handleClick = (index) => {
    if (board[index] || winner) return;
  
    const newBoard = [...board];
    newBoard[index] = isBlueTurn ? 'X' : 'O';
    setBoard(newBoard);
  
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      updateScores(currentWinner);
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner('Draw');
    } else {
      setIsBlueTurn(!isBlueTurn);
    }
  };
  
  const calculateWinner = (squares) => {
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
  };

  const updateScores = (winner) => {
    if (winner === 'X') {
      setBlueScore(blueScore + 1);
      localStorage.setItem('blueScore', blueScore + 1);
    } else if (winner === 'O') {
      setRedScore(redScore + 1);
      localStorage.setItem('redScore', redScore + 1);
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsBlueTurn(true);
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="scoreboard">
        <div className="player-score">
          <span className={`player-name ${isBlueTurn ? 'active' : ''}`} color="blue">BLUE</span>
          <span className="score">{blueScore}</span>
        </div>
        <div className="player-score">
          <span className={`player-name ${!isBlueTurn ? 'active' : ''}`} color="red">RED</span>
          <span className="score">{redScore}</span>
        </div>
      </div>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className={`square ${value}`} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      
      {winner && winner !== 'Draw' ? (
        <div className="winner">
          <p>{winner} wins!</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : winner === 'Draw' ? (
        <div className="draw">
          <p>It's a draw!</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div className="restart-button">
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
</div>

  );
  
};

export default App;

