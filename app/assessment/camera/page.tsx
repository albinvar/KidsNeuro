"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X, Upload, Mic, Video, Shield, Sun } from "lucide-react";

export default function AssessmentTestPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        alert(
          "Unable to access camera. Please ensure you have granted the necessary permissions."
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      startRecording();
    }
  }, [countdown, isCountingDown]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const initiateRecording = () => {
    setIsCountingDown(true);
    setCountdown(3);
  };

  const startRecording = async () => {
    if (!videoRef.current.srcObject) return;
    setIsRecording(true);
    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/mp4" });
      setVideoBlob(blob);
      chunks.current = [];
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] flex flex-col items-center justify-center p-4 sm:p-8 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden">
            <motion.video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {isCountingDown && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-white text-7xl font-bold"
              >
                {countdown}
              </motion.div>
            )}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white"
              >
                <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
                <span>{formatTime(recordingDuration)}</span>
              </motion.div>
            )}
          </div>
          <Card className="bg-gray-100 border-none text-gray-900 p-8">
            <h1 className="text-4xl font-bold mb-6">🎬 Assessment Test</h1>
            <p className="text-lg text-gray-700 mb-4">
              Follow these instructions before recording:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Ensure good lighting and a quiet environment.</li>
              <li>✅ Keep your face clearly visible in the frame.</li>
              <li>✅ Avoid distractions and background movements.</li>
              <li>✅ Speak clearly and naturally.</li>
            </ul>
            <div className="flex flex-col gap-4 mt-8">
              {!isRecording ? (
                <Button
                  onClick={initiateRecording}
                  className="bg-green-500 text-white rounded-xl py-6 text-lg"
                >
                  <Camera className="mr-2 h-6 w-6" /> Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  className="bg-red-500 text-white rounded-xl py-6 text-lg"
                >
                  <X className="mr-2 h-6 w-6" /> Stop Recording
                </Button>
              )}
              {videoBlob && (
                <Button
                  onClick={() => alert("Video submitted successfully!")}
                  className="bg-blue-500 text-white rounded-xl py-6 text-lg"
                >
                  <Upload className="mr-2 h-6 w-6" /> Submit Recording
                </Button>
              )}
            </div>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}
