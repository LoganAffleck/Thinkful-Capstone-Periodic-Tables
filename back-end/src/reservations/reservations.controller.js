const service = require('./reservations.service');
const validateSubmission = require('./utils/validateSubmission')
const validateDateTime = require('./utils/validateDateTime')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const dateFormat = /\d\d\d\d-\d\d-\d\d/;

//------MIDDLEWARE-------//

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
    message: `There is either no "DATE" query or it is not formatted correctly.`
  }) 
}

//Validate incoming reservation: 
async function validateRes (req, res, next) {
  let error = [];
  if(req.body.data) {
    const reservation = req.body.data;
    error = error.concat(validateSubmission(reservation, error)).concat(validateDateTime(reservation, error));
    if (error.length) return next({status: 400, message: `The submission failed: ${error.join(', ')}.`});
    res.locals.reservation = reservation;
    return next();
  };
    return next({status: 400, message: `There was no submission data.`});
};

async function reservationExists (req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id)

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`
  });

};

function updateValidation(req, res, next) {
  const reqStatus = req.body.data.status;
  const status = res.locals.reservation.status;
  
  if (
    reqStatus !== "booked" &&
    reqStatus !== "seated" &&
    reqStatus !== "finished" &&
    reqStatus !== "cancelled"
  ) {
    next({
      status: 400,
      message: "unknown status.",
    });
  }

  if (status === "finished") {
    next({
      status: 400,
      message: "a finished reservation cannot be updated.",
    });
  }

  next();
};

//------CRUD FUNCTIONS------//
async function list(req, res) {
  let date = res.locals.date;
  const data = await service.list(date);
  res.json({ data });
};

async function create(req, res) {
  const reservation = res.locals.reservation;
  const data = await service.create(reservation);
  res.status(201).json({ data });
};

async function read (req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function update(req, res) {
  console.log(`UPDATECALLED`)
  const reservation_id = req.params.reservation_id;
  const status = req.body.data.status;

  const updateStatus = await service.update(reservation_id, status);
  res.status(200).json({ data: updateStatus });
};

module.exports = {
  list: [asyncErrorBoundary(valid_GET_query), asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(validateRes), asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), updateValidation, asyncErrorBoundary(update)]
};
