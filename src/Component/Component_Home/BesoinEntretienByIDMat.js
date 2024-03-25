import React, { useState } from "react";
import "../../CSS/BesoinEntretienByID.css";

const BesoinEntretienID = ({ notice }) => {
  const [selectedEntretienId, setSelectedEntretienId] = useState(null);

  const toggleEntretien = (id) => {
    setSelectedEntretienId(selectedEntretienId === id ? null : id);
  };

  return (
    <div
      key={notice.IdBesoinEntretien}
      className="frameRetrecieNotice"
      onClick={() => toggleEntretien(notice.IdBesoinEntretien)}
    >
      <div
        className={`TexteNotice ${
          selectedEntretienId === notice.IdBesoinEntretien ? "active" : ""
        }`}
      >
        <p>{notice.TypeEntretien}</p>
      </div>
    </div>
  );
};

export default BesoinEntretienID;
