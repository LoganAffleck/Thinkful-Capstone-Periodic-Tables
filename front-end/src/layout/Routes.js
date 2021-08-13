import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../Reservations/NewReservation";
import EditReservation from "../Reservations/EditReservation";
import NewTable from "../Tables/NewTable";
import Seating from "../Seating/Seating";
import Search from "../Search/Search";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

function Routes() {
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservation date={today()} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTable />
      </Route>
      <Route exact={true} path={`/search`}>
        <Search />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;