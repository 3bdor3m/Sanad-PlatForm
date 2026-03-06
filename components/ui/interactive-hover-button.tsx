import React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-[#17e596]/30 bg-[#0f1621] px-8 py-3.5 text-center font-bold text-white text-[1rem] flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <span className="inline-block transition-all duration-300 group-hover:-translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full -translate-x-12 items-center justify-center gap-2 text-[#0f1621] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowLeft size={18} />
      </div>
      <div className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 scale-[1] rounded-full bg-[#17e596] transition-all duration-400 ease-in-out group-hover:right-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-[#17e596] group-hover:translate-y-0"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
