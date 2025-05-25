import { useState } from "react";
import Header from "../../components/Header";

const mockCategorias = [
  { _id: "cat1", usuario: "user1", nome: "Eletrônicos" },
  { _id: "cat2", usuario: "user1", nome: "Roupas" },
];

const mockProdutos = [
  {
    _id: "prod1",
    usuario: "user1",
    nome: "Smartphone",
    quantidade: 10,
    preco: 1500,
    categoria: "Eletrônicos",
    descricao: "Um ótimo smartphone",
    imagem: "https://via.placeholder.com/80",
    __v: 0,
  },
  {
    _id: "prod2",
    usuario: "user1",
    nome: "Camiseta",
    quantidade: 30,
    preco: 50,
    categoria: "Roupas",
    descricao: "Camiseta 100% algodão",
    imagem: "https://via.placeholder.com/80",
    __v: 0,
  },
];

const mockVendas = [
  {
    _id: "venda1",
    usuario: "user1",
    nomeCliente: "João Silva",
    data: "2025-05-25",
    produtos: [
      { nome: "Smartphone", quantidade: 1, preco: 1500 },
      { nome: "Camiseta", quantidade: 2, preco: 50 },
    ],
  },
  {
    _id: "venda2",
    usuario: "user2",
    nomeCliente: "Maria Souza",
    data: "2025-05-23",
    produtos: [{ nome: "Smartphone", quantidade: 1, preco: 1500 }],
  },
];

