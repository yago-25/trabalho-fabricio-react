/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { api } from "../../services/api";
import LoadingButton from "../../components/LoadingButton";
import { useNavigate } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";

const Produtos = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");

  const [loading, setLoading] = useState(false);
  const [loadingDeletar, setLoadingDeletar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const produtosPorPagina = 3;
  const totalPages = Math.ceil(produtos.length / produtosPorPagina);

  const buscaProdutos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/produtos/${usuario}`);
      setProdutos(response.data);
    } catch (e) {
      console.log("Erro ao buscar produtos: ", e);
      alert("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  };

  const removeProduto = async (idProduto) => {
    setLoadingDeletar(true);

    try {
      await api.delete("/produtos", {
        data: { id: idProduto },
      });

      buscaProdutos();
      alert("Produto deletado com sucesso");
    } catch (e) {
      console.log("Erro ao deletar produto: ", e);
      alert("Erro ao deletar produto");
    } finally {
      setLoadingDeletar(false);
    }
  };

  useEffect(() => {
    buscaProdutos();
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px",
        }}
      >
        <h1
          style={{
            marginBottom: 30,
            textAlign: "center",
            color: "white",
            fontSize: "40px",
          }}
        >
          Produtos
        </h1>
        <FiPlusSquare
          style={{
            color: "white",
            width: "44px",
            height: "44px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/produtos/alterar")}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr auto",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Nome
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Descrição
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Categoria
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Preço
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Quantidade
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Imagem
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            textAlign: "right",
          }}
        >
          Ações
        </div>

        {produtos
          .slice(
            (currentPage - 1) * produtosPorPagina,
            currentPage * produtosPorPagina
          )
          .map((prod) => (
            <React.Fragment key={prod._id}>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {prod.nome}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {prod.descricao}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {prod.categoria}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {prod.preco}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {prod.quantidade}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <img
                  src={prod.imagem}
                  alt={prod.nome}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "right",
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    color: "#ffd700",
                    border: "1px solid #ffd700",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    marginRight: "10px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#ffd70020")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() =>
                    navigate("/admin/produtos/alterar", { state: { prod } })
                  }
                >
                  {loadingDeletar ? <LoadingButton /> : "Editar"}
                </button>
                <button
                  style={{
                    background: "transparent",
                    color: "#ff4d4f",
                    border: "1px solid #ff4d4f",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#ff4d4f20")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => removeProduto(prod._id)}
                >
                  {loadingDeletar ? <LoadingButton /> : "Excluir"}
                </button>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "8px 12px",
            margin: "0 5px",
            borderRadius: "6px",
            backgroundColor: "#ffffff22",
            color: "white",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              padding: "8px 12px",
              margin: "0 5px",
              borderRadius: "6px",
              backgroundColor:
                currentPage === index + 1 ? "#ffffff44" : "#ffffff22",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 12px",
            margin: "0 5px",
            borderRadius: "6px",
            backgroundColor: "#ffffff22",
            color: "white",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Próximo
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
          onClick={() => navigate("/dashboard")}
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

export default Produtos;
