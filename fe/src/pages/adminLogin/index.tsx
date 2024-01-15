import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginValidation } from "../../Utils/loginValidation";
import pc from "../../assets/images/pc.jpg";
import {
  UserData,
  handleLoginAsync,
  selectUserData,
} from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  isAdminLoginLoading,
  selectAdminLoginFormValues,
  setAdminLoginForm,
} from "./adminLoginSlice";

function AdminLogin(): JSX.Element {
  const { email, password } = useAppSelector(selectAdminLoginFormValues);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const loading = useAppSelector(isAdminLoginLoading);

  useEffect(() => {
    if ((userData as UserData)?.type === "admin") {
      navigate("/images-to-pdf");
    }
  }, [userData, navigate]);

  const handleLogin = () => {
    const isLoginValid = loginValidation(email, password);
    if (!isLoginValid) return;
    dispatch(handleLoginAsync({ email, password, type: "admin" }));
  };

  return (
    <MDBContainer className="my-5" data-testid="admin-login">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={pc}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Admin login
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    setAdminLoginForm({ key: "email", value: e.target.value })
                  )
                }
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    setAdminLoginForm({
                      key: "password",
                      value: e.target.value,
                    })
                  )
                }
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                disabled={loading}
                onClick={handleLogin}
              >
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default AdminLogin;
