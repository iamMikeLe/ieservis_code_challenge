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
            <MDBNavbarItem>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink className="nav-link" to="/admin/login">
                Admin
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink className="nav-link" to="/images-to-pdf">
                Converter
              </NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <div className="nav-link" onClick={() => console.log("logout")}>
            logout
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
