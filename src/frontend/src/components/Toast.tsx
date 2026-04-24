import { Toaster } from "@/components/ui/sonner";

export function Toast() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "font-body rounded-xl",
          title: "font-semibold",
        },
      }}
    />
  );
}
