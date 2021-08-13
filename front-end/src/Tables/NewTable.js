import React, { useState } from "react";
import { useHistory } from "react-router"
import ErrorAlert  from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function NewTable () {
    const initialFormState = {
        table_name: "",
        capacity: "",
    }
    const [formData, setFormData] = useState({ ...initialFormState });
    const [tableError, setTableError] = useState(null);
    const history = useHistory();

    const handleChange = ({ target }) => {
        let value = target.value;
        if(target.name === "capacity"){
            if(value < 1)
                 value = 1;
        }
        setFormData({
            ...formData,
            [target.name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        createTable(formData).then(response => {
                        history.push(`/dashboard`)
                    }).catch((error)=>{
                        setTableError(error)});
      };

    return (
        <div>
            <h1>New Table:</h1>
            <ErrorAlert error={tableError} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="table_name">
                    Table Name:
                    <input
                        id="table_name"
                        type="text"
                        name="table_name"
                        onChange={handleChange}
                        value={formData.table_name} 
                        required />
                </label>
                <br/>
                <label htmlFor="capacity">
                    Capacity:
                    <input
                        id="capacity"
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        value={formData.capacity} 
                        required />
                </label>
                <br/>
                <button className='btnP' type="submit">Submit</button>
                <button className='btnPD' type="cancel" onClick={()=>history.goBack()}>Cancel</button>
            </form>
            
        </div>
    )
}