import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import './style.css'

function Layout() {
  return (
    <div>
      <div>
        <div>
          <Menu />
        </div>
        <div className="websiteContent">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
