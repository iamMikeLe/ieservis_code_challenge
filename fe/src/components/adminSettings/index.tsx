import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

import "./AdminSettings.css";
import AppLock from "./appLock";

function AdminSettings(): JSX.Element {
  return (
    <MDBCard className="convertor-box" data-testid="admin-settings">
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="12" className="admin-settings-title">
            <h5>Admin app settings</h5>
            <hr />
          </MDBCol>
          <MDBCol md="6">
            <AppLock />
          </MDBCol>
          <MDBCol md="6">
            <h6>Set max allowed images to be uploaded</h6>
            <MDBInput label="Max images" id="typeNumber" type="number" />
            <MDBBtn style={{ marginTop: "0.5rem" }}>Submit</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default AdminSettings;
