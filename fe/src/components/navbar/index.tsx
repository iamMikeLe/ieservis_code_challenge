import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function App() {
  const [openNavText, setOpenNavText] = useState(false);

  const routes = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/admin/login", name: "Admin" },
    { path: "/images-to-pdf", name: "Converter" },
  ];

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <Link className="navbar-brand" to="/">
          Code Challenge
        </Link>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNavText(!openNavText)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavText}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            {routes.map((route) => (
              <MDBNavbarItem key={route.path}>
                <NavLink className="nav-link" to={route.path}>
                  {route.name}
                </NavLink>
              </MDBNavbarItem>
            ))}
          </MDBNavbarNav>
          <div className="nav-link" onClick={() => console.log("logout")}>
            logout
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