const Dashboard = () => {
  const [tab, setTab] = useState("categorias");
  const [categorias, setCategorias] = useState(mockCategorias);
  const [produtos, setProdutos] = useState(mockProdutos);
  const [vendas] = useState(mockVendas);

  const [novaCategoriaNome, setNovaCategoriaNome] = useState("");
  const [editCategoriaId, setEditCategoriaId] = useState(null);

  const addCategoria = () => {
    if (!novaCategoriaNome.trim()) return alert("Nome obrigatório");
    if (editCategoriaId) {
      setCategorias((cats) =>
        cats.map((c) =>
          c._id === editCategoriaId ? { ...c, nome: novaCategoriaNome } : c
        )
      );
      setEditCategoriaId(null);
    } else {
      setCategorias((cats) => [
        ...cats,
        {
          _id: Date.now().toString(),
          usuario: "user1",
          nome: novaCategoriaNome,
        },
      ]);
    }
    setNovaCategoriaNome("");
  };

  const editCategoria = (cat) => {
    setEditCategoriaId(cat._id);
    setNovaCategoriaNome(cat.nome);
  };

  const deleteCategoria = (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta categoria?")) {
      setCategorias((cats) => cats.filter((c) => c._id !== id));
    }
  };

  const buttonStyle = {
    cursor: "pointer",
    borderRadius: 6,
    border: "none",
    padding: "10px 18px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
      className="container-3"
    >
      <Header />
      <h1 style={{ marginBottom: 30, textAlign: "center", color: "#222" }}>
        Painel Administrativo
      </h1>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 32,
          userSelect: "none",
        }}
      >
        {["categorias", "produtos", "vendas"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...buttonStyle,
              backgroundColor: tab === t ? "#2F80ED" : "#E0E0E0",
              color: tab === t ? "white" : "#555",
              boxShadow: tab === t ? "0 4px 8px rgba(47,128,237,0.3)" : "none",
              minWidth: 120,
              fontSize: 16,
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      {tab === "categorias" && (
        <section>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Nome da categoria"
              value={novaCategoriaNome}
              onChange={(e) => setNovaCategoriaNome(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                width: 280,
                fontSize: 16,
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2F80ED")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            <button
              onClick={addCategoria}
              style={{
                ...buttonStyle,
                backgroundColor: "#2F80ED",
                color: "white",
                boxShadow: "0 4px 8px rgba(47,128,237,0.3)",
                minWidth: 120,
              }}
            >
              {editCategoriaId ? "Salvar" : "Adicionar"}
            </button>
            {editCategoriaId && (
              <button
                onClick={() => {
                  setEditCategoriaId(null);
                  setNovaCategoriaNome("");
                }}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#EB5757",
                  color: "white",
                  minWidth: 120,
                }}
              >
                Cancelar
              </button>
            )}
          </div>

          <div
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: 10,
              overflowX: "auto",
              backgroundColor: "white",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 600,
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#F2F7FF",
                    textAlign: "left",
                    fontWeight: "700",
                    color: "#2F80ED",
                  }}
                >
                  <th style={{ padding: "14px 20px" }}>Nome</th>
                  <th style={{ padding: "14px 20px" }}>Usuário</th>
                  <th style={{ padding: "14px 20px" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr
                    key={cat._id}
                    style={{
                      borderBottom: "1px solid #eee",
                      cursor: "default",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f9f9f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <td style={{ padding: "12px 20px" }}>{cat.nome}</td>
                    <td style={{ padding: "12px 20px", color: "#666" }}>
                      {cat.usuario}
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <button
                        onClick={() => editCategoria(cat)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#56CCF2",
                          color: "white",
                          marginRight: 10,
                          padding: "6px 14px",
                          fontWeight: "600",
                          fontSize: 14,
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteCategoria(cat._id)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#EB5757",
                          color: "white",
                          padding: "6px 14px",
                          fontWeight: "600",
                          fontSize: 14,
                        }}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
                {categorias.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        padding: 20,
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      Nenhuma categoria encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "produtos" && (
        <section>
          <h2
            style={{
              color: "#2F80ED",
              marginBottom: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Produtos Cadastrados
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {produtos.map((prod) => (
              <div
                key={prod._id}
                style={{
                  boxShadow: "0 4px 15px rgba(47,128,237,0.15)",
                  borderRadius: 14,
                  padding: 20,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <img
                  src={prod.imagem}
                  alt={prod.nome}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />
                <h3 style={{ marginBottom: 8 }}>{prod.nome}</h3>
                <p
                  style={{ fontWeight: "600", marginBottom: 6, color: "#333" }}
                >
                  Categoria: {prod.categoria}
                </p>
                <p style={{ marginBottom: 6, color: "#555" }}>
                  {prod.descricao}
                </p>
                <p
                  style={{
                    fontWeight: "700",
                    marginBottom: 6,
                    color: "#2F80ED",
                  }}
                >
                  R$ {prod.preco.toFixed(2)}
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    color: prod.quantidade > 0 ? "#27AE60" : "#EB5757",
                  }}
                >
                  {prod.quantidade}{" "}
                  {prod.quantidade === 1 ? "unidade" : "unidades"} disponível
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "vendas" && (
        <section>
          <h2
            style={{
              color: "#2F80ED",
              marginBottom: 20,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Vendas Realizadas
          </h2>
          <div
            style={{
              overflowX: "auto",
              boxShadow: "0 0 12px rgba(0,0,0,0.1)",
              borderRadius: 10,
              backgroundColor: "white",
              padding: 16,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 700,
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#F2F7FF",
                    color: "#2F80ED",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "12px 18px" }}>Cliente</th>
                  <th style={{ padding: "12px 18px" }}>Data</th>
                  <th style={{ padding: "12px 18px" }}>Produtos</th>
                  <th style={{ padding: "12px 18px" }}>Total (R$)</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => {
                  const total = venda.produtos.reduce(
                    (acc, p) => acc + p.preco * p.quantidade,
                    0
                  );
                  return (
                    <tr
                      key={venda._id}
                      style={{
                        borderBottom: "1px solid #eee",
                        transition: "background-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f9f9f9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <td style={{ padding: "12px 18px" }}>
                        {venda.nomeCliente}
                      </td>
                      <td style={{ padding: "12px 18px" }}>{venda.data}</td>
                      <td style={{ padding: "12px 18px" }}>
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                          {venda.produtos.map((p, i) => (
                            <li key={i}>
                              {p.nome} x {p.quantidade} = R${p.preco.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td
                        style={{
                          padding: "12px 18px",
                          fontWeight: "700",
                          color: "#27AE60",
                        }}
                      >
                        R${total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
                {vendas.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 20,
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      Nenhuma venda encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
