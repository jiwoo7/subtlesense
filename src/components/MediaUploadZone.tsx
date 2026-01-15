import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Mic, Video, X, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AnalysisResult, UploadType } from "@/pages/Dashboard";

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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadOptions = [
    { icon: Camera, label: "Webcam", type: "webcam" as UploadType, color: "bg-pastel-pink/20 text-pink-600 hover:bg-pastel-pink/40" },
    { icon: Mic, label: "Audio", type: "audio" as UploadType, color: "bg-pastel-lavender/20 text-purple-600 hover:bg-pastel-lavender/40" },
    { icon: Video, label: "Video", type: "video" as UploadType, color: "bg-pastel-sky/20 text-blue-600 hover:bg-pastel-sky/40" },
  ];

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 }, 
        audio: false 
      });
      setMediaStream(stream);
      setSelectedType("webcam");
      
      // Wait for next tick to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
      
      toast.success("Webcam connected! 📸");
    } catch (error) {
      toast.error("Could not access webcam. Please check permissions.");
      console.error("Webcam error:", error);
    }
  };

  const startAudioRecording = async () => {
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
    } catch (error) {
      toast.error("Could not access microphone. Please check permissions.");
      console.error("Audio error:", error);
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
        // Seek to 1 second or 10% of video duration (whichever is smaller)
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
        // For audio, we'll send a placeholder - the AI will analyze based on context
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
  };

  return (
    <motion.div
      className="relative glass-panel rounded-3xl p-8 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="absolute inset-0 rounded-3xl pastel-gradient opacity-20" />
      <div className="absolute inset-[2px] rounded-3xl bg-white/90" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">
              Upload Your Video 🎬
            </h3>
            <p className="text-muted-foreground text-sm">
              Choose an input type to analyze your emotional state
            </p>
          </div>
          {selectedType && (
            <Button variant="ghost" size="icon" onClick={resetSelection}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Preview area */}
        {selectedType === "webcam" && mediaStream && (
          <div className="mb-6 rounded-2xl overflow-hidden bg-black aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {selectedType === "audio" && (
          <div className="mb-6 p-8 rounded-2xl bg-pastel-lavender/20 text-center">
            <motion.div
              animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isRecording ? Infinity : 0 }}
              className="w-20 h-20 rounded-full bg-pastel-lavender mx-auto mb-4 flex items-center justify-center"
            >
              <Mic className={`w-10 h-10 ${isRecording ? "text-red-500" : "text-purple-600"}`} />
            </motion.div>
            <p className="font-medium">
              {isRecording ? "Recording... 🎙️" : recordedBlob ? "Audio recorded! ✅" : "Ready to record"}
            </p>
          </div>
        )}

        {selectedType === "video" && uploadedFile && (
          <div className="mb-6 p-6 rounded-2xl bg-pastel-sky/20 text-center">
            <Video className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">{uploadedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Upload options */}
        {!selectedType && (
          <div className="flex flex-col items-center gap-5 py-6">
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 rounded-2xl pastel-gradient flex items-center justify-center shadow-lg">
                <Upload className="w-9 h-9 text-white" />
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                onClick={startWebcam}
                className={uploadOptions[0].color + " flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all"}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Camera className="w-4 h-4" />
                <span>Webcam</span>
              </motion.button>

              <motion.button
                onClick={startAudioRecording}
                className={uploadOptions[1].color + " flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all"}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="w-4 h-4" />
                <span>Audio</span>
              </motion.button>

              <motion.button
                onClick={handleVideoUpload}
                className={uploadOptions[2].color + " flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all"}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {selectedType && (
          <div className="flex gap-3 justify-center">
            {selectedType === "audio" && !recordedBlob && (
              <Button
                onClick={isRecording ? stopRecording : startAudioRecording}
                variant={isRecording ? "destructive" : "default"}
                className="gap-2"
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
                className="pastel-gradient text-white font-bold gap-2"
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
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </motion.div>
  );
};

export default MediaUploadZone;
