import axios from "axios";
import { MDBCard, MDBCardBody, MDBCheckbox } from "mdb-react-ui-kit";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { selectMaintenance, setMaintenance } from "../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/maintenance`,
        {
          isUnderMaintenance: !isUnderMaintenance,
        }
      );

      dispatch(setMaintenance(response.data.isUnderMaintenance));
    } catch (error) {
      toast.error("Error while updating maintenance mode");
    } finally {
      clearTimeout(timeoutId);
      toast.dismiss(toastId);
      setLoading(false);
    }
  }, [dispatch, isUnderMaintenance]);

  return (
    <MDBCard className="convertor-box">
      <MDBCardBody>
        <h6>Admin app settings</h6>
        <MDBCheckbox
          disabled={loading}
          id="controlledCheckbox"
          label="Lock app - put it in maintenance mode (users can't login)"
          checked={isUnderMaintenance}
          onChange={handleCheckboxChange}
        />
      </MDBCardBody>
    </MDBCard>
  );
}

export default AdminSettings;
