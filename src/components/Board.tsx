import React, { useEffect, useState } from "react";
import { createNewBoard } from "../utils/board";
import Cell from "./Cell";
import { revealed } from "../utils/reveal";

export type CellType = {
  value: number;
  revealed: boolean;
  x: number;
  y: number;
  flagged: boolean;
};

export const Board = () => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [mineLocations, setMineLocations] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState<0 | 1 | 2>(2);
  const [nonMineCount, setNonMineCount] = useState(0);

  useEffect(() => {
    const config = { row: 30, col: 30, bombs: 10 };
    const newBoard = createNewBoard(config.row, config.col, config.bombs);
    setNonMineCount(config.row * config.col - config.bombs);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  }, []);

  // on right click - flag
  const updateFlag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  // on click - reveal
  const revealCell = (x: number, y: number) => {
    if (grid[x][y].revealed || gameOver !== 2) return;
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      if (newGrid[x][y].value === "X") {
        for (let i = 0; i < mineLocations.length; i++) {
          newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
        }
        setGrid(newGrid);
        setGameOver(0);
      }
    } else {
      // let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      const newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setNonMineCount(newRevealedBoard?.newNonMinesCount);
      setGrid(newRevealedBoard?.arr);
      if (newRevealedBoard?.newNonMinesCount === 0) {
        setGameOver(1);
      }
    }
  };

  return (
    <div className="flex w-screen h-full justify-center items-center">
      <div>
        {grid?.map((singleRow: CellType[], index1: number) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock: CellType, index2: number) => {
                // return <p key={index2}>{JSON.stringify(singleBlock)}</p>;
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                    gameOver={gameOver}
                  />
                );
              })}
            </div>
          );
        })}
        {gameOver !== 2 && (
          <p className="text-white">
            {gameOver === 1 ? "Won" : gameOver === 0 ? "Loose" : null}
          </p>
        )}
      </div>
    </div>
  );
};
