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
import { clearUserData, selectUserData } from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function App() {
  const [openNavText, setOpenNavText] = useState(false);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const routes = [
    { path: "/", name: "Home", permitted: true, testId: "home-nav" },
    {
      path: "/login",
      name: "Login",
      permitted: !userData,
      testId: "login-nav",
    },
    {
      path: "/admin/login",
      name: "Admin",
      permitted: !userData,
      testId: "admin-login-nav",
    },
    {
      path: "/images-to-pdf",
      name: "Converter",
      permitted: !!userData,
      testId: "converter-nav",
    },
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
            {routes.map(
              (route) =>
                route.permitted && (
                  <MDBNavbarItem key={route.path}>
                    <NavLink
                      data-testid={route.testId}
                      className="nav-link"
                      to={route.path}
                    >
                      {route.name}
                    </NavLink>
                  </MDBNavbarItem>
                )
            )}
          </MDBNavbarNav>
          {userData && (
            <div
              className="nav-link"
              onClick={() => dispatch(clearUserData())}
              data-testid="logout"
            >
              logout
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
