import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const texts = [
  "Painel Administrativo",
  "Gerencie seus produtos",
  "Acompanhe suas vendas",
  "Organize suas categorias",
];

const Header = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    if (subIndex === texts[index].length + 1 && !deleting) {
      setPause(true);
      setTimeout(() => {
        setDeleting(true);
        setPause(false);
      }, 1500);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? 50 : 120
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((v) => !v);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: 70,
        padding: "0 24px",
        background: "transparent",
        backdropFilter: "blur(25px)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 26,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        marginBottom: "30px",
        letterSpacing: 1,
        userSelect: "none",
      }}
    >
      <h1
        style={{
          margin: 0,
          transition: "all 0.2s ease-in-out",
        }}
      >
        {texts[index].substring(0, subIndex)}
        <span style={{ opacity: blink ? 1 : 0 }}>|</span>
      </h1>

      <button
        onClick={logout}
        aria-label="Logout"
        title="Logout"
        style={{
          position: "absolute",
          right: 24,
          background: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="white"
        >
          <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
          <path d="M20 3H12v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
