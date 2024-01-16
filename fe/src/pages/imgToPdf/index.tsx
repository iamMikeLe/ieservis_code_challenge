import AdminSettings from "../../components/adminSettings";
import Convertor from "../../components/convertor";
import { UserData, selectUserData } from "../../store/generalSlice";
import { useAppSelector } from "../../store/hooks";
import "./ImgToPdf.css";

function ImgToPdf(): JSX.Element {
  const userData = useAppSelector<UserData | null>(selectUserData);

  return (
    <div data-testid="img-to-pdf-page">
      {userData?.type === "admin" && <AdminSettings />}

      <Convertor />
    </div>
  );
}

export default ImgToPdf;
