import { Bell, Settings } from "lucide-react";
import { Logo } from "./Logo";

export const TopNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Logo />
        <div className="flex gap-4">
          <Bell className="w-6 h-6 text-secondary" />
          <Settings className="w-6 h-6 text-secondary" />
        </div>
      </div>
    </div>
  );
};