import "./SingleCell.css";
import { useState } from "react";
import { Characters } from "../../types";
import { useNavigate } from "react-router-dom";

interface SingleCellProps {
  group: Characters[];
}

const SingleCell = ({ group }: SingleCellProps) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const tableHeaders = ["Name", "Height", "Skin color", "Details"];
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

  return (
    <div className="grid_container">
      <div className="grid_group">
        <div className="grid_header">
          {tableHeaders.map((header, index) => (
            <div key={index} className="grid_header_item">
              {header}
            </div>
          ))}
        </div>
        {group.map((person, index) => (
          <div key={index} className="grid_row">
            <div
              className="grid_item"
              style={{
                color: selectedRow.includes(index) ? "red" : "",
              }}
              onClick={() => handleNameClick(index)}
            >
              {person.name || ""}
            </div>
            <div className="grid_item">{person.height || ""}</div>
            <div className="grid_item">{person.skin_color || ""}</div>
            <div className="grid_item">
              <button onClick={() => showDetails(person)}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCell;
