import { Navigate, Route, Routes as Switch } from "react-router-dom";
import AdminLogin from "../pages/adminLogin";
import ErrorPage from "../pages/errorPage";
import ImgToPdf from "../pages/imgToPdf";
import Intro from "../pages/intro";
import LoginPage from "../pages/login";
import { UserData, selectUserData } from "../store/generalSlice";
import { useAppSelector } from "../store/hooks";

function Routes() {
  const userData = useAppSelector(selectUserData) as UserData;
  const userTypeExists = userData ? Boolean(userData.type) : false;

  return (
    <Switch>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      {userTypeExists && <Route path="/images-to-pdf" element={<ImgToPdf />} />}
      <Route
        path="*"
        element={
          userTypeExists ? <ErrorPage /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Switch>
  );
}

export default Routes;
