import "./SingleCell.css";
import { useState } from "react";
import { Characters } from "../../types";
import { useNavigate } from "react-router-dom";

interface SingleCellProps {
  group: Characters[];
}

const SingleCell = ({ group }: SingleCellProps) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const [columnWidths, setColumnWidths] = useState<{
    name: number;
    height: number;
    skinColor: number;
    details: number;
  }>({
    name: 150,
    height: 100,
    skinColor: 100,
    details: 150,
  });

  const navigate = useNavigate();

  const handleNameClick = (index: number) => {
    setSelectedRow((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const showDetails = (person: Characters) => {
    navigate("/details", { state: { person } });
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    column: keyof typeof columnWidths
  ) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = columnWidths[column];

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.pageX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [column]: Math.max(newWidth, 100),
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const gridTemplateColumns = `${columnWidths.name}px ${columnWidths.height}px ${columnWidths.skinColor}px ${columnWidths.details}px`;

  return (
    <div className="grid_group">
      <div className="grid_header" style={{ gridTemplateColumns }}>
        <div className="grid_header_item" style={{ width: columnWidths.name }}>
          Name
          <div
            className="resize-handle"
            onMouseDown={(e) => handleMouseDown(e, "name")}
          />
        </div>
        <div
          className="grid_header_item"
          style={{ width: columnWidths.height }}
        >
          Height
          <div
            className="resize-handle"
            onMouseDown={(e) => handleMouseDown(e, "height")}
          />
        </div>
        <div
          className="grid_header_item"
          style={{ width: columnWidths.skinColor }}
        >
          Skin color
          <div
            className="resize-handle"
            onMouseDown={(e) => handleMouseDown(e, "skinColor")}
          />
        </div>
        <div
          className="grid_header_item"
          style={{ width: columnWidths.details }}
        >
          Details
          <div
            className="resize-handle"
            onMouseDown={(e) => handleMouseDown(e, "details")}
          />
        </div>
      </div>
      {group.map((person, index) => (
        <div key={index} className="grid_row" style={{ gridTemplateColumns }}>
          <div
            className="grid_item"
            style={{
              color: selectedRow.includes(index) ? "red" : "",
              width: columnWidths.name,
            }}
            onClick={() => handleNameClick(index)}
          >
            {person.name || ""}
          </div>
          <div className="grid_item" style={{ width: columnWidths.height }}>
            {person.height || ""}
          </div>
          <div className="grid_item" style={{ width: columnWidths.skinColor }}>
            {person.skin_color || ""}
          </div>
          <div className="grid_item" style={{ width: columnWidths.details }}>
            <button onClick={() => showDetails(person)}>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCell;
