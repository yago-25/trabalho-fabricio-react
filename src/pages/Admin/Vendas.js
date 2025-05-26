import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { api } from "../../services/api";
import LoadingButton from "../../components/LoadingButton";
import { useNavigate } from "react-router-dom";

const Vendas = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingDeletar, setLoadingDeletar] = useState(false);
  const [vendas, setVendas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const vendasPorPagina = 4;
  const totalPages = Math.ceil(vendas.length / vendasPorPagina);

  const buscaVendas = async () => {
    setLoading(true);
    try {
      const response = await api.get("/venda");
      setVendas(response.data);
    } catch (e) {
      console.log("Erro ao buscar vendas: ", e);
      alert("Erro ao buscar vendas");
    } finally {
      setLoading(false);
    }
  };

  const removeVenda = async (idVenda) => {
    setLoadingDeletar(true);
    try {
      await api.delete("/venda", {
        data: { id: idVenda },
      });

      buscaVendas();
      alert("Venda deletada com sucesso!");
    } catch (e) {
      console.log("Erro ao deletar venda: ", e);
      alert("Erro ao deletar venda");
    } finally {
      setLoadingDeletar(false);
    }
  };

  useEffect(() => {
    buscaVendas();
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
      <h1
        style={{
          marginBottom: 30,
          textAlign: "center",
          color: "white",
          fontSize: "40px",
        }}
      >
        Vendas
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 3fr 1fr 1fr 1fr auto",
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
          Data da venda
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Cliente
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Produto(s)
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
          Preço
        </div>
        <div
          style={{
            padding: "16px",
            fontWeight: "600",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Usuário
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

        {vendas
          ?.slice(
            (currentPage - 1) * vendasPorPagina,
            currentPage * vendasPorPagina
          )
          .map((v) => (
            <React.Fragment key={v._id}>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {new Date(v.data).toLocaleDateString("pt-BR")}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {v.nomeCliente || "—"}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {v.produtos.map((p, i) => (
                  <div key={i}>
                    {`- ${p.nome} (${p.pivot?.quantidade ?? p.quantidade}x R$${(
                      p.pivot?.preco_unitario ?? p.preco
                    ).toFixed(2)})`}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {v.produtos.reduce(
                  (total, p) => total + (p.pivot?.quantidade ?? p.quantidade),
                  0
                )}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                R${" "}
                {v.produtos
                  .reduce(
                    (total, p) =>
                      total +
                      (p.pivot?.quantidade ?? p.quantidade) *
                        (p.pivot?.preco_unitario ?? p.preco),
                    0
                  )
                  .toFixed(2)}
              </div>
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {v.usuario || "—"}
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
                  onClick={() => removeVenda(v._id)}
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

export default Vendas;
