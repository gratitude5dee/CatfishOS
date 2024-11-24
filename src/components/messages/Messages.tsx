import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { MessagesList } from "./MessagesList";

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
          .select("*")
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

  return <MessagesList profiles={profiles} messages={messages} onChatCreate={handleCreateChat} />;
};