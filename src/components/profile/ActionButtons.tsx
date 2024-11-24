import { Undo, X, Star, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  onAction: (action: "rewind" | "reject" | "superlike" | "like" | "boost") => void;
  canRewind: boolean;
}

export const ActionButtons = ({ onAction, canRewind }: ActionButtonsProps) => {
  const buttonClasses = "flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110";
  
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-4">
      <button
        onClick={() => onAction("rewind")}
        className={cn(
          buttonClasses,
          "w-12 h-12 bg-white/90 text-yellow-500 disabled:opacity-50 disabled:hover:scale-100",
        )}
        disabled={!canRewind}
      >
        <Undo className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => onAction("reject")}
        className={cn(
          buttonClasses,
          "w-14 h-14 bg-white/90 text-pink-500"
        )}
      >
        <X className="w-8 h-8" />
      </button>
      
      <button
        onClick={() => onAction("superlike")}
        className={cn(
          buttonClasses,
          "w-12 h-12 bg-white/90 text-blue-500"
        )}
      >
        <Star className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => onAction("like")}
        className={cn(
          buttonClasses,
          "w-14 h-14 bg-white/90 text-green-500"
        )}
      >
        <Heart className="w-8 h-8" />
      </button>
      
      <button
        onClick={() => onAction("boost")}
        className={cn(
          buttonClasses,
          "w-12 h-12 bg-white/90 text-purple-500"
        )}
      >
        <Zap className="w-6 h-6" />
      </button>
    </div>
  );
};