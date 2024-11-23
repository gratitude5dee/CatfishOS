import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Star, CheckCircle, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

export const Messages = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfilesAndMessages = async () => {
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .limit(10);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profiles. Please try again.",
        });
        return;
      }

      if (profilesData) {
        setProfiles(profilesData);

        // Fetch latest message for each profile
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select(`
            id,
            content,
            chat_id,
            sender_id,
            created_at
          `)
          .order('created_at', { ascending: false });

        if (messagesError) {
          console.error("Error fetching messages:", messagesError);
          return;
        }

        if (messagesData) {
          const latestMessages: Record<string, Message> = {};
          messagesData.forEach((message) => {
            if (!latestMessages[message.sender_id!]) {
              latestMessages[message.sender_id!] = message;
            }
          });
          setMessages(latestMessages);
        }
      }
    };

    fetchProfilesAndMessages();
  }, [toast]);

  const handleCreateChat = async (profile: Profile) => {
    // For demo purposes, we'll use the first profile as the current user
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

  // Split profiles into new and existing matches
  const newMatches = profiles.slice(0, 3); // First 3 matches are considered new
  const existingMatches = profiles.slice(3); // Rest are existing matches

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-6 p-4">
        {/* New Matches Section */}
        <div>
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">New matches</h2>
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            <div className="text-center flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
                  {profiles.length}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                  <div className="bg-pink-500 rounded-full p-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">Likes</p>
            </div>
            {newMatches.map((profile) => (
              <div key={profile.id} className="text-center flex-shrink-0">
                <div 
                  className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => handleCreateChat(profile)}
                >
                  <img
                    src={profile.photos?.[0] || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  {profile.is_verified && (
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{profile.name}</p>
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
                  {profile.is_verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{profile.name}</h3>
                    <span className="text-sm text-muted-foreground">• {profile.distance}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {messages[profile.id]?.content || "No messages yet"}
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