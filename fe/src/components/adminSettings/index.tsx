import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";

import "./AdminSettings.css";
import AppLock from "./appLock";
import MaxLimit from "./maxLimit";

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
            <MaxLimit />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default AdminSettings;
