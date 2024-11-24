import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { SwipeCard } from "@/components/SwipeCard";
import { Messages } from "@/components/messages/Messages";
import { useToast } from "@/components/ui/use-toast";
import { Undo, X, Star, Heart, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

type Profile = Tables<"profiles">;

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);
  const { toast } = useToast();

  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleSwipe = (direction: "left" | "right" | "up") => {
    if (!profiles) return;
    
    let message = "";
    const currentProfile = profiles[currentProfileIndex];

    switch (direction) {
      case "right":
        message = "It's a match! You can now message each other!";
        setMatches(prev => [...prev, currentProfile]);
        break;
      case "left":
        message = "Passed. Maybe next time!";
        break;
      case "up":
        message = "Opening detailed view...";
        break;
    }

    toast({
      title: direction === "right" ? "Match!" : direction === "left" ? "Passed" : "Details",
      description: message,
      duration: 1500
    });

    if (direction !== "up") {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  const handleButtonClick = (action: "rewind" | "reject" | "superlike" | "like" | "boost") => {
    if (!profiles) return;
    
    let direction: "left" | "right" = "left";
    let message = "";
    const currentProfile = profiles[currentProfileIndex];

    switch (action) {
      case "rewind":
        setCurrentProfileIndex(prev => Math.max(0, prev - 1));
        message = "Rewinding to previous profile";
        break;
      case "reject":
        direction = "left";
        message = "Passed. Maybe next time!";
        setCurrentProfileIndex(prev => prev + 1);
        break;
      case "superlike":
        direction = "right";
        message = "Super Liked! They'll definitely see this!";
        setMatches(prev => [...prev, currentProfile]);
        setCurrentProfileIndex(prev => prev + 1);
        break;
      case "like":
        direction = "right";
        message = "It's a match! You can now message each other!";
        setMatches(prev => [...prev, currentProfile]);
        setCurrentProfileIndex(prev => prev + 1);
        break;
      case "boost":
        message = "Boosting your profile!";
        break;
    }

    toast({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      description: message,
      duration: 1500
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading profiles</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="relative pt-16 pb-20 h-[calc(100vh-8rem)]">
        <div className="max-w-md mx-auto h-full px-4 relative">
          {window.location.pathname === "/messages" ? (
            <Messages />
          ) : (
            <div className="relative w-full h-full">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : profiles && profiles.length > 0 && currentProfileIndex < profiles.length ? (
                <SwipeCard 
                  profile={profiles[currentProfileIndex]}
                  onSwipe={handleSwipe}
                  isMatch={matches.some(m => m.id === profiles[currentProfileIndex].id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">No more profiles to show</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 px-4">
                <button
                  onClick={() => handleButtonClick("rewind")}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading || !profiles?.length}
                >
                  <Undo className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleButtonClick("reject")}
                  className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors"
                  disabled={isLoading || !profiles?.length}
                >
                  <X className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleButtonClick("superlike")}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors"
                  disabled={isLoading || !profiles?.length}
                >
                  <Star className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleButtonClick("like")}
                  className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 hover:text-green-600 transition-colors"
                  disabled={isLoading || !profiles?.length}
                >
                  <Heart className="w-8 h-8" />
                </button>
                <button
                  onClick={() => handleButtonClick("boost")}
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-500 hover:text-purple-600 transition-colors"
                  disabled={isLoading || !profiles?.length}
                >
                  <Zap className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;