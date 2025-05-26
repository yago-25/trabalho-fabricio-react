import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Dashboard = () => {
  const buttonStyle = {
    cursor: "pointer",
    borderRadius: 6,
    border: "none",
    padding: "10px 18px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  };

  const navigate = useNavigate();

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
            onClick={(e) => navigate(`/admin/${t}`)}
            style={{
              ...buttonStyle,
              backgroundColor: "#2F80ED",
              color: "white",
              boxShadow: "0 4px 8px rgba(47,128,237,0.3)",
              minWidth: 120,
              fontSize: 16,
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
