import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import { api } from "./../../services/api";
import LoadingButton from "../../components/LoadingButton";

const CategoriaAltera = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { cat } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(cat ? cat.nome : "");

  const atualizaOuCriaCategoria = async () => {
    if (!nome) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      if (cat) {
        await api.put("/categorias", {
          id: cat._id,
          nome_categoria: nome,
        });
      } else {
        await api.post("/categorias", {
          nome_categoria: nome,
        });
      }

      navigate("/admin/categorias");
      alert("Categoria criada/alterada com sucesso!");
    } catch (e) {
      console.log("Erro ao atualizar/criar categoria: ", e);
      alert("Erro ao atualizar/criar categoria");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="container-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          fontSize: "50px",
        }}
      >
        <LoadingButton />
      </div>
    );
  }

  return (
    <div className="container-3">
      <Header />
      <div style={{ maxWidth: 600, margin: "0 auto", paddingTop: 40 }}>
        <h1
          style={{
            marginBottom: 30,
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontWeight: 600,
          }}
        >
          {cat?.nome ? `Editar categoria: ${cat.nome}` : "Nova categoria"}
        </h1>

        <input
          type="text"
          placeholder="Insira o nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            fontSize: "16px",
            marginBottom: "20px",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,0.5)")
          }
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
        />

        <button
          onClick={atualizaOuCriaCategoria}
          style={{
            width: "100%",
            padding: "14px",
            background: "#4CAF50",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            color: "white",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#45A049")}
          onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
        >
          {cat ? "Salvar alterações" : "Criar categoria"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <button
          onClick={() => navigate("/admin/categorias")}
          style={{
            padding: "8px 12px",
            margin: "0 5px",
            borderRadius: "6px",
            backgroundColor: "#2F80ED",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default CategoriaAltera;
