"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, RefreshCw, Trophy } from "lucide-react";

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardImages = [
  "https://i.ibb.co/9HYFXnYX/1.jpg",
  "https://i.ibb.co/kVh5fz58/2-2.jpg",
  "https://i.ibb.co/0RnkYksf/8458387.jpg",
  "https://i.ibb.co/4Z2sMXrZ/8458387w.jpg",
  "https://i.ibb.co/3mLTR8Mn/845838ww7.jpg",
  "https://i.ibb.co/5xMWD0DC/84583ew87.jpg",
];

export default function MatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!gameComplete) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameComplete]);

  const initializeGame = () => {
    const duplicatedCards = [...cardImages, ...cardImages]
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(duplicatedCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isMatched) return;
    if (flippedCards.includes(cardId)) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (currentFlippedCards: number[]) => {
    const [first, second] = currentFlippedCards;

    setTimeout(() => {
      if (cards[first].image === cards[second].image) {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);

        if (newCards.every((card) => card.isMatched)) {
          setGameComplete(true);
        }
      } else {
        const newCards = [...cards];
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
        setCards(newCards);
      }
      setFlippedCards([]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none p-6 rounded-3xl shadow-lg">
            {!gameComplete ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Memory Matching Game
                  </h1>
                  <div className="flex gap-4">
                    <span className="text-gray-600">Moves: {moves}</span>
                    <span className="text-gray-600">
                      Time: {Math.floor(timeElapsed / 60)}:
                      {(timeElapsed % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {cards.map((card) => (
                    <motion.div
                      key={card.id}
                      className={`aspect-square cursor-pointer ${
                        card.isFlipped ? "rotate-y-180" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <div
                        className={`w-full h-full rounded-lg ${
                          card.isFlipped ? "bg-white" : "bg-blue-500"
                        } shadow-md transition-all duration-300`}
                      >
                        {card.isFlipped && (
                          <img
                            src={card.image}
                            alt="card"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <Trophy className="mx-auto h-20 w-20 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
                <p className="text-gray-600 mb-6">
                  You completed the game in {moves} moves and{" "}
                  {Math.floor(timeElapsed / 60)}:
                  {(timeElapsed % 60).toString().padStart(2, "0")}
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={initializeGame} className="bg-blue-600">
                    <RefreshCw className="mr-2" /> Play Again
                  </Button>
                  <Button
                    onClick={() =>
                      (window.location.href = "/disorders/ds/results")
                    }
                    className="bg-green-600"
                  >
                    <ArrowRight className="mr-2" /> See Results
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
