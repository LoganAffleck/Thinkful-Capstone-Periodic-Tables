import React, { useState } from "react";
import { listReservationsByPhoneNumber } from "../utils/api";
import Reservation from "../Reservations/Reservation";
import ErrorAlert from "../layout/ErrorAlert"

export default function Search() {
  const [list, setList] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setError(null);
    listReservationsByPhoneNumber(mobileNumber)
      .then(setList)
      .catch(setError);
  }
  return (
    <div>
      <ErrorAlert error={error} />
      <h1>Search</h1>
      <form name="reservation" onSubmit={handleSearch}>
        <input
          className="inputSearch"
          type="text"
          name="mobile_number"
          placeholder="Enter customer's phone number"
          onChange={handleChange}
          value={mobileNumber}
        ></input>
        <button type="submit" className="btnP">
          Find
        </button>
      </form>
      {list.length ? (
        <div className="searchResults">
          {list.map(res => <Reservation res={res} />)}
        </div>
      ) : (
        <div className="searchResults">No reservations found</div>
      )}
    </div>
  );
}