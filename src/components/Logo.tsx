import { Flame } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Flame className="w-8 h-8 text-primary" />
      <span className="text-2xl font-semibold text-primary">tinder</span>
    </div>
  );
};