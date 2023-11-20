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
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const newBoard = createNewBoard(10, 10, 5);
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
    const newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      if (newGrid[x][y].value === "X") {
        for (let i = 0; i < mineLocations.length; i++) {
          newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
        }
        setGrid(newGrid);
        setGameOver(true);
      }
    } else {
      // let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      const newRevealedBoard = revealed(newGrid, x, y);

      setGrid(newRevealedBoard.arr);
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
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
