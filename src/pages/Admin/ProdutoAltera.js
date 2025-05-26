import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import LoadingButton from "../../components/LoadingButton";

const ProdutoAltera = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prod } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(prod ? prod.nome : "");
  const [quantidade, setQuantidade] = useState(prod ? prod.quantidade : "");
  const [preco, setPreco] = useState(prod ? prod.preco : "");
  const [categoria, setCategoria] = useState(prod ? prod.categoria : "");
  const [descricao, setDescricao] = useState(prod ? prod.descricao : "");
  const [imagem, setImagem] = useState(prod ? prod.imagem : "");
  const [categorias, setCategorias] = useState([]);

  const buscaCategorias = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categorias");
      console.log(response, "response");
      setCategorias(response.data);
    } catch (e) {
      console.log("Erro ao buscar categorias: ", e);
      alert("Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  };

  const atualizaOuCriaProduto = async () => {
    if (!nome || !quantidade || !preco || !categoria || !descricao || !imagem) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      if (prod) {
        await api.put("/produtos", {
          id: prod._id,
          nome,
          quantidade,
          preco,
          categoria,
          descricao,
          imagem,
        });
      } else {
        await api.post("/produtos", {
          nome,
          quantidade,
          preco,
          categoria,
          descricao,
          imagem,
        });
      }

      navigate("/admin/produtos");
      alert("Produto criado/alterado com sucesso!");
    } catch (e) {
      console.log("Erro ao atualizar/criar produto: ", e);
      alert("Erro ao atualizar/criar produto");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    fontSize: "16px",
    marginBottom: "16px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "8px",
      padding: "4px",
      marginBottom: "16px",
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#4CAF50" : "transparent",
      color: "white",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(0,0,0,0.9)",
      borderRadius: "8px",
      marginTop: "4px",
      marginBottom: "16px",
      zIndex: 999,
    }),
  };

  const categoriaOptions = categorias.map((cat) => ({
    value: cat.nome,
    label: cat.nome,
  }));

  useEffect(() => {
    buscaCategorias();
  }, []);

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
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1
          style={{
            marginBottom: 30,
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontWeight: 600,
          }}
        >
          {prod?.nome ? `Editar produto: ${prod.nome}` : "Novo produto"}
        </h1>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          style={inputStyle}
        />
        <Select
          value={categoriaOptions.find((opt) => opt.value === categoria)}
          onChange={(selected) => setCategoria(selected?.value || "")}
          options={categoriaOptions}
          styles={customStyles}
          placeholder="Selecione uma categoria"
          isSearchable={false}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{
            ...inputStyle,
            minHeight: "100px",
            resize: "vertical",
          }}
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={atualizaOuCriaProduto}
          disabled={loading}
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
            opacity: loading ? 0.6 : 1,
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.background = "#45A049";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.background = "#4CAF50";
          }}
        >
          {prod ? "Salvar alterações" : "Criar produto"}
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
          onClick={() => navigate("/admin/produtos")}
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

export default ProdutoAltera;
