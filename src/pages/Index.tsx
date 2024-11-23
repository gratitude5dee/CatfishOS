import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { SwipeCard } from "@/components/SwipeCard";
import { Messages } from "@/components/messages/Messages";
import { useToast } from "@/components/ui/use-toast";
import { Undo, X, Star, Heart, Zap } from "lucide-react";

const mockProfiles = [
  {
    name: "Alyssa",
    age: 23,
    location: "Tempe",
    distance: "8 miles away",
    bio: "Looking for my person! My faith (Christian) is important to me and should be for my partner as well! Hoping to grow together and go on countless adventures!! 👩‍❤️‍👨",
    occupation: "Software Engineer",
    education: "ASU",
    height: "5'5\"",
    photos: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7"],
    isVerified: true,
    lookingFor: "Long-term partner",
    tags: ["Monogamy", "Christian"],
    gender: "Woman"
  },
  {
    name: "Sarah",
    age: 25,
    location: "Phoenix",
    distance: "12 miles away",
    bio: "Tech enthusiast and coffee lover. Always up for hiking adventures!",
    occupation: "UX Designer",
    education: "UCLA",
    height: "5'6\"",
    photos: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"],
    isVerified: true,
    lookingFor: "Long-term partner",
    tags: ["Active", "Coffee lover"],
    gender: "Woman"
  },
  {
    name: "Emily",
    age: 24,
    location: "Scottsdale",
    distance: "5 miles away",
    bio: "Passionate about technology and innovation. Looking for someone to share adventures with!",
    occupation: "Tech Lead",
    education: "Stanford",
    height: "5'4\"",
    photos: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"],
    isVerified: true,
    lookingFor: "Serious relationship",
    tags: ["Tech", "Adventure"],
    gender: "Woman"
  },
  // ... Add 9 more profiles with similar structure but different details
];

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<typeof mockProfiles>([]);
  const { toast } = useToast();

  const handleSwipe = (direction: "left" | "right" | "up") => {
    let message = "";
    const currentProfile = mockProfiles[currentProfileIndex];

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
    let direction: "left" | "right" = "left";
    let message = "";
    const currentProfile = mockProfiles[currentProfileIndex];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto h-[calc(100vh-9rem)]">
          {window.location.pathname === "/messages" ? (
            <Messages matches={matches} />
          ) : (
            <div className="relative w-full h-full">
              {currentProfileIndex < mockProfiles.length ? (
                <SwipeCard 
                  profile={mockProfiles[currentProfileIndex]}
                  onSwipe={handleSwipe}
                  isMatch={matches.some(m => m.name === mockProfiles[currentProfileIndex].name)}
                />
              ) : (
                <div className="w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <p className="text-gray-500">No more profiles to show</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
            <button
              onClick={() => handleButtonClick("rewind")}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Undo className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleButtonClick("reject")}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-pink-500 hover:text-pink-600 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={() => handleButtonClick("superlike")}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Star className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleButtonClick("like")}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 hover:text-green-600 transition-colors"
            >
              <Heart className="w-8 h-8" />
            </button>
            <button
              onClick={() => handleButtonClick("boost")}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-purple-500 hover:text-purple-600 transition-colors"
            >
              <Zap className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;