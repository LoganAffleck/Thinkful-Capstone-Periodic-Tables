  
import React from "react";

export default function Table({table, clearTable}) {
    
  function handleClick() {
      clearTable(table.table_id);
  }
  return (
    <div className="table">
      <div>
        <h4>Table: {table.table_name}</h4>
        <p>Capacity: {table.capacity}</p>
        <p data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied"
        : "Free"}</p>
        <div>{table.reservation_id ? <button className='btnP' data-table-id-finish={table.table_id} onClick={handleClick}>Finish</button> : ""}</div>
      </div>
    </div>
  );
}