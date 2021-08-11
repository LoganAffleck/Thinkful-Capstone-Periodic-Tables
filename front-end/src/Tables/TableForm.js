import React from 'react';
import { today } from "../utils/date-time";

const TableForm = (

{   
    table_name,
    setTable_Name,
    capacity,
    setCapacity,
    handleSubmit
}

) => {
    return(
        <>
        <h1>New Table form is working.</h1>
        <form>

            <label htmlFor='table_name'>Table Name:</label>
            <input type='text' name='table_name'
            value={table_name} onChange={(e)=>setTable_Name(e.target.value)}></input>

            <label htmlFor='capacity'>Capacity:</label>
            <input type='number' min='1' max='100' name='capacity'
            value={capacity} onChange={(e)=>setCapacity(e.target.value)}></input>

        </form>

        <button onClick={handleSubmit}>Submit</button>
        <button>Cancel</button>

        </>
    )
}

export default TableForm;