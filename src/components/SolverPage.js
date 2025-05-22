import React, { useState } from 'react';
import '../SolverPage.css';

export default function SolverPage() {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill("")));
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [cancelSolve, setCancelSolve] = useState(false);



  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (value === '' || (/^[1-9]$/.test(value))) {
      const updatedBoard = board.map(row => [...row]);
      updatedBoard[rowIndex][colIndex] = value;
      setBoard(updatedBoard);
      setIsSolved(false);
    }
  };

  const checkValidSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set();
      const colSet = new Set();
      const boxSet = new Set();
      for (let col = 0; col < 9; col++) {
        const rowVal = grid[row][col];
        const colVal = grid[col][row];
        const boxVal = grid[3 * Math.floor(row / 3) + Math.floor(col / 3)][3 * (row % 3) + (col % 3)];

        if (rowVal !== '') {
          if (rowSet.has(rowVal)) return false;
          rowSet.add(rowVal);
        }

        if (colVal !== '') {
          if (colSet.has(colVal)) return false;
          colSet.add(colVal);
        }

        if (boxVal !== '') {
          if (boxSet.has(boxVal)) return false;
          boxSet.add(boxVal);
        }
      }
    }
    return true;
  };

  const isValidPlacement = (grid, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) return false;
      if (grid[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (grid[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // This is the logic for the cancle button
  const handleReset = () => {
    setCancelSolve(true); // Stop solving
    setIsSolving(false);  // Reset solving flag
    setError('');         // Clear any error
    setIsSolved(false);
    setIsValid(false);
    setBoard(Array(9).fill().map(() => Array(9).fill(""))); // Clear board
  };


const solve = async (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (cancelSolve) return false;
      if (grid[row][col] === '') {
        for (let num = 1; num <= 9; num++) {
          const strNum = num.toString();
          if (isValidPlacement(grid, row, col, strNum)) {
            grid[row][col] = strNum;

            // Update board state to visualize
            setBoard(grid.map(r => [...r]));
            await sleep(1000); // 100 ms delay for visualization

            if (await solve(grid)) return true;

            grid[row][col] = '';

            // Update board state for backtracking visualization
            setBoard(grid.map(r => [...r]));
            await sleep(100);
          }
        }
        return false;
      }
    }
  }
  return true;
};



  const handleCheck = () => {
    const valid = checkValidSudoku(board);
    setIsValid(valid);
    setError(valid ? '' : '⚠️ Invalid Sudoku! Check your inputs.');
  };

  const handleSolve = async () => {
    setCancelSolve(false); // Clear any previous cancellation
    const valid = checkValidSudoku(board);
    setIsValid(valid);
    if (!valid) {
      setError('⚠️ Invalid Sudoku! Check your inputs.');
      return;
    }

    const newBoard = board.map(row => [...row]);
    setError('');
    setIsSolved(false);
    setIsSolving(true); // <-- start solving

    const solved = await solve(newBoard);

    setIsSolving(false); // <-- done solving

    if (solved) {
      setBoard(newBoard);
      setIsSolved(true);
      setError('');
    } else {
      setError("❌ This Sudoku can't be solved.");
    }
};




  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🧩 Sudoku Solver</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Centering container */}
      <div className="sudoku-box">
        <div className="sudoku-grid">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength="1"
                className="cell"
                value={cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                disabled={isSolving} 
              />
            ))
          )}
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-warning me-2" onClick={handleCheck} disabled={isSolving}>Check</button>
          {isValid && !isSolved && (
            <button className="btn btn-success" onClick={handleSolve} disabled={isSolving}>Solve Sudoku</button>
          )}
        <button className="btn btn-danger ms-2" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
