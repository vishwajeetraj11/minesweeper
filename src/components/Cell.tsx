import { CellType } from "./Board";

type Props = {
  details: CellType;
  revealCell: (x: number, y: number) => void;
  updateFlag: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => void;
};

const Cell = ({ details, updateFlag, revealCell }: Props) => {
  return (
    <div
      onClick={() => revealCell(details.x, details.y)}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      className="flex items-center justify-center cursor-pointer"
      style={{
        width: 40,
        height: 40,
        background: "lightgrey",
        border: "2px solid green",
      }}
    >
      {/* {details.revealed ? details.value : ""} */}
      {details.revealed ? details.value : ""}
    </div>
  );
};

export default Cell;
