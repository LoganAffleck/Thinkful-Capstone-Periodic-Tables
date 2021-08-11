import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {createTable} from '../utils/api';

import TableForm from './TableForm';

const NewTable = () => {

    const history = useHistory();

    let [table_name, setTable_Name] = useState('');
    let [capacity, setCapacity]  = useState(0);


    const handleSubmit = async () => {
        let newTable = {
            table_name: table_name,
            capacity: Number(capacity)
        }
        let data = await createTable(newTable);
        console.log(data)
        //And then direct user to the Dashboard...
        history.push(`/dashboard`)
    }

    return(
        <>
        <TableForm
        table_name={table_name}
        setTable_Name={setTable_Name}
        capacity={capacity}
        setCapacity={setCapacity}
        handleSubmit={handleSubmit}
        />
        </>
    )
}

export default NewTable;