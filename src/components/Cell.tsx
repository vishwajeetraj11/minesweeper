import { useState } from "react";
import { CellType } from "./Board";

type Props = {
  details: CellType;
  revealCell: (x: number, y: number) => void;
  gameOver: 0 | 1 | 2;
  updateFlag: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => void;
};

const Cell = ({ details, updateFlag, revealCell, gameOver }: Props) => {
  const [clicked, setClicked] = useState(false);

  const renderCell = () => {
    if (!details.revealed) {
      // Unopened Tile Image
      return (
        <img
          style={{ width: "24px", height: "24px" }}
          src="https://minesweeper.online/img/skins/hd/closed.svg?v=3"
        />
      );
    }

    return (
      <>
        <div className="relative">
          {/* Opened Tile Image */}
          {/* {!(clicked && details.value === "X") && ( */}
          {gameOver === 2 && (
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://minesweeper.online/img/skins/hd/type0.svg?v=3"
            />
          )}
          {gameOver === 0 && details.value !== "X" && (
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://minesweeper.online/img/skins/hd/type0.svg?v=3"
            />
          )}
          {/* )} */}

          {clicked && details.value === "X" ? (
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://minesweeper.online/img/skins/hd/mine_red.svg?v=3"
            />
          ) : !clicked && details.value === "X" ? (
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://minesweeper.online/img/skins/hd/mine.svg?v=3"
            />
          ) : null}

          {/* {details.value === "X" && (
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://minesweeper.online/img/skins/hd/mine.svg?v=3"
            />
          )} */}

          {details.value !== 0 && details.value !== "X" && (
            <span className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              {details.value}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      onClick={() => {
        revealCell(details.x, details.y);
        setClicked(true);
      }}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      className="flex items-center text-black justify-center"
      style={{
        width: 24,
        height: 24,
        // background: details.revealed ? "grey" : "lightgrey",
        // border: "2px solid green",
        cursor: details.revealed ? "default" : "pointer",
      }}
    >
      {/* {details.revealed ? (details.value === 0 ? "" : details.value) : ""} */}
      {renderCell()}
    </div>
  );
};

export default Cell;
