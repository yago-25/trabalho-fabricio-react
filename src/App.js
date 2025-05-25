import { Route, Routes } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Painel from "./pages/Admin/Painel";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/painel" element={<Painel />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
