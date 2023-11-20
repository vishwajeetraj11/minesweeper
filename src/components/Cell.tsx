import { CellType } from "./Board";

type Props = {
  details: CellType;
  updateFlag: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => void;
};

const Cell = ({ details, updateFlag }: Props) => {
  return (
    <div
      onClick={() => console.log(details)}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      className="flex items-center justify-center"
      style={{ width: 40, height: 40, background: "grey" }}
    >
      {details.value}
    </div>
  );
};

export default Cell;
