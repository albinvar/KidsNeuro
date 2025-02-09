"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, RefreshCw, Trophy } from "lucide-react";

// Types
interface Question {
  id: number;
  text: string;
  options: string[];
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "When someone is showing emotion through their facial expression, I can usually understand how they are feeling.",
    options: [
      "Always easy for me",
      "Sometimes I can tell",
      "Often difficult for me",
      "Very challenging to understand",
    ],
  },
  {
    id: 2,
    text: "In a group conversation, I find it:",
    options: [
      "Easy to take turns speaking",
      "Sometimes challenging to know when to speak",
      "Difficult to follow multiple people talking",
      "Prefer one-on-one conversations",
    ],
  },
  {
    id: 3,
    text: "When someone uses figures of speech or idioms, I usually:",
    options: [
      "Understand the meaning easily",
      "Need some time to process the meaning",
      "Take them literally at first",
      "Find them very confusing",
    ],
  },
  {
    id: 4,
    text: "In social situations, making eye contact is:",
    options: [
      "Natural and comfortable",
      "Sometimes uncomfortable",
      "Often challenging",
      "Very difficult or uncomfortable",
    ],
  },
  {
    id: 5,
    text: "When plans change unexpectedly, I typically:",
    options: [
      "Adapt easily",
      "Feel slightly anxious but manage",
      "Need time to adjust",
      "Feel very upset or stressed",
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    // Move to next question or show results
    if (currentQuestion < sampleQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setSelectedAnswers([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] p-2 sm:p-8 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none p-4 rounded-3xl shadow-lg">
            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                      Question {currentQuestion + 1}/{sampleQuestions.length}
                    </h1>
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
                          className={`w-full justify-start text-left p-4 whitespace-normal h-auto ${
                            selectedAnswers[currentQuestion] === index
                              ? "bg-blue-100 hover:bg-blue-200"
                              : "hover:bg-gray-100"
                          }`}
                          variant="outline"
                        >
                          <span className="line-clamp-2">{option}</span>
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <Trophy className="mx-auto h-20 w-20 text-yellow-500 mb-4" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xl text-gray-600 mb-6">
                    Thanks for completing the questionnaire.
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6 mb-8 shadow-inner">
                    <p className="text-gray-700 mb-4">
                      You answered {selectedAnswers.length} out of{" "}
                      {sampleQuestions.length} questions
                    </p>
                    <div className="h-2 w-full bg-gray-200 rounded-full mb-6">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedAnswers.length / sampleQuestions.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={restartQuiz}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <RefreshCw className="mr-3 h-5 w-5 animate-spin-slow" />
                      Take Quiz Again
                    </Button>
                  </div>
                  <Button
                    onClick={() =>
                      (window.location.href = "/disorders/asd/audio")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-xl transition-all duration-200 transform hover:scale-105 mt-4"
                  >
                    <ArrowRight className="mr-3 h-5 w-5" />
                    Next Assessment
                  </Button>
                </motion.div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
