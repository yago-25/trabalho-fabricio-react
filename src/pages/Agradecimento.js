import { useLocation, useNavigate } from "react-router-dom";

const Agradecimento = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const resumo = location.state || {};
  const total =
    resumo.produtos?.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    ) || 0;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "32px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "24px",
          backgroundColor: "#dde8ff",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#2563eb",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "white",
            fontSize: "32px",
          }}
        >
          ✓
        </div>
        <h1
          style={{
            fontWeight: 700,
            fontSize: "32px",
            marginBottom: "12px",
            color: "#2563eb",
          }}
        >
          Obrigado pela sua compra, {resumo.nomeCliente}!
        </h1>
        <p style={{ fontSize: "16px", color: "#374151" }}>
          Pedido realizado em <strong>{resumo.data}</strong>
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#F9FAFB",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "24px",
            color: "#111827",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              backgroundColor: "#E5E7EB",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🛍️
          </span>
          Resumo dos Produtos
        </h2>

        <div style={{ marginBottom: "24px" }}>
          {resumo.produtos?.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                padding: "16px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                transition: "transform 0.2s, box-shadow 0.2s",
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
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    marginBottom: "6px",
                    color: "#111827",
                  }}
                >
                  {item.nome}
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
                  <span>Quantidade: {item.quantidade}</span>
                  {item.categoria && (
                    <>
                      <span style={{ color: "#D1D5DB" }}>•</span>
                      <span>{item.categoria}</span>
                    </>
                  )}
                </div>
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#2563eb",
                  minWidth: "100px",
                  textAlign: "right",
                }}
              >
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
            padding: "16px 24px",
            backgroundColor: "#2563eb",
            borderRadius: "12px",
            color: "white",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 500 }}>
            Total do Pedido
          </span>
          <span style={{ fontSize: "20px", fontWeight: 700 }}>
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#6B7280",
          fontSize: "14px",
          marginTop: "32px",
          padding: "16px",
          backgroundColor: "#F9FAFB",
          borderRadius: "8px",
        }}
      >
        <p>
          Em caso de dúvidas sobre seu pedido, entre em contato com nosso
          suporte.
        </p>
        <p style={{ marginTop: "8px", color: "#2563eb", fontWeight: 500 }}>
          Agradecemos a preferência! 💙
        </p>
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
          onClick={() => navigate("/")}
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

export default Agradecimento;
