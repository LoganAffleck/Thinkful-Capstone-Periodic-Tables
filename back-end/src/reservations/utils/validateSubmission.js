//This function does an initial pass to make sure the reservation is of the expected form. It's used in reservations.controller.

//Param 'Reservation' is a user-submitted object with specified parameters.
//Param 'Error' is an array. If one of the parameters is incorrect, a string regarding that parameter is added.

const validateSubmission = (reservation, error) => {
    let {first_name, last_name, mobile_number, reservation_date, reservation_time, people, status} = reservation;

    if (!first_name) error.push(`first_name is missing`);
    if (!last_name) error.push(`last_name is missing`);
    if (!mobile_number) error.push(`mobile_number is missing`);
    if (!people) error.push(`people value is missing`);
    if ((typeof people) !== 'number') error.push(`people value isn't a number.`);
    if(status === "seated" || status === "finished") error.push(`A new reservation can't be set to a status of seated or finished during submission.`);
    if (!reservation_date) error.push(`reservation_date is missing`);
    if (!reservation_time) error.push(`reservation_time is missing`);

    return error;
};

module.exports = validateSubmission;