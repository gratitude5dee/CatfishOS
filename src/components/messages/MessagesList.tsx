import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CheckCircle, Star } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { MessagePreview } from "./MessagePreview";
import { NewMatchesList } from "./NewMatchesList";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

interface MessagesListProps {
  profiles: Profile[];
  messages: Record<string, Message>;
  onChatCreate: (profile: Profile) => void;
}

export const MessagesList = ({ profiles, messages, onChatCreate }: MessagesListProps) => {
  const newMatches = profiles.slice(0, 3);
  const existingMatches = profiles.slice(3);

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-6 p-3 sm:p-4">
        <NewMatchesList matches={newMatches} onChatCreate={onChatCreate} />

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-pink-500 mb-4">Messages</h2>
          <div className="space-y-2">
            {existingMatches.map((profile) => (
              <MessagePreview
                key={profile.id}
                profile={profile}
                lastMessage={messages[profile.id]}
                onClick={() => onChatCreate(profile)}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};