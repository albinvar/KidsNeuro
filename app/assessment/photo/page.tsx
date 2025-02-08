"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Custom Hook for Camera Setup
const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const initializeCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { aspectRatio: 1 }, // Force square aspect ratio
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      return mediaStream;
    } catch (err) {
      setError("Camera access denied. Please check your permissions.");
      return null;
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return { videoRef, error, initializeCamera, stopCamera };
};

export default function PhotoCapturePage() {
  const { videoRef, error, initializeCamera, stopCamera } = useCamera();
  const [photo, setPhoto] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Ensure square capture
    const size = Math.min(
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    canvasRef.current.width = size;
    canvasRef.current.height = size;

    // Calculate offset to center the capture
    const xOffset = (videoRef.current.videoWidth - size) / 2;
    const yOffset = (videoRef.current.videoHeight - size) / 2;

    context.drawImage(
      videoRef.current,
      xOffset,
      yOffset,
      size,
      size,
      0,
      0,
      size,
      size
    );
    const imageUrl = canvasRef.current.toDataURL("image/png");
    setPhoto(imageUrl);
    stopCamera();
  };

  const handleSubmit = async () => {
    try {
      // Implement your upload logic here
      toast.success("Photo submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit photo. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E6F3FF] via-white to-[#FFF3E0] p-2 sm:p-4 md:p-8">
      <div className="w-full max-w-[500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-none p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
              Photo Capture
            </h1>

            {error ? (
              <div className="text-red-500 p-3 sm:p-4 rounded-lg bg-red-50 mb-4 text-center text-sm sm:text-base">
                {error}
              </div>
            ) : (
              <>
                {!photo && (
                  <div className="relative w-full aspect-square bg-black rounded-2xl overflow-hidden shadow-xl mx-auto">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />

                {photo && (
                  <div className="relative w-full aspect-square bg-black rounded-2xl overflow-hidden mt-4 sm:mt-6">
                    <img
                      src={photo}
                      alt="Captured"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  {!photo ? (
                    <Button
                      onClick={capturePhoto}
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 sm:py-6 text-base sm:text-lg"
                    >
                      <Camera className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                      Capture Photo
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-4 sm:py-6 text-base sm:text-lg"
                      >
                        <Upload className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                        Submit Photo
                      </Button>
                      <Button
                        onClick={() => {
                          setPhoto(null);
                          initializeCamera();
                        }}
                        variant="outline"
                        className="w-full rounded-xl py-4 sm:py-6 text-base sm:text-lg"
                      >
                        <RefreshCw className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                        Retake Photo
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
