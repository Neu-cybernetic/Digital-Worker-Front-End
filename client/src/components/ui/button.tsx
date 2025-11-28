import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Carbon Button: 48px default height, specific padding, no rounding (sharp corners)
  // Focus styles: Carbon uses a distinct 2px outline offset.
  "inline-flex items-center justify-between gap-4 whitespace-nowrap text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          // Primary: Blue 60 (#0f62fe), White text. Hover: Blue 70 (#0353e9). Active: Blue 80 (#002d9c).
          "bg-[#0f62fe] text-white hover:bg-[#0353e9] active:bg-[#002d9c]",
        destructive:
          // Danger: Red 60 (#da1e28).
          "bg-[#da1e28] text-white hover:bg-[#ba1b23] active:bg-[#750e13]",
        outline:
          // Tertiary/Outline: Transparent bg, Blue 60 border, Blue 60 text.
          // Carbon Tertiary often has a thin border.
          "border border-[#0f62fe] text-[#0f62fe] hover:bg-[#0f62fe] hover:text-white active:bg-[#002d9c]",
        secondary:
          // Secondary: Gray 80 (#393939) in dark, Gray 20 (#e0e0e0) in light? 
          // Actually Carbon Secondary is Gray 60 (#6f6f6f)?
          // Let's use Carbon Secondary Button: Gray 80 (#393939) for dark mode context, or Gray 100 (#161616) for light mode primary context?
          // Standard Carbon Secondary: Gray 100 (#161616) bg, White text.
          "bg-[#393939] text-white hover:bg-[#4c4c4c] active:bg-[#6f6f6f]",
        ghost:
          // Ghost: Transparent, Blue 60 text. Hover: Gray 20 background.
          "text-[#0f62fe] hover:bg-[#e0e0e0] hover:text-[#002d9c]",
        link: "text-[#0f62fe] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[48px] px-4 pr-16", // Carbon buttons are often wide or have specific right padding
        sm: "h-[32px] px-3 text-xs",
        lg: "h-[64px] px-6",
        icon: "h-[48px] w-[48px] justify-center pr-0", // Icon buttons square
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
