import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Mic, Video, X, Play, Pause, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AnalysisResult, UploadType } from "@/types/emotions";

interface MediaUploadZoneProps {
  onStartAnalysis: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
  isAnalyzing: boolean;
}

const MediaUploadZone = ({ onStartAnalysis, onAnalysisComplete, isAnalyzing }: MediaUploadZoneProps) => {
  const [selectedType, setSelectedType] = useState<UploadType>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadOptions = [
    { icon: Camera, label: "Webcam", type: "webcam" as UploadType, description: "Use your camera" },
    { icon: Mic, label: "Audio", type: "audio" as UploadType, description: "Record your voice" },
    { icon: Video, label: "Video", type: "video" as UploadType, description: "Upload a video file" },
  ];

  const startWebcam = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: "user"
        }, 
        audio: false 
      });
      setMediaStream(stream);
      setSelectedType("webcam");
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
      
      toast.success("Camera ready! 📸");
    } catch (error: any) {
      console.error("Webcam error:", error);
      if (error.name === "NotAllowedError") {
        setPermissionError("Camera access was denied. Please allow camera access in your browser settings.");
        toast.error("Camera access denied. Please enable it in your browser settings.");
      } else if (error.name === "NotFoundError") {
        setPermissionError("No camera found on this device.");
        toast.error("No camera found on this device.");
      } else {
        setPermissionError("Could not access camera. Please try again.");
        toast.error("Could not access camera. Please check permissions.");
      }
    }
  };

  const startAudioRecording = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSelectedType("audio");
      toast.success("Recording started! 🎙️");
    } catch (error: any) {
      console.error("Audio error:", error);
      if (error.name === "NotAllowedError") {
        setPermissionError("Microphone access was denied. Please allow microphone access in your browser settings.");
        toast.error("Microphone access denied. Please enable it in your browser settings.");
      } else if (error.name === "NotFoundError") {
        setPermissionError("No microphone found on this device.");
        toast.error("No microphone found on this device.");
      } else {
        setPermissionError("Could not access microphone. Please try again.");
        toast.error("Could not access microphone. Please check permissions.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording saved! ✅");
    }
  };

  const handleVideoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        setUploadedFile(file);
        setSelectedType("video");
        toast.success(`Video "${file.name}" ready! 🎬`);
      } else {
        toast.error("Please upload a video file");
      }
    }
  };

  const captureFrame = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current) {
        reject(new Error("No video element"));
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    });
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      
      video.onloadedmetadata = () => {
        video.currentTime = Math.min(1, video.duration * 0.1);
      };
      
      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
          URL.revokeObjectURL(url);
          resolve(base64);
        } else {
          URL.revokeObjectURL(url);
          reject(new Error("Could not get context"));
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Could not load video"));
      };
      
      video.load();
    });
  };

  const analyzeMedia = async () => {
    if (!selectedType) {
      toast.error("Please select an input type first");
      return;
    }

    onStartAnalysis();

    try {
      let mediaBase64 = "";

      if (selectedType === "webcam" && videoRef.current) {
        mediaBase64 = await captureFrame();
      } else if (selectedType === "video" && uploadedFile) {
        mediaBase64 = await fileToBase64(uploadedFile);
      } else if (selectedType === "audio") {
        mediaBase64 = "";
      }

      const { data, error } = await supabase.functions.invoke("analyze-emotion", {
        body: { 
          mediaBase64,
          mediaType: selectedType === "audio" ? "audio" : "image",
          uploadType: selectedType
        }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      onAnalysisComplete({
        ...data,
        uploadType: selectedType
      });

    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze. Please try again.");
    }
  };

  const resetSelection = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setMediaStream(null);
    setSelectedType(null);
    setRecordedBlob(null);
    setUploadedFile(null);
    setIsRecording(false);
    setPermissionError(null);
  };

  return (
    <motion.div
      className="relative glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">
              Capture Your Moment 🎬
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Choose how you want to analyze your emotions
            </p>
          </div>
          {selectedType && (
            <Button variant="ghost" size="icon" onClick={resetSelection} className="h-8 w-8 sm:h-10 sm:w-10">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
        </div>

        {/* Permission Error */}
        {permissionError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 sm:p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-destructive font-medium">{permissionError}</p>
              <p className="text-xs text-muted-foreground mt-1">
                On mobile, go to Settings → Safari/Chrome → Camera/Microphone to enable.
              </p>
            </div>
          </motion.div>
        )}

        {/* Webcam Preview - Dark themed */}
        {selectedType === "webcam" && mediaStream && (
          <div className="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden bg-card border border-border aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Audio Recording - Dark themed */}
        {selectedType === "audio" && (
          <div className="mb-4 sm:mb-6 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-neon-purple/30 text-center">
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isRecording ? Infinity : 0 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink mx-auto mb-4 flex items-center justify-center"
            >
              <Mic className={`w-8 h-8 sm:w-10 sm:h-10 ${isRecording ? "text-white" : "text-white"}`} />
            </motion.div>
            <p className="font-medium text-foreground">
              {isRecording ? "Recording... 🎙️" : recordedBlob ? "Audio recorded! ✅" : "Ready to record"}
            </p>
          </div>
        )}

        {/* Video Upload - Dark themed */}
        {selectedType === "video" && uploadedFile && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-neon-pink/30 text-center">
            <Video className="w-10 h-10 sm:w-12 sm:h-12 text-neon-pink mx-auto mb-2" />
            <p className="font-medium text-foreground truncate">{uploadedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Upload options - Mobile optimized */}
        {!selectedType && (
          <div className="flex flex-col items-center gap-4 sm:gap-5 py-4 sm:py-6">
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-lg">
                <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
              </div>
            </motion.div>

            {/* Mobile-friendly grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
              {uploadOptions.map(({ icon: Icon, label, type, description }) => (
                <motion.button
                  key={label}
                  onClick={
                    type === "webcam" ? startWebcam :
                    type === "audio" ? startAudioRecording :
                    handleVideoUpload
                  }
                  className="flex items-center gap-3 sm:flex-col sm:gap-2 p-4 rounded-xl bg-card border border-border hover:border-neon-pink/50 transition-all text-left sm:text-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-pink" />
                  </div>
                  <div className="sm:text-center">
                    <span className="font-semibold text-foreground block">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        {selectedType && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {selectedType === "audio" && !recordedBlob && (
              <Button
                onClick={isRecording ? stopRecording : startAudioRecording}
                variant={isRecording ? "destructive" : "default"}
                className="gap-2 w-full sm:w-auto"
              >
                {isRecording ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Recording
                  </>
                )}
              </Button>
            )}

            {(selectedType === "webcam" || recordedBlob || uploadedFile) && !isAnalyzing && (
              <Button
                onClick={analyzeMedia}
                className="bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold gap-2 w-full sm:w-auto"
              >
                <span>🧠</span>
                Analyze with AI
              </Button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </motion.div>
  );
};

export default MediaUploadZone;
