import React, { useState } from 'react';
import '../SolverPage.css';

export default function SolverPage() {
  const [board, setBoard] = useState(
    Array(9).fill().map(() => Array(9).fill(""))
  );

  const [isValid, setIsValid] = useState(null); // null = not checked, true/false = validity
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? value : cell
        )
      );
      setBoard(newBoard);
      setIsValid(null); // reset validity on input change
      setShowError(false); // hide error on new input
    }
  };

  // Function to check duplicates in array ignoring empty strings
  const hasDuplicates = (arr) => {
    const filtered = arr.filter((num) => num !== "");
    return new Set(filtered).size !== filtered.length;
  };

  // Function to check Sudoku validity
  const checkSudokuValidity = () => {
    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      // Check row
      if (hasDuplicates(board[i])) {
        setIsValid(false);
        setShowError(true);
        return;
      }
      // Check column
      const col = board.map(row => row[i]);
      if (hasDuplicates(col)) {
        setIsValid(false);
        setShowError(true);
        return;
      }
    }

    // Check 3x3 sub-boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        let boxCells = [];
        for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
          for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
            boxCells.push(board[r][c]);
          }
        }
        if (hasDuplicates(boxCells)) {
          setIsValid(false);
          setShowError(true);
          return;
        }
      }
    }

    setIsValid(true);
    setShowError(false);
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🧩 Sudoku Solver</h2>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div className="sudoku-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength="1"
                className="cell"
                value={cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={checkSudokuValidity}>
          Check
        </button>

        {isValid && (
          <button className="btn btn-success">
            Solve Sudoku
          </button>
        )}
      </div>

      {showError && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Invalid Sudoku! Please enter numbers correctly without duplicates.
        </p>
      )}
    </div>
  );
}
