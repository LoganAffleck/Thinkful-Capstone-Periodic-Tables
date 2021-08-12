const service = require('./reservations.service');
const validateSubmission = require('./utils/validateSubmission')
const validateDateTime = require('./utils/validateDateTime')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//------MIDDLEWARE-------//

//Validate incoming reservation: 
async function validateReservation (req, res, next) {
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

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
};

async function list(req, res) {
    const { date, mobile_number } = req.query;
    if(date){
    const data = await service.list(date);
    res.json({ data });
    }
    else{
      const data = await service.search(mobile_number)
      res.json({ data });
    }   
};

async function reservationExists(req, res, next) {

    const {reservation_id} = req.params
    const reservation = await service.read(reservation_id);

    if (reservation) {
        res.locals.reservation = reservation;
        return next();
      }; 
    
      return next({
          status: 404,
          message: `Reservation ${reservation_id} is not in the database.`,
        });
};

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
};

async function update(req, res) {
  
  const {reservation_id} = req.params;
  const {status} = req.body.data;

  let updated = await service.update(reservation_id, status);
  res.status(200).json({ data: updated });
};

async function editReservation(req, res) {
  
  const editedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const data = await service.editReservation(editedReservation);
  res.status(200).json({ data: data[0] });
};


module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [asyncErrorBoundary(reservationExists), updateValidation, asyncErrorBoundary(update)],
  editReservation: [asyncErrorBoundary(reservationExists), validateReservation, asyncErrorBoundary(editReservation)]
};
