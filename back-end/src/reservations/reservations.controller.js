const service = require('./reservations.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE

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

async function validateDateAndTime(req, res, next) {
  let reservation = res.locals.reservation;
  let {reservation_date, reservation_time, people} = reservation
  let dateFormat = /\d\d\d\d-\d\d-\d\d/;
  let timeFormat = /\d\d:\d\d/;
  if(reservation_date.match(dateFormat) && reservation_time.match(timeFormat) && (typeof people) === 'number'){
    return next()
  };
  return next({
    status: 400,
    message: "reservation_date, reservation_time, people."
});

};



async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const reservation = res.locals.reservation;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(validateRes), 
    asyncErrorBoundary(validateDateAndTime), 
    asyncErrorBoundary(create)]
};
