import React from "react";
import { useHistory } from "react-router"
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Table from "./Table"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Tables({loadDashboard, tables, tablesError}) {
  const history = useHistory();
  function clearTable(table_id) {
    const confirm = window.confirm("Is this table ready to seat new guests?");
      if(confirm) {
        finishTable(table_id)
        .then(loadDashboard)
        .catch(console.log)
      }
  }

  return (
    <main>
      <ErrorAlert error={tablesError} />
      <h2>Tables</h2>
      <div>
        <button className='btnP' onClick={()=>history.push("/tables/new")}>
        <span className ='icon'>event_seat</span>
          New Table
          </button>
      </div>
      <div className='tablesCont'>
        {tables.map((table)=> <Table key={table.table_id} table={table} clearTable={clearTable}/>)}
      </div>
    </main>
  );
}