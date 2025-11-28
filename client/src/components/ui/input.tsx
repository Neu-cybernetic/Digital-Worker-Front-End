import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <input
          type={type}
          className={cn(
            // Carbon Input:
            // - Height 40px (sm) or 48px (md/lg)
            // - Background: Gray 10 (#f4f4f4)
            // - Border: Bottom only, Gray 60 (#8d8d8d) or Transparent initially with Gray 10 background?
            // - Carbon inputs usually have a bottom border.
            // - Focus: Outline 2px Blue 60.
            "flex h-[40px] w-full bg-[#f4f4f4] border-b border-[#8d8d8d] px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#525252] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62fe] disabled:cursor-not-allowed disabled:opacity-50 text-[#161616]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
