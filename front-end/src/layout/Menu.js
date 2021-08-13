import React from "react";
import logo from '../resources/pt_logo.svg';
import pt from '../resources/pt.jpg';
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <>
    <div className='title'>
      <div>
        <Link to="/" >
          <div className ='logoNav'>
            <img className ='logo' src={logo}></img>
            <span>Periodic Tables</span>
          </div>
        </Link>
        </div>
      </div>
        
        <div className='heroPhoto'></div>

        <nav>
          <div className='navLinks'>
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
        </nav>

      </>

  );
}

export default Menu;
