import React, { useEffect, useState } from "react";
import { SingleCard } from "./components/SingleCard/SingleCard";
import "./App.css";

const cardChoice = [
  { src: "./assets/Jiraya.png" },
  { src: "./assets/Itachi.png" },
  { src: "./assets/Naruto.png" },
  { src: "./assets/Neji.png" },
  { src: "./assets/Sasuke.png" },
  { src: "./assets/Sakura.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const randomizeCard = () => {
    const randomCard = [...cardChoice, ...cardChoice]
      .sort(() => Math.random() - 0.5)
      .map((x) => ({ ...x, id: Math.random() }));
    setCards(randomCard);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    setDisabled(true);
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      <div className="container">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <button className="newGame" onClick={randomizeCard}>
        New Game
      </button>
    </>
  );
}

export default App;
