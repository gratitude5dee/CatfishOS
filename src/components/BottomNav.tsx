import { Flame, Search, Star, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Flame, path: "/", label: "Discover" },
    { icon: Search, path: "/search", label: "Search" },
    { icon: Star, path: "/favorites", label: "Favorites" },
    { icon: MessageCircle, path: "/messages", label: "Messages" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map(({ icon: Icon, path, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 ${
              location.pathname === path ? "text-pink-500" : "text-gray-500"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};