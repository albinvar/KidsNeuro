"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, XCircle, RefreshCw, Trophy } from "lucide-react";

// Types
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What part of the brain is responsible for balance?",
    options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: "Which neurotransmitter is often associated with pleasure and reward?",
    options: ["Serotonin", "Dopamine", "GABA", "Acetylcholine"],
    correctAnswer: 1,
  },
  // Add more questions as needed
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer!");
    }

    // Move to next question or show results
    if (currentQuestion < sampleQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswers([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] p-4 sm:p-8">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none p-8 rounded-3xl shadow-lg">
            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                      Question {currentQuestion + 1}/{sampleQuestions.length}
                    </h1>
                    <span className="text-lg font-semibold text-blue-600">
                      Score: {score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestion + 1) / sampleQuestions.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl mb-4">
                    {sampleQuestions[currentQuestion].text}
                  </h2>
                  <div className="space-y-3">
                    {sampleQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full justify-start text-left p-4 ${
                            selectedAnswers[currentQuestion] === index
                              ? "bg-blue-100 hover:bg-blue-200"
                              : "hover:bg-gray-100"
                          }`}
                          variant="outline"
                        >
                          {option}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-xl mb-6">
                  Your score: {score} out of {sampleQuestions.length}
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={restartQuiz}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
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
