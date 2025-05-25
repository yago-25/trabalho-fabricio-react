import ButtonAplication from "../components/ButtonApplication";

const Home = () => {
  return (
    <div className="container-2">
      <div>
        <label>
          Usuário
          <input type="text" placeholder="Insira seu usuário" />
        </label>
        <label>
          Senha
          <input type="password" placeholder="Insira sua senha" />
        </label>
        <ButtonAplication text="Entrar" />
      </div>
    </div>
  );
};

export default Home;
