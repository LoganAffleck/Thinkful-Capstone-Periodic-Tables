const {DateTime} = require ('luxon');

const today = DateTime.now()
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

const validateDateTime = (reservation, error) => {
    //If there is no reservation date or time to validate, no need to do anything.
    if (!reservation.reservation_date || !reservation.reservation_time) return error;

    let {reservation_date, reservation_time} = reservation;
    if (!reservation_date.match(dateFormat)) error.push(`reservation_date is not formatted correctly`);
    if (!reservation_time.match(timeFormat)) error.push(`reservation_time is not formatted correctly`);

    if(reservation_date.match(dateFormat) && reservation_time.match(timeFormat)){
      const submittedDate = new Date(reservation_date)
      const submittedTime = DateTime.fromISO(`${reservation_date}T${reservation_time}`)
      const openingTime = DateTime.fromISO(`${reservation_date}T10:30:00`)
      const closingTime = DateTime.fromISO(`${reservation_date}T21:30:00`)

      if (submittedDate.getDay() === 1) error.push(`The resturaunt is closed on Tuesday and can't accept reservations.`);
      if (submittedDate < today) error.push(`The date/time submitted needs to be in the future.`);
      if (submittedTime > closingTime || submittedTime < openingTime) error.push(`The store is closed on ${submittedTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}!`);
      };

    return error;
}


module.exports = validateDateTime;