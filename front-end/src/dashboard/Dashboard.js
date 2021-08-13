import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../Reservations/Reservation"
import Tables from "../Tables/Tables"
import { today, previous, next } from "../utils/date-time";
import {listReservations, listTables} from "../utils/api"
import useQuery from "../utils/useQuery"

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();

  const history = useHistory();

 
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then((pulledTables) => {
        const updatedTables = pulledTables.map((table) => {
          return { ...table };
        });
        return updatedTables;
      })
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function ReservationList({reservations}){
    if(!reservations.length){
      return(
        <div className='reservationsCont'> <p className='noReservations'>There are no reservations for the selected day.</p></div>
      )
    }
    return (
      <div className='reservationsCont'>
      {reservations.map((res)=> <Reservation key={res.reservation_id} res={res} loadDashboard={loadDashboard} setReservationError={setReservationsError}/>)}
      </div>
    )
  }

  
  return (
    <main className="main">
      <h1>Dashboard</h1>
      <hr/>
      <div className="dateToggle">
        <button className="datebtn" 
        onClick={()=> history.push(`/dashboard?date=${previous(date)}`)}>
          <span className="icon" >arrow_back</span>
        </button>
        <button className="datebtnToday"
        onClick={()=> history.push(`/dashboard?date=${today()}`)}>Today</button>
        <button className="datebtn"
        onClick={()=> history.push(`/dashboard?date=${next(date)}`)}>
          <span className="icon" >arrow_forward</span>
          </button>
      </div>
      <div>
        <h2>Reservations for {date} </h2>
      </div>

      <ErrorAlert error={reservationsError} />
      
      <ReservationList reservations={reservations}/>


      <Tables loadDashboard={loadDashboard} tables={tables} tablesError = {tablesError} />
    </main>
  );
}

export default Dashboard;
