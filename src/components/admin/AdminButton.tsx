"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type AdminButtonVariant = "primary" | "outline" | "link";
type AdminButtonSize = "default" | "sm" | "lg" | "icon";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AdminButtonVariant;
  size?: AdminButtonSize;
}

const variantStyles: Record<AdminButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  outline: "border border-blue-500 bg-white text-blue-500 hover:bg-blue-50 active:bg-blue-100",
  link: "text-blue-500 hover:text-blue-600 active:text-blue-700",
};

const sizeStyles: Record<AdminButtonSize, string> = {
  default: "h-10 rounded-xl px-5 text-sm",
  sm: "h-9 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-xl px-6 text-base",
  icon: "h-10 w-10 rounded-xl [&_svg]:size-5",
};

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

AdminButton.displayName = "AdminButton";

export { AdminButton };
export type { AdminButtonProps };
