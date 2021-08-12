import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

function Layout() {
  return (
    <div>
      <div>
        <div>
          <Menu />
        </div>
        <div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
