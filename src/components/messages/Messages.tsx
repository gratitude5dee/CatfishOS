import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Star, CheckCircle, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

type Profile = Tables<"profiles">;

export const Messages = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(10);

      if (error) {
        console.error("Error fetching profiles:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profiles. Please try again.",
        });
        return;
      }

      if (data) {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, [toast]);

  const handleCreateChat = async (profile: Profile) => {
    // For demo purposes, we'll use a hardcoded profile_id_1
    // In a real app, this would be the current user's profile ID
    const myProfileId = profiles[0]?.id;
    
    if (!myProfileId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not create chat. Please try again.",
      });
      return;
    }

    // Check if chat already exists
    const { data: existingChat } = await supabase
      .from("chats")
      .select("*")
      .or(`profile_id_1.eq.${myProfileId},profile_id_2.eq.${myProfileId}`)
      .or(`profile_id_1.eq.${profile.id},profile_id_2.eq.${profile.id}`)
      .maybeSingle();

    if (existingChat) {
      toast({
        title: "Chat exists",
        description: "You already have a chat with this person.",
      });
      return;
    }

    // Create new chat
    const { error: chatError } = await supabase
      .from("chats")
      .insert({
        profile_id_1: myProfileId,
        profile_id_2: profile.id,
      });

    if (chatError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create chat. Please try again.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Chat created successfully!",
    });
  };

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
                <div 
                  className="w-20 h-20 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => handleCreateChat(profile)}
                >
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
              <Card 
                key={profile.id} 
                className="p-4 flex items-center gap-4 hover:bg-accent cursor-pointer"
                onClick={() => handleCreateChat(profile)}
              >
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