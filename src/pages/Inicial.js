import { useNavigate } from "react-router-dom";
import ButtonAplication from "../components/ButtonApplication";
import "./../styles/Inicial.css";

const Inicial = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Seja bem vindo ao sistema de Compras!</h1>
      <div className="btns-div">
        <ButtonAplication
          text="Ir para as compras"
          onClick={() => navigate("/home")}
        />
        <ButtonAplication
          text="Entrar como Admin"
          onClick={() => navigate("/painel")}
        />
      </div>
    </div>
  );
};

export default Inicial;
