import React, {useEffect, useState} from "react"
import {useHistory, useParams} from "react-router"
import { editReservation, readReservation } from "../utils/api"
import ReservationForm from './ReservationForm';

import ErrorAlert from "../layout/ErrorAlert"


export default function EditReservation() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
      });
    const [reservationError, setReservationError] = useState(null);
    const history = useHistory();
    const params = useParams();

    useEffect(loadReservation, []);

    function loadReservation() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(params.reservation_id, abortController.signal)
          .then((res) => setFormData({
              ...res,
              reservation_date: new Date(res.reservation_date).toISOString().substr(0, 10)
          }))
          .catch(setReservationError);
        return () => abortController.abort();
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        editReservation(formData, formData.reservation_id, abortController.signal)
        .then(() =>
            history.push(`/dashboard?date=${formData.reservation_date}`)
        )
        .catch(setReservationError);
        return () => abortController.abort();
    };
      
    return (
    <>
    <ReservationForm
    formData={formData}
    setFormData={setFormData}
    handleSubmit={handleSubmit}
    />
    </>
            
    )
}