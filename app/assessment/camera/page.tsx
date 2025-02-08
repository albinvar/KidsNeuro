"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Camera,
  X,
  Upload,
  Mic,
  Video,
  Shield,
  Sun,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

// Types
interface VideoState {
  blob: Blob | null;
  url: string | null;
}

// Custom Hook for Camera Setup
const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      setError("Camera access denied. Please check your permissions.");
      return null;
    }
  };

  return { videoRef, error, initializeCamera };
};

// Custom Hook for Recording Logic
const useRecording = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [videoState, setVideoState] = useState<VideoState>({
    blob: null,
    url: null,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;

    const mediaRecorder = new MediaRecorder(
      videoRef.current.srcObject as MediaStream
    );
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setVideoState({ blob, url });
    };

    mediaRecorder.start();
    setIsRecording(true);

    // Start duration timer
    timerRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingDuration(0);
    }
  };

  return {
    isRecording,
    recordingDuration,
    videoState,
    startRecording,
    stopRecording,
  };
};

// Main Component
export default function AssessmentTestPage() {
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const { videoRef, error, initializeCamera } = useCamera();
  const {
    isRecording,
    recordingDuration,
    videoState,
    startRecording,
    stopRecording,
  } = useRecording(videoRef);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
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

  const handleStartRecording = () => {
    setIsCountingDown(true);
    setCountdown(3);
  };

  const handleSubmit = async () => {
    try {
      // Implement your upload logic here
      toast.success("Video submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit video. Please try again.");
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] items-center justify-center p-4 sm:p-8">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <AnimatePresence>
                  {isCountingDown && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-white text-8xl font-bold bg-black/30 p-8 rounded-full">
                        {countdown}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-white font-medium">
                      {formatTime(recordingDuration)}
                    </span>
                  </div>
                )}
              </div>

              {videoState.url && (
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    src={videoState.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-none p-8 rounded-3xl shadow-lg">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Video Assessment
              </h1>

              {error ? (
                <div className="text-red-500 p-4 rounded-lg bg-red-50 mb-4">
                  {error}
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Guidelines</h2>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Sun className="w-5 h-5 text-yellow-500" />
                          <span>Ensure good lighting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Mic className="w-5 h-5 text-blue-500" />
                          <span>Check audio quality</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-green-500" />
                          <span>Center yourself in frame</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-purple-500" />
                          <span>Avoid background distractions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      {!isRecording ? (
                        <Button
                          onClick={handleStartRecording}
                          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-6 text-lg"
                        >
                          <Camera className="mr-2 h-6 w-6" />
                          Start Recording
                        </Button>
                      ) : (
                        <Button
                          onClick={stopRecording}
                          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-6 text-lg"
                        >
                          <X className="mr-2 h-6 w-6" />
                          Stop Recording
                        </Button>
                      )}

                      {videoState.blob && (
                        <div className="space-y-4">
                          <Button
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6 text-lg"
                          >
                            <Upload className="mr-2 h-6 w-6" />
                            Submit Recording
                          </Button>
                          <Button
                            onClick={handleStartRecording}
                            variant="outline"
                            className="w-full rounded-xl py-6 text-lg"
                          >
                            <RefreshCw className="mr-2 h-6 w-6" />
                            Record Again
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
