import { useState } from "react";
import { api, usuario } from "../services/api";
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";

const Cart = ({ carrinho, onRemoveItem }) => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [pagamento, setPagamento] = useState("pix");
  const [loading, setLoading] = useState(false);

  const confirmarCompra = async () => {
    if (!nome.trim()) {
      alert("Por favor, insira seu nome.");
      return;
    }

    if (!pagamento) {
      alert("Por favor, insira o método de pagamento.");
      return;
    }

    setLoading(true);
    try {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      const resumoProdutos = Object.values(
        carrinho.reduce((acc, item) => {
          if (!acc[item.nome]) {
            acc[item.nome] = {
              nome: item.nome,
              preco: item.preco,
              quantidade: 0,
            };
          }
          acc[item.nome].quantidade += item.quantidade;
          return acc;
        }, {})
      );

      const resumo = {
        nomeCliente: nome,
        usuario: usuario,
        data: formattedDate,
        produtos: resumoProdutos,
      };

      await api.post("/venda", {
        nomeCliente: nome,
        usuario: usuario,
        data: formattedDate,
        produtos: resumoProdutos,
      });

      navigate("/agradecimento", { state: resumo });
      alert("Compra confirmada com sucesso!");
    } catch (e) {
      console.log("Erro ao finalizar venda: ", e);
      alert("Erro ao finalizar venda");
    } finally {
      setLoading(false);
    }
  };

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

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
    <div
      style={{
        width: "100%",
        maxWidth: "480px",
        height: "100vh",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 999,
        padding: "32px",
        overflowY: "auto",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Seu Carrinho
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#6B7280",
            marginBottom: "16px",
          }}
        >
          {carrinho.length} {carrinho.length === 1 ? "item" : "itens"}
        </p>
      </header>

      <div style={{ flex: 1 }}>
        {carrinho.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "#6B7280",
              backgroundColor: "#F9FAFB",
              borderRadius: "12px",
              margin: "24px 0",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                marginBottom: "12px",
                display: "block",
              }}
            >
              🛒
            </span>
            <p style={{ fontWeight: 500 }}>Seu carrinho está vazio</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Adicione produtos para continuar
            </p>
          </div>
        )}

        <div style={{ marginBottom: "32px" }}>
          {carrinho.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
                padding: "16px",
                backgroundColor: "#F9FAFB",
                borderRadius: "12px",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={item.imagem}
                alt={item.nome}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginRight: "16px",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    marginBottom: "4px",
                    color: "#111827",
                  }}
                >
                  {item.nome}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#059669",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{item.quantidade}x</span>
                  <span>•</span>
                  <span>{item.categoria}</span>
                </div>
              </div>

              <button
                onClick={() => onRemoveItem(item._id)}
                style={{
                  backgroundColor: "#FEE2E2",
                  border: "none",
                  color: "#DC2626",
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  marginLeft: "12px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#FCA5A5";
                  e.currentTarget.style.color = "#B91C1C";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEE2E2";
                  e.currentTarget.style.color = "#DC2626";
                }}
                aria-label={`Remover ${item.nome} do carrinho`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          paddingTop: "24px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            padding: "16px",
            backgroundColor: "#F9FAFB",
            borderRadius: "12px",
          }}
        >
          <span style={{ fontWeight: 500, color: "#374151" }}>Total</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#059669",
            }}
          >
            R$ {total.toFixed(2)}
          </span>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            Nome do comprador
          </label>
          <input
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              outline: "none",
              fontSize: "15px",
              transition: "border-color 0.2s, box-shadow 0.2s",
              color: "#111827",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3B82F6";
              e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E5E7EB";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            Forma de pagamento
          </label>
          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              fontSize: "15px",
              backgroundColor: "#fff",
              color: "#111827",
              cursor: "pointer",
              appearance: "none",
              backgroundImage:
                "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              backgroundSize: "12px auto",
            }}
          >
            <option value="pix">Pix</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
        </div>

        <button
          onClick={confirmarCompra}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "#059669",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#047857";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#059669";
            e.currentTarget.style.transform = "none";
          }}
          disabled={carrinho.length === 0}
        >
          {carrinho.length === 0 ? "Carrinho Vazio" : "Confirmar Compra"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
