import { Route, Routes } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Painel from "./pages/Admin/Painel";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import Categorias from "./pages/Admin/Categorias";
import Produtos from "./pages/Admin/Produtos";
import Vendas from "./pages/Admin/Vendas";
import CategoriaAltera from "./pages/Admin/CategoriaAltera";
import ProdutoAltera from "./pages/Admin/ProdutoAltera";
import Agradecimento from "./pages/Agradecimento";
import Registrar from "./pages/Admin/Registrar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/home" element={<Home />} />
      <Route path="/agradecimento" element={<Agradecimento />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/categorias"
        element={
          <PrivateRoute>
            <Categorias />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/categorias/alterar"
        element={
          <PrivateRoute>
            <CategoriaAltera />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/produtos"
        element={
          <PrivateRoute>
            <Produtos />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/produtos/alterar"
        element={
          <PrivateRoute>
            <ProdutoAltera />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/vendas"
        element={
          <PrivateRoute>
            <Vendas />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
