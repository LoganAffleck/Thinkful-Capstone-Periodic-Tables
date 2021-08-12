import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {createReservation} from '../utils/api';

import ReservationForm from './ReservationForm';

const NewReservation = () => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
      });
    const [reservationError, setReservationError] = useState(null);
    
    const handleSubmit = async () => {
        try{
            await createReservation(formData);
            history.push(`/dashboard?date=${formData.reservation_date}`)
        } catch(error){
            setReservationsError(error)
        }
    };

    return(
        <>
        <ReservationForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        />
        </>
    )
}

export default NewReservation;