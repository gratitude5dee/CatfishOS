import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { MessagesList } from "./MessagesList";
import { Chat } from "./Chat";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

export const Messages = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const [selectedChat, setSelectedChat] = useState<{ chatId: string; profile: Profile } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfilesAndMessages = async () => {
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
    const myProfileId = profiles[0]?.id;
    
    if (!myProfileId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not create chat. Please try again.",
      });
      return;
    }

    const { data: existingChat } = await supabase
      .from("chats")
      .select("*")
      .or(`profile_id_1.eq.${myProfileId},profile_id_2.eq.${myProfileId}`)
      .or(`profile_id_1.eq.${profile.id},profile_id_2.eq.${profile.id}`)
      .maybeSingle();

    if (existingChat) {
      setSelectedChat({ chatId: existingChat.id, profile });
      return;
    }

    const { data: newChat, error: chatError } = await supabase
      .from("chats")
      .insert({
        profile_id_1: myProfileId,
        profile_id_2: profile.id,
      })
      .select()
      .single();

    if (chatError || !newChat) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create chat. Please try again.",
      });
      return;
    }

    setSelectedChat({ chatId: newChat.id, profile });
  };

  if (selectedChat) {
    return (
      <Chat
        chatId={selectedChat.chatId}
        profile={selectedChat.profile}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return <MessagesList profiles={profiles} messages={messages} onChatCreate={handleCreateChat} />;
};