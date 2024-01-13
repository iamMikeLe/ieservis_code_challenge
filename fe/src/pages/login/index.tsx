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

import pc from "../../assets/images/pc.jpg";
import {
  UserData,
  handleLoginAsync,
  selectUserData,
} from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./Login.css";
import { selectLoginFormValues, setMealForm } from "./loginSlice";

function LoginPage(): JSX.Element {
  const { email, password } = useAppSelector(selectLoginFormValues);
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ((userData as UserData)?.type === "user") {
      navigate("/images-to-pdf");
    }
  }, [userData, navigate]);

  return (
    <MDBContainer className="my-5" data-testid="login-page">
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setMealForm({ key: "email", value: e.target.value }))
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
                    setMealForm({ key: "password", value: e.target.value })
                  )
                }
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={() => dispatch(handleLoginAsync({ email, password }))}
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
