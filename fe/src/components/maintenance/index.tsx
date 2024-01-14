import { MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";

import "./Maintenance.css";

function Maintenance(): JSX.Element {
  return (
    <MDBCard className="maintenance-notice" data-testid="maintenance">
      <MDBCardBody>
        <MDBCardText>
          Server under maintenance, please try logging in later
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Maintenance;
