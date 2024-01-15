import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

import AdminSettings from "../../components/adminSettings";
import "./ImgToPdf.css";

function ImgToPdf(): JSX.Element {
  return (
    <div data-testid="img-to-pdf-page">
      <AdminSettings />

      <MDBCard className="convertor-box">
        <MDBCardBody>
          <h6>Upload section</h6>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default ImgToPdf;
