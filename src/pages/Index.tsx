import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { SwipeCard } from "@/components/SwipeCard";
import { useToast } from "@/components/ui/use-toast";

// Mock data - in a real app this would come from an API
const mockProfiles = [
  {
    name: "Alyssa",
    age: 23,
    location: "Tempe",
    distance: "8 miles away",
    bio: "Looking for my person!",
    occupation: "Software Engineer",
    education: "ASU",
    height: "5'5\"",
    photos: ["/placeholder.svg"],
    isVerified: true
  },
  // Add more mock profiles as needed
];

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const { toast } = useToast();

  const handleSwipe = (direction: "left" | "right") => {
    toast({
      title: direction === "right" ? "Liked!" : "Passed",
      description: direction === "right" 
        ? "We'll let them know you're interested!" 
        : "Maybe next time!",
      duration: 1500
    });

    setCurrentProfileIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto h-[calc(100vh-9rem)]">
          <div className="relative w-full h-full">
            {currentProfileIndex < mockProfiles.length ? (
              <SwipeCard 
                profile={mockProfiles[currentProfileIndex]}
                onSwipe={handleSwipe}
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