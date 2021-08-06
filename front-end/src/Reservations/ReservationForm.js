import React from 'react';
import { today } from "../utils/date-time";

const ReservationForm = (

{   firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    resDate,
    setResDate,
    resTime,
    setResTime,
    partySize,
    setPartySize,
    handleSubmit
}

) => {
    return(
        <>
        <h1>Reservation form is working.</h1>
        <form>
            <label htmlFor='first_name'>First Name:</label>
            <input type='text' name='first_name'
            value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>

            <label htmlFor='last_name'>Last Name:</label>
            <input type='text' name='last_name'
            value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>

            <label htmlFor='phone_number'>Phone Number:</label>
            <input type='text' name='phone_number'
            value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>

            <label htmlFor='reservation_date'>Reservation Date:</label>
            <input type='date' min={today()} name='reservation_date'
            value={resDate} onChange={(e)=>setResDate(e.target.value)}></input>

            <label htmlFor='reservation_time'>Reservation Time:</label>
            <input type='time' min='10:00' max='21:00' name='reservation_time'
            value={resTime} onChange={(e)=>setResTime(e.target.value)}></input>

            <label htmlFor='people'>Party Size:</label>
            <input type='number' min='1' max='50' name='reservation_time'
            value={partySize} onChange={(e)=>setPartySize(e.target.value)}></input>
        </form>

        <button onClick={handleSubmit}>Submit</button>

        </>
    )
}

export default ReservationForm;