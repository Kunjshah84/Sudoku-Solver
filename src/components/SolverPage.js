import React from 'react'
import { useState } from 'react';
import '../SolverPage.css'


export default function SolverPage() {

  const [board, setBoard] = useState(
  Array(9).fill().map(() => Array(9).fill(""))
  );

  // console.table(board); 
  
   const handleInputChange = (e, rowIndex, colIndex) => {
    
  };

  return (

    <div className="container mt-5 text-center">
      <h2 className="mb-4">🧩 Sudoku Solver</h2>
            <div className="sudoku-grid d-inline-block">
              {board.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
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

    </div>
  )
}
