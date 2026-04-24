import { r as reactExports, n as ue } from "./index-H678KSt5.js";
function useToast() {
  const showToast = reactExports.useCallback(
    (message, type = "info", options = {}) => {
      const { duration = 4e3, description } = options;
      switch (type) {
        case "success":
          ue.success(message, { duration, description });
          break;
        case "error":
          ue.error(message, { duration, description });
          break;
        case "warning":
          ue.warning(message, { duration, description });
          break;
        default:
          ue(message, { duration, description });
      }
    },
    []
  );
  const [isVisible] = reactExports.useState(false);
  return { showToast, isVisible };
}
export {
  useToast as u
};
