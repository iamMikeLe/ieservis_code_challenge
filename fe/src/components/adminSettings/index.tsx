import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { updateMaintenanceMode } from "../../API/userAPI";
import { selectMaintenance, setMaintenance } from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./AdminSettings.css";

function AdminSettings(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const isUnderMaintenance = useAppSelector(selectMaintenance);
  const dispatch = useAppDispatch();

  const handleCheckboxChange = useCallback(async () => {
    setLoading(true);
    let toastId: string | undefined;

    const timeoutId = setTimeout(() => {
      toastId = toast.loading("Updating maintenance mode");
    }, 500);

    try {
      const newMaintenanceMode = await updateMaintenanceMode(
        isUnderMaintenance
      );
      dispatch(setMaintenance(newMaintenanceMode));
    } catch (error) {
      toast.error("Error while updating maintenance mode");
    } finally {
      clearTimeout(timeoutId);
      toast.dismiss(toastId);
      setLoading(false);
    }
  }, [dispatch, isUnderMaintenance]);

  return (
    <MDBCard className="convertor-box" data-testid="admin-settings">
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="12" className="admin-settings-title">
            <h5>Admin app settings</h5>
            <hr />
          </MDBCol>
          <MDBCol md="6">
            <h6>App lock</h6>
            <MDBCheckbox
              disabled={loading}
              id="controlledCheckbox"
              label="Turn on/off maintenance mode (users can't login)"
              checked={isUnderMaintenance}
              onChange={handleCheckboxChange}
            />
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
