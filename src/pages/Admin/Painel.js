import { Link, useNavigate } from "react-router-dom";
import ButtonAplication from "../../components/ButtonApplication";
import "./../../styles/Admin/Painel.css";
import { useState } from "react";
import { api } from "../../services/api";
import LoadingButton from "../../components/LoadingButton";

const Painel = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!usuario || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/login", {
        usuario,
        senha,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        navigate("/dashboard");
      }
    } catch (e) {
      alert("Erro ao fazer login");
      console.log("Erro ao fazer login: ", e);
    }
  };

  return (
    <div className="container-2">
      <div className="container-login">
        <label>
          Usuário
          <input
            type="text"
            placeholder="Insira seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            placeholder="Insira sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <div className="botoes">
          <ButtonAplication
            text={!loading ? "Entrar" : <LoadingButton />}
            onClick={login}
            disabled={loading}
          />
          <ButtonAplication
            text={!loading ? "Registrar" : <LoadingButton />}
            disabled={loading}
          />
        </div>

        <Link to="/" className="back-button">
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default Painel;
