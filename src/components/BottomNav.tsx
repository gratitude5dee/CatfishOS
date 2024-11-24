import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center text-xs sm:text-sm p-2",
            isActive("/") ? "text-pink-500" : "text-gray-500"
          )}
        >
          <Home className="w-6 h-6 mb-1" />
          <span>Home</span>
        </Link>
        <Link
          to="/messages"
          className={cn(
            "flex flex-col items-center text-xs sm:text-sm p-2",
            isActive("/messages") ? "text-pink-500" : "text-gray-500"
          )}
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          <span>Messages</span>
        </Link>
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center text-xs sm:text-sm p-2",
            isActive("/profile") ? "text-pink-500" : "text-gray-500"
          )}
        >
          <User className="w-6 h-6 mb-1" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};