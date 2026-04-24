import { useCallback, useState } from "react";
import { toast as sonnerToast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  duration?: number;
  description?: string;
}

export function useToast() {
  const showToast = useCallback(
    (message: string, type: ToastType = "info", options: ToastOptions = {}) => {
      const { duration = 4000, description } = options;
      switch (type) {
        case "success":
          sonnerToast.success(message, { duration, description });
          break;
        case "error":
          sonnerToast.error(message, { duration, description });
          break;
        case "warning":
          sonnerToast.warning(message, { duration, description });
          break;
        default:
          sonnerToast(message, { duration, description });
      }
    },
    [],
  );

  const [isVisible] = useState(false);

  return { showToast, isVisible };
}
