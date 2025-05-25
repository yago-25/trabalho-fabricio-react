import "./styles/ButtonApplication.css";

const ButtonAplication = ({ text, onClick, disabled }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default ButtonAplication;
