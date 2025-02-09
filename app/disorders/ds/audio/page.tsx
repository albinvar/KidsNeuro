"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Mic, X, Upload, Volume2, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";

// Types
interface AudioState {
  blob: Blob | null;
  url: string | null;
}

// Custom Hook for Audio Recording
const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioState, setAudioState] = useState<AudioState>({
    blob: null,
    url: null,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAudioState({ blob, url });
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast.error("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
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
    audioState,
    startRecording,
    stopRecording,
  };
};

export default function AudioAssessmentPage() {
  const {
    isRecording,
    recordingDuration,
    audioState,
    startRecording,
    stopRecording,
  } = useAudioRecording();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    try {
      // Implement your upload logic here
      toast.success("Audio submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit audio. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] items-center justify-center p-2  sm:p-8 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none p-8 rounded-3xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Audio Assessment
            </h1>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recording Guidelines</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-blue-500" />
                    <span>Speak clearly into your microphone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-green-500" />
                    <span>Maintain consistent volume</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <span>Minimize background noise</span>
                  </li>
                </ul>
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 justify-center bg-black/5 p-4 rounded-xl">
                  <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full" />
                  <span className="font-medium">
                    Recording: {formatTime(recordingDuration)}
                  </span>
                </div>
              )}

              {audioState.url && (
                <div className="bg-black/5 p-4 rounded-xl">
                  <audio src={audioState.url} controls className="w-full" />
                </div>
              )}

              <div className="space-y-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-6 text-lg"
                  >
                    <Mic className="mr-2 h-6 w-6" />
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

                {audioState.blob && (
                  <div className="space-y-4">
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6 text-lg"
                      asChild
                    >
                      <Link href="/disorders/asd/processing">
                        <Upload className="mr-2 h-6 w-6" />
                        Submit Recording
                      </Link>
                    </Button>
                    <Button
                      onClick={startRecording}
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
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
