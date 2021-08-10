const service = require('./reservations.service');
const moment = require('moment');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
let dateFormat = /\d\d\d\d-\d\d-\d\d/;
let timeFormat = /\d\d:\d\d/;

//------MIDDLEWARE-------//

//--FUNCTIONS FOR "LIST" METHOD--//
//Validate the date query parameter. 
async function valid_GET_query (req, res, next) {
  if(req.query.date){
    let date = req.query.date;
    if(date.match(dateFormat)){
      res.locals.date = date;
      return next();
    }
  }
  
  return next({
    status: 400,
    message: `There is either no "DATE" query in the URL, or it is not formatted correctly.`
  }) 
}

//--FUNCTIONS FOR "CREATE" METHOD--//
//Validate incoming reservation: 
async function validateRes (req, res, next){
 if(req.body.data){
  const reservation = req.body.data;
  let {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = reservation;

  if(first_name && last_name && mobile_number && reservation_date && reservation_time && people){
    res.locals.reservation = reservation;
    return next();
  };
}

  return next({
    status: 400,
    message: "A reservation was not submitted correctly. Check that first_name, last_name, mobile_number, reservation_date, reservation_time, people are entered correctly."
});
};

//Validate that the incoming date and time are formatted correctly, plus make sure that the "people" value is a number.
async function validateDateAndTime(req, res, next) {
  let reservation = res.locals.reservation;
  let {reservation_date, reservation_time, people} = reservation;
  if(reservation_date.match(dateFormat) && reservation_time.match(timeFormat) && (typeof people) === 'number'){
    return next()
  };
  return next({
    status: 400,
    message: `reservation_date is ${reservation_date} and reservation_time is ${reservation_time} and people is ${people} and ${typeof people}. Check that these values are correct.`
});

};

//Prevent reservations from being created on a Tuesday.
async function preventTuesdays(req, res, next) {
  let dateArg = res.locals.reservation.reservation_date;
  let date = new Date(dateArg)
  if(date.getDay() === 1){
    return next({
      status: 400,
      message: `The input date is on a Tuesday, but the resturaunt is closed on Tuesdays.`
    })
  }
  return next();
};

//Prevent reservations from being created in the past.
async function preventPastDates(req, res, next){
  let {reservation_date, reservation_time} = res.locals.reservation;

  let date = new Date(reservation_date);
  date.setTime(reservation_time);
  res.locals.dateTime = date;

  let today = new Date();
  if(date < today){
    return next({
      status: 400,
      message: `The input date is in the past, and must be in the future.`
    })
  }
  return next();
}

async function preventClosedTimes(req, res, next){
  let {reservation_date} = res.locals.reservation;
  let dateTime = res.locals.dateTime;
  let openingTime = new Date(reservation_date);
  date.setTime
  next();
}

//------CRUD FUNCTIONS------//
async function list(req, res) {
  let date = res.locals.date;
  const data = await service.list(date);
  res.json({ data });
}

async function create(req, res) {
  const reservation = res.locals.reservation;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(valid_GET_query), asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(validateRes), 
    asyncErrorBoundary(validateDateAndTime), 
    asyncErrorBoundary(preventTuesdays),
    asyncErrorBoundary(preventPastDates),
    asyncErrorBoundary(preventClosedTimes),
    asyncErrorBoundary(create)
  ]
};
