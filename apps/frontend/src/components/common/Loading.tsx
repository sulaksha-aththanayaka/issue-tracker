import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({ message = "Synchronizing Tasks", fullScreen }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-300",
        fullScreen
          ? "h-screen w-full bg-gradient-to-br from-[#29235C] to-[#52537E]"
          : "absolute inset-0 z-20 bg-white/5 backdrop-blur-[2px] rounded-[28px]",
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Only show the decorative rings in full-screen mode to keep the overlay clean */}
        {fullScreen && (
          <>
            <div className="absolute h-24 w-24 rounded-full border-2 border-white/5 animate-pulse" />
            <div className="absolute h-32 w-32 rounded-full border border-white/5 animate-ping" />
          </>
        )}

        {/* Use a slightly smaller loader for the overlay mode */}
        <Loader2
          className={cn("text-white animate-spin relative z-10", fullScreen ? "h-12 w-12" : "h-8 w-8 text-indigo-500")}
        />
      </div>

      <p
        className={cn(
          "mt-6 font-medium tracking-widest uppercase text-xs animate-pulse",
          fullScreen
            ? "text-white/70"
            : "text-indigo-600 bg-white px-4 py-2 rounded-full shadow-lg border border-indigo-100",
        )}
      >
        {message}
      </p>
    </div>
  );
};

export default Loading;
