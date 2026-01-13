import { motion } from "framer-motion";
import { Upload, Camera, Mic, Video } from "lucide-react";
import { useState } from "react";

interface UploadZoneProps {
  onUpload: () => void;
}

const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className={`relative glass-panel rounded-3xl p-8 cursor-pointer transition-all duration-300 overflow-hidden ${
        isDragging ? "ring-2 ring-pastel-pink" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        onUpload();
      }}
      onClick={onUpload}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-3xl pastel-gradient opacity-20" />
      <div className="absolute inset-[2px] rounded-3xl bg-white/90" />

      <div className="relative flex flex-col items-center gap-5 py-6">
        {/* Upload icon with animation */}
        <motion.div
          className="relative"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 rounded-2xl pastel-gradient flex items-center justify-center shadow-lg">
            <Upload className="w-9 h-9 text-white" />
          </div>
          
          {/* Floating particles */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pastel-yellow"
            animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-1 -left-2 w-3 h-3 rounded-full bg-pastel-mint"
            animate={{ y: [0, -8, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <div className="text-center">
          <h3 className="text-xl font-display font-bold text-foreground mb-2">
            Upload Your Coding Session 🎬
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Drop your webcam or audio recording here, and we'll analyze your emotional journey!
          </p>
        </div>

        {/* Supported formats */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { icon: Camera, label: "Webcam", color: "bg-pastel-pink/20 text-pink-600" },
            { icon: Mic, label: "Audio", color: "bg-pastel-lavender/20 text-purple-600" },
            { icon: Video, label: "Video", color: "bg-pastel-sky/20 text-blue-600" },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UploadZone;
