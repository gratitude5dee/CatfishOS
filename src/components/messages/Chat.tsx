import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, ArrowLeft, Shield, Video } from "lucide-react";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

interface ChatProps {
  chatId: string;
  profile: Profile;
  onBack: () => void;
}

export const Chat = ({ chatId, profile, onBack }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load messages",
        });
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, toast]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("messages").insert({
      chat_id: chatId,
      content: newMessage,
      sender_id: profile.id, // For demo purposes
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
      return;
    }

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1 flex items-center gap-3">
          <img
            src={profile.photos?.[0] || "/placeholder.svg"}
            alt={profile.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.distance}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Shield className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === profile.id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.sender_id === profile.id
                  ? "bg-gray-100"
                  : "bg-pink-500 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};