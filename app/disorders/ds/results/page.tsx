"use client";

import { motion } from "framer-motion";
import { Brain, Eye, MessageSquare, Mic } from "lucide-react";

export default function ASDResults() {
  // Mock results - in a real app, these would come from your backend
  const testResults = {
    eyeTracking: {
      score: 85,
      status: "Normal",
      details: "Gaze patterns within typical ranges",
    },
    socialBehavior: {
      score: 72,
      status: "Mild Concerns",
      details: "Some difficulties in social interaction patterns detected",
    },
    speechAnalysis: {
      score: 78,
      status: "Mild Concerns",
      details: "Minor irregularities in speech patterns observed",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2 ">
            <Brain className="w-8 h-8 text-blue-600" />
            ASD Assessment Results
          </h1>
          <p className="text-gray-600 mb-8">
            Analysis based on AI-powered evaluation of multiple parameters
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Eye Tracking Results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">
                  Eye Tracking
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">
                  {testResults.eyeTracking.score}%
                </p>
                <p className="text-blue-800 font-medium">
                  {testResults.eyeTracking.status}
                </p>
                <p className="text-sm text-blue-600">
                  {testResults.eyeTracking.details}
                </p>
              </div>
            </motion.div>

            {/* Social Behavior Results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-purple-800">
                  Social Behavior
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-purple-600">
                  {testResults.socialBehavior.score}%
                </p>
                <p className="text-purple-800 font-medium">
                  {testResults.socialBehavior.status}
                </p>
                <p className="text-sm text-purple-600">
                  {testResults.socialBehavior.details}
                </p>
              </div>
            </motion.div>

            {/* Speech Analysis Results */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-pink-50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <Mic className="w-6 h-6 text-pink-600" />
                <h2 className="text-xl font-semibold text-pink-800">
                  Speech Analysis
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-pink-600">
                  {testResults.speechAnalysis.score}%
                </p>
                <p className="text-pink-800 font-medium">
                  {testResults.speechAnalysis.status}
                </p>
                <p className="text-sm text-pink-600">
                  {testResults.speechAnalysis.details}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Next Steps
            </h3>
            <p className="text-gray-600">
              Based on these results, we recommend consulting with a healthcare
              professional for a comprehensive evaluation. These AI-based
              assessments are meant to be supportive tools and not definitive
              diagnoses.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
