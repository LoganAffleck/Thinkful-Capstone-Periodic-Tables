import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {createReservation} from '../utils/api';

import ReservationForm from './ReservationForm';

const NewReservation = () => {

    const history = useHistory();

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [phoneNumber, setPhoneNumber] = useState('');
    let [resDate, setResDate] = useState('');
    let [resTime, setResTime] = useState('');
    let [partySize, setPartySize] = useState('');

    const handleSubmit = async () =>{
        let reservation = {
            first_name: firstName,
            last_name: lastName,
            mobile_number: phoneNumber,
            reservation_date: resDate,
            reservation_time: resTime,
            people: partySize,
        }
        await createReservation(reservation);
        //And then direct user to the Dashboard...
        history.push("/dashboard")
    }

    return(
        <>
        <ReservationForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        resDate={resDate}
        setResDate={setResDate}
        resTime={resTime}
        setResTime={setResTime}
        partySize={partySize}
        setPartySize={setPartySize}
        handleSubmit={handleSubmit}
        />
        </>
    )
}

export default NewReservation;