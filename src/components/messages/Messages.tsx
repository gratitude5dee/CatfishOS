import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Star, CheckCircle, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export const Messages = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(10);

      if (error) {
        console.error("Error fetching profiles:", error);
        return;
      }

      if (data) {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, []);

  // Split profiles into new and existing
  const newMatches = profiles.slice(0, 1); // First match is considered new
  const existingMatches = profiles.slice(1); // Rest are existing matches

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-6 p-4">
        {/* New Matches Section */}
        <div>
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">New matches</h2>
          <div className="flex gap-4 mb-6">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-xl font-bold">
                  61
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                  <div className="bg-pink-500 rounded-full p-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-600">Likes</p>
            </div>
            {newMatches.map((profile) => (
              <div key={profile.id} className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={profile.photos?.[0] || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-gray-600">{profile.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Section */}
        <div>
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">Messages</h2>
          <div className="space-y-4">
            {existingMatches.map((profile) => (
              <Card key={profile.id} className="p-4 flex items-center gap-4 hover:bg-accent cursor-pointer">
                <div className="relative">
                  <img
                    src={profile.photos?.[0] || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{profile.name}</h3>
                    {profile.is_verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {profile.bio ? `← ${profile.bio.substring(0, 30)}...` : "No message yet"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};