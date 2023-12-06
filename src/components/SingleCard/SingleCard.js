import "./SingleCard.css";

export const SingleCard = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} />
        <img className="back" onClick={handleClick} src="/assets/back.png" />
      </div>
    </div>
  );
};
