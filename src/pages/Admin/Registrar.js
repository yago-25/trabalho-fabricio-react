import { Link, useNavigate } from "react-router-dom";
import ButtonAplication from "../../components/ButtonApplication";
import "./../../styles/Admin/Painel.css";
import { useState } from "react";
import { api } from "../../services/api";
import LoadingButton from "../../components/LoadingButton";

const Registrar = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const registrar = async () => {
    if (!usuario || !senha || !confirmaSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("Senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/registrar", {
        usuario,
        senha,
        confirma: confirmaSenha,
      });

      const id = response.data.id;

      if (id) {
        alert("Usuário registrado com sucesso! Faça seu login.");
        navigate("/painel");
      }
    } catch (e) {
      alert("Erro ao fazer cadastro");
      console.log("Erro ao fazer cadastro: ", e);
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
        <label>
          Confirmar senha
          <input
            type="password"
            placeholder="Insira sua senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
        </label>
        <div className="botoes">
          <ButtonAplication
            text={!loading ? "Registrar" : <LoadingButton />}
            onClick={registrar}
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

export default Registrar;
