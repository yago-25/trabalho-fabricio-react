import { useEffect, useState } from "react";
import ButtonAplication from "../components/ButtonApplication";
import LoadingButton from "../components/LoadingButton";
import { api, usuario } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [abreCart, setAbreCart] = useState(false);

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

  useEffect(() => {
    buscaProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removeItem = (id) => {
    setCarrinho((old) => old.filter((item) => item._id !== id));
  };

  const sair = () => {
    navigate("/");
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
    <div className="home-container">
      <header className="top-bar">
        <div className="header-buttons">
          <button
            className="cart-btn"
            title="Ver carrinho"
            onClick={() => {
              setAbreCart(!abreCart);
            }}
          >
            🛒 <span className="cart-count">{carrinho.length}</span>
          </button>
          <button
            className="logout-btn"
            onClick={sair}
            title="Sair da aplicação"
          >
            🚪
          </button>
        </div>
      </header>

      <main className="main-content">
        <h1 style={{ fontSize: "50px" }}>Bem-vindo à nossa loja!</h1>
        <p className="subtitle">
          Explore nossa seleção de produtos especialmente escolhidos para você.
          Qualidade, bom preço e entrega rápida garantida.
        </p>

        <section className="grid-container">
          {produtos.length === 0 ? (
            <p className="empty-message">Nenhum produto encontrado.</p>
          ) : (
            produtos.map((produto) => (
              <div key={produto._id} className="card">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="card-img"
                />
                <div className="card-content">
                  <h2 className="card-title">{produto.nome}</h2>
                  <p className="card-desc">{produto.descricao}</p>
                  <span className="card-tag">
                    {produto.categoria || "Sem categoria"}
                  </span>
                  <p className="card-price">R$ {produto.preco.toFixed(2)}</p>
                </div>
                <ButtonAplication
                  text="Adicionar ao carrinho"
                  onClick={() => adicionarAoCarrinho(produto)}
                />
              </div>
            ))
          )}
        </section>
      </main>
      {abreCart && <Cart carrinho={carrinho} onRemoveItem={removeItem} />}
    </div>
  );
};

export default Home;
