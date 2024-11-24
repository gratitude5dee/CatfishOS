import { Bell, Settings } from "lucide-react";
import { Logo } from "./Logo";

export const TopNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Logo />
        <div className="flex gap-3 sm:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-secondary" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};