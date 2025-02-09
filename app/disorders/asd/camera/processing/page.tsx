"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Loader2,
  Video,
  Shield,
  Upload,
  ArrowRight,
  Brain,
  Cog,
} from "lucide-react";

// First, add these variant definitions at the top of your file, after the steps array:
const iconAnimations = {
  1: {
    // Video Upload
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 2,
      },
    },
  },
  2: {
    // Security Check
    animate: {
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  },
  3: {
    // AI Analysis
    animate: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  },
  4: {
    // Data Processing
    animate: {
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      },
    },
  },
  5: {
    // Results Ready
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        duration: 1,
      },
    },
  },
};

// Then modify the steps array to wrap each icon in motion.div:
const steps = [
  {
    id: 1,
    icon: (
      <motion.div {...iconAnimations[1]}>
        <Video className="w-12 h-12 text-blue-600" />
      </motion.div>
    ),
    text: "Video Upload",
    description: "Securely uploading your content",
    color: "blue",
  },
  {
    id: 2,
    icon: (
      <motion.div {...iconAnimations[1]}>
        <Shield className="w-12 h-12 text-purple-600" />
      </motion.div>
    ),
    text: "Security Check",
    description: "Ensuring data protection and privacy",
    color: "purple",
  },
  {
    id: 3,
    icon: (
      <motion.div {...iconAnimations[3]}>
        <Brain className="w-12 h-12 text-pink-600" />
      </motion.div>
    ),
    text: "AI Analysis",
    description: "Processing through neural networks",
    color: "pink",
  },
  {
    id: 4,
    icon: (
      <motion.div {...iconAnimations[4]}>
        <Cog className="w-12 h-12 text-yellow-600" />
      </motion.div>
    ),
    text: "Data Processing",
    description: "Analyzing patterns and behaviors",
    color: "yellow",
  },
  {
    id: 5,
    icon: (
      <motion.div {...iconAnimations[5]}>
        <CheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>
    ),
    text: "Results Ready",
    description: "Generating comprehensive report",
    color: "green",
  },
];

export default function ProcessingSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsProcessing(false);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-gray-600">
            Advanced AI analysis in progress. Please wait...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Current Step Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`bg-white rounded-2xl px-4 md:px-6 py-6 shadow-lg border-2 border-${steps[currentStep].color}-500`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-xl bg-${steps[currentStep].color}-50`}
              >
                {steps[currentStep].icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {steps[currentStep].text}
                </h3>
                <p className="text-gray-600 text-sm">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index <= currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Status Message */}
        <AnimatePresence>
          {!isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-green-600 text-lg font-semibold">
                Processing Complete! ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
