import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

import AdminSettings from "../../components/adminSettings";
import { UserData, selectUserData } from "../../store/generalSlice";
import { useAppSelector } from "../../store/hooks";
import "./ImgToPdf.css";

function ImgToPdf(): JSX.Element {
  const userData = useAppSelector<UserData | null>(selectUserData);

  return (
    <div data-testid="img-to-pdf-page">
      {userData?.type === "admin" && <AdminSettings />}

      <MDBCard className="convertor-box">
        <MDBCardBody>
          <h6>Upload section</h6>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default ImgToPdf;
