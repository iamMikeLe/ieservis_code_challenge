import { MDBCheckbox } from "mdb-react-ui-kit";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { updateMaintenanceMode } from "../../../API/userAPI";
import { selectMaintenance, setMaintenance } from "../../../store/generalSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

function AppLock(): JSX.Element {
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
    <>
      <h6>App lock</h6>
      <MDBCheckbox
        disabled={loading}
        id="controlledCheckbox"
        label="Turn on/off maintenance mode (users can't login)"
        checked={isUnderMaintenance}
        onChange={handleCheckboxChange}
      />
    </>
  );
}

export default AppLock;
