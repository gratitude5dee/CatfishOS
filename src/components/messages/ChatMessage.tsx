import { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type Profile = Tables<"profiles">;
type Message = Tables<"messages">;

interface ChatMessageProps {
  message: Message;
  profile: Profile;
  isCurrentUser: boolean;
}

export const ChatMessage = ({ message, profile, isCurrentUser }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-end gap-2 group animate-fade-up",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isCurrentUser && (
        <img
          src={profile.photos?.[0] || "/placeholder.svg"}
          alt={profile.name}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/10 animate-scale-in"
        />
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-2xl transition-all duration-200",
          "group-hover:shadow-sm animate-fade-up",
          isCurrentUser ? 
            "bg-primary text-white rounded-tr-none translate-x-0" : 
            "bg-gray-100 rounded-tl-none translate-x-0"
        )}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};