import { Toaster } from "react-hot-toast";

import "./App.css";
import Navbar from "./components/navbar";
import Routes from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
