import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav>
      <div>
        <Link to="/" >
          <div>
            <span>Periodic Tables</span>
          </div>
        </Link>
        <ul>
          <li >
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/search">
              Search
            </Link>
          </li>
          <li>
            <Link to="/reservations/new">
              New Reservation
            </Link>
          </li>
          <li>
            <Link to="/tables/new">
              New Table
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Menu;
