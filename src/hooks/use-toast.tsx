
import * as React from "react";
import { toast as sonnerToast, Toaster as Sonner } from "sonner";

type ToastProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToastProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

export const useToast = () => {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
    error: sonnerToast.error,
    success: sonnerToast.success,
  };
};

export const toast = sonnerToast;
