import { Navigate, Route, Routes as Switch } from "react-router-dom";
import ErrorPage from "../pages/errorPage";
import ImgToPdf from "../pages/imgToPdf";
import LoginPage from "../pages/login";

function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/images-to-pdf" element={<ImgToPdf />} />
      <Route path="*" element={<ErrorPage />} />
    </Switch>
  );
}

export default Routes;
