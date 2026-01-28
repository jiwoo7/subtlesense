import { useState, useCallback } from "react";
import { toast } from "sonner";

interface PermissionState {
  camera: PermissionState | null;
  microphone: PermissionState | null;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<{
    camera: "granted" | "denied" | "prompt" | null;
    microphone: "granted" | "denied" | "prompt" | null;
  }>({
    camera: null,
    microphone: null,
  });

  const checkPermission = async (type: "camera" | "microphone") => {
    try {
      const permission = await navigator.permissions.query({
        name: type as PermissionName,
      });
      return permission.state;
    } catch {
      // Some browsers don't support permission query for camera/microphone
      return null;
    }
  };

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissions((prev) => ({ ...prev, camera: "granted" }));
      toast.success("Camera access granted! 📸");
      return true;
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        setPermissions((prev) => ({ ...prev, camera: "denied" }));
        toast.error("Camera access denied. Please enable it in your browser settings.");
      } else if (error.name === "NotFoundError") {
        toast.error("No camera found on this device.");
      } else {
        toast.error("Could not access camera. Please try again.");
      }
      return false;
    }
  }, []);

  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissions((prev) => ({ ...prev, microphone: "granted" }));
      toast.success("Microphone access granted! 🎙️");
      return true;
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        setPermissions((prev) => ({ ...prev, microphone: "denied" }));
        toast.error("Microphone access denied. Please enable it in your browser settings.");
      } else if (error.name === "NotFoundError") {
        toast.error("No microphone found on this device.");
      } else {
        toast.error("Could not access microphone. Please try again.");
      }
      return false;
    }
  }, []);

  return {
    permissions,
    checkPermission,
    requestCameraPermission,
    requestMicrophonePermission,
  };
};
