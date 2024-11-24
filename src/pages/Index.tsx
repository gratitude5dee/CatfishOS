import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { SwipeCard } from "@/components/SwipeCard";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const { toast } = useToast();

  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSwipe = async (direction: "left" | "right" | "up") => {
    if (!profiles || currentProfileIndex >= profiles.length) return;

    const currentProfile = profiles[currentProfileIndex];
    let message = "";

    switch (direction) {
      case "right":
        // Create a chat when there's a match
        const { error: chatError } = await supabase
          .from('chats')
          .insert({
            profile_id_1: profiles[0]?.id, // Current user's profile
            profile_id_2: currentProfile.id, // Matched profile
          });

        if (chatError) {
          console.error('Error creating chat:', chatError);
          message = "Couldn't create chat. Please try again.";
        } else {
          message = "It's a match! You can now message each other!";
        }
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

  const handleAction = (action: "rewind" | "reject" | "superlike" | "like" | "boost") => {
    let message = "";

    switch (action) {
      case "rewind":
        if (currentProfileIndex > 0) {
          setCurrentProfileIndex(prev => prev - 1);
          message = "Rewinding to previous profile";
        } else {
          message = "No more profiles to rewind to";
        }
        break;
      case "reject":
        message = "Passed. Maybe next time!";
        setCurrentProfileIndex(prev => prev + 1);
        break;
      case "superlike":
        message = "Super Liked! They'll definitely see this!";
        setCurrentProfileIndex(prev => prev + 1);
        break;
      case "like":
        message = "It's a match! You can now message each other!";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-500">Loading profiles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading profiles</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto h-[calc(100vh-9rem)]">
          <div className="relative w-full h-full">
            {profiles && currentProfileIndex < profiles.length ? (
              <SwipeCard 
                key={currentProfileIndex}
                profile={profiles[currentProfileIndex]}
                onSwipe={handleSwipe}
                onAction={handleAction}
                canRewind={currentProfileIndex > 0}
              />
            ) : (
              <div className="w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <p className="text-gray-500">No more profiles to show</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;