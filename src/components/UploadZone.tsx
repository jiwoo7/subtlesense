import { motion } from "framer-motion";
import { Upload, Camera, Mic } from "lucide-react";
import { useState } from "react";

interface UploadZoneProps {
  onUpload: () => void;
}

const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className={`relative glass-panel rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
        isDragging ? "border-primary glow-border" : ""
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(180, 100%, 50%), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-[1px] rounded-2xl bg-card" />
      </div>

      <div className="relative flex flex-col items-center gap-6 py-8">
        {/* Upload icon with pulse */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Upload Session Capture
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Drop your webcam/audio recording here or click to browse
          </p>
        </div>

        {/* Supported formats */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground">
            <Camera className="w-3.5 h-3.5" />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground">
            <Mic className="w-3.5 h-3.5" />
            <span>Audio</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadZone;
