import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";

import point1 from "./assets/Sounds/collect-points.mp3";
import notPoint1 from "./assets/Sounds/match-strike.mp3";
import congrats1 from "./assets/Sounds/congratulations.mp3";
import Timer from "./components/Timer/Timer";

const point = new Audio(point1);
const notPoint = new Audio(notPoint1);
const congrats = new Audio(congrats1);

const cardImages = [
  { src: "src/assets/1.jpg", matched: false },
  { src: "src/assets/2.jpg", matched: false },
  { src: "src/assets/3.jpg", matched: false },
  { src: "src/assets/4.jpg", matched: false },
  { src: "src/assets/5.jpg", matched: false },
  { src: "src/assets/6.jpg", matched: false },
];

const cardImages2 = [
  { src: "src/assets/1.jpg", matched: false },
  { src: "src/assets/2.jpg", matched: false },
  { src: "src/assets/3.jpg", matched: false },
  { src: "src/assets/4.jpg", matched: false },
  { src: "src/assets/5.jpg", matched: false },
  { src: "src/assets/6.jpg", matched: false },
  { src: "src/assets/7.jpg", matched: false },
  { src: "src/assets/8.jpg", matched: false },
];

function App() {
  const [size, setSize] = useState();
  const [active, setActive] = useState(false);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [secim1, setSecim1] = useState(null);
  const [secim2, setSecim2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const timerRef = useRef();

  const randomCards = () => {
    if (size === 6) {
      const newCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      setActive(true);
      setCards(newCards);
      setTurns(0);
      timerRef.current.resetTimer();
    } else {
      const newCards = [...cardImages2, ...cardImages2]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
      setCards(newCards);
      setTurns(0);
      setActive(true);
      timerRef.current.resetTimer();
    }
  };

  const handleSecim = (card) => {
    secim1 ? setSecim2(card) : setSecim1(card);
  };

  useEffect(() => {
    if (secim1 && secim2) {
      setDisabled(true);
      if (secim1.src === secim2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === secim1?.src) {
              point.play();
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        notPoint.play();
        setTimeout(() => reset(), 1000);
      }
    }
  }, [secim1, secim2]);

  useEffect(() => {
    if (cards.every((card) => card.matched === true)) {
      setActive(false);
      congrats.play();
      
    }
  }, [cards]);

  const reset = () => {
    setSecim1(null);
    setSecim2(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const handleSize1 = () => {
    setSize(6);
  };

  const handleSize2 = () => {
    setSize(8);
  };

  return (
    <>
      <div className="settings">
        <button onClick={handleSize1}> 4x3 </button>
        <button onClick={handleSize2}> 4x4 </button>
      </div>
      <div className="Game">
        <h1>Mind Game</h1>
        <button onClick={randomCards}>New Game</button>
      </div>

      <div className="app">
        <div className="cards">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleSecim={handleSecim}
              flipped={card === secim1 || card === secim2 || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="scores">
          <p>Turns: {turns}</p>
          <Timer ref={timerRef} isActive={active} />
        </div>
      </div>
    </>
  );
}

export default App;
