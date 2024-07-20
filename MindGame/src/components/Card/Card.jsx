import "./Card.css";

const Card = ({ card, handleSecim, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleSecim(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <img
          className="back"
          src="src/assets/OIP.jpg"
          onClick={handleClick}
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
