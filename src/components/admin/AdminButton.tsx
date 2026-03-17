"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const adminButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        /** 主要按鈕 */
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        /** 次要按鈕 */
        outline:
          "border border-blue-500 bg-white text-blue-500 hover:bg-blue-50 active:bg-blue-100",
        /** 連結按鈕 */
        link: "text-blue-500 hover:text-blue-600 active:text-blue-700",
      },
      size: {
        default: "h-10 rounded-xl px-5 text-sm",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-xl px-6 text-base",
        /** 圖標按鈕 */
        icon: "h-10 w-10 rounded-xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof adminButtonVariants> {
  asChild?: boolean;
}

const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(adminButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

AdminButton.displayName = "AdminButton";

export { AdminButton, adminButtonVariants };
export type { AdminButtonProps };
