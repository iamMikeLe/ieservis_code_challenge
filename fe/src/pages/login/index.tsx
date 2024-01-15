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

import { getMaintenanceStatus } from "../../API/userAPI";
import { loginValidation } from "../../Utils/loginValidation";
import pc from "../../assets/images/pc.jpg";
import Maintenance from "../../components/maintenance";
import {
  UserData,
  handleLoginAsync,
  selectMaintenance,
  selectUserData,
  setMaintenance,
} from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  isLoginLoading,
  selectLoginFormValues,
  setLoginForm,
} from "./loginSlice";

function LoginPage(): JSX.Element {
  const { email, password } = useAppSelector(selectLoginFormValues);
  const isUnderMaintenance = useAppSelector(selectMaintenance);
  const loading = useAppSelector(isLoginLoading);
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((userData as UserData)?.type === "user") {
      navigate("/images-to-pdf");
    }
  }, [userData, navigate]);

  useEffect(() => {
    getMaintenanceStatus().then((maintenance) =>
      dispatch(setMaintenance(maintenance))
    );
  }, [dispatch]);

  const handleLogin = () => {
    const isLoginValid = loginValidation(email, password);
    if (!isLoginValid) return;
    dispatch(handleLoginAsync({ email, password }));
  };

  return (
    <MDBContainer className="my-5" data-testid="login-page">
      {isUnderMaintenance && <Maintenance />}
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
                Sign into your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                disabled={isUnderMaintenance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    setLoginForm({ key: "email", value: e.target.value })
                  )
                }
                data-testid="email-input"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                size="lg"
                value={password}
                disabled={isUnderMaintenance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    setLoginForm({ key: "password", value: e.target.value })
                  )
                }
                data-testid="password-input"
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                disabled={loading || isUnderMaintenance}
                onClick={handleLogin}
                data-testid="login-button"
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

export default LoginPage;
