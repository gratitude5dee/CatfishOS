import { Card } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

interface MessagePreviewProps {
  profile: Profile;
  lastMessage?: Message;
  onClick: () => void;
}

export const MessagePreview = ({ profile, lastMessage, onClick }: MessagePreviewProps) => {
  return (
    <Card 
      className={cn(
        "p-4 flex items-center gap-4 hover:bg-accent cursor-pointer transition-colors",
        "animate-fade-in"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={profile.photos?.[0] || "/placeholder.svg"}
          alt={profile.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        {profile.is_verified && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-base">{profile.name}</h3>
          <span className="text-sm text-muted-foreground">• {profile.distance}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {lastMessage?.content || "No messages yet"}
        </p>
      </div>
    </Card>
  );
};