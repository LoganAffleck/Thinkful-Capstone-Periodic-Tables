import React from 'react';
import { useHistory } from 'react-router-dom';
import { today } from "../utils/date-time";



const ReservationForm = ({  formData, setFormData, handleSubmit  }) => {

    const history = useHistory();

    return(
    <>
    <h1>Reservation form is working.</h1>
    <form>
        <label htmlFor='first_name'>First Name:</label>
        <input type='text' name='first_name'
        value={formData.firstName} 
        onChange={(e)=>setFormData({...formData, firstName: e.target.value})}></input>

        <label htmlFor='last_name'>Last Name:</label>
        <input type='text' name='last_name'
        value={formData.lastName} 
        onChange={(e)=>setFormData({...formData, lastName: e.target.value})}></input>

        <label htmlFor='mobile_number'>Phone Number:</label>
        <input type='text' name='mobile_number'
        value={formData.mobile_number} 
        onChange={(e)=>setFormData({...formData, mobile_number: e.target.value})}></input>

        <label htmlFor='reservation_date'>Reservation Date:</label>
        <input type='date' min={today()} name='reservation_date'
        value={formData.reservation_date} 
        onChange={(e)=>setFormData({...formData, reservation_date: e.target.value})}></input>

        <label htmlFor='reservation_time'>Reservation Time:</label>
        <input type='time' min='10:00' max='21:00' name='reservation_time'
        value={formData.reservation_time} 
        onChange={(e)=>setFormData({...formData, reservation_time: e.target.value})}></input>

        <label htmlFor='people'>Party Size:</label>
        <input type='number' min='1' max='50' name='people'
        value={formData.people} 
        onChange={(e)=>setFormData({...formData, people: e.target.value})}></input>

    </form>

    <button type= 'submit'onClick={handleSubmit}>Submit</button>
    <button type='cancel' onClick={()=>history.goBack()}>Cancel</button>

    </>
    )
}

export default ReservationForm;