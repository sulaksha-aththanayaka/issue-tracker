import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1640] to-[#29235C] p-6 text-center">
      <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">System Error</h2>
      <p className="text-white/60 max-w-md mb-8">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-8"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;
