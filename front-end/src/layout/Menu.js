import React from "react";
import logo from '../resources/pt_logo.svg';

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
          <div className ='logoNav'>
            <img className ='logo' src={logo}></img>
            <span>Periodic Tables</span>
          </div>
        </Link>

        <div className='options'>
          
            <Link to="/dashboard">
              <div className = 'navButton'>
              <span className ='icon'>done</span>
              Dashboard
              </div>
            </Link>
          
          
            <Link to="/search">
            <div className = 'navButton'>
            <span className ='icon'>search</span>
              Search
            </div>
            </Link>
          
          
            <Link to="/reservations/new">
            <div className = 'navButton'>
            <span className ='icon'>person_add</span>
              New Reservation
            </div>
            </Link>
          
          
            <Link to="/tables/new">
            <div className = 'navButton'>
            <span className ='icon'>event_seat</span>
              New Table
            </div>
            </Link>
          
        </div>

      </div>
    </nav>
  );
}

export default Menu;
