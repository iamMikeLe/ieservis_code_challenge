import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import ImgToPdf from "./pages/imgToPdf";
import LoginPage from "./pages/login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/images-to-pdf",
    element: <ImgToPdf />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
