import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t bg-white sticky bottom-0 z-10 animate-fade-up">
      <div className="flex gap-2 items-center max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className="shrink-0 hover:bg-gray-100 transition-colors duration-200 hidden sm:flex"
          aria-label="Send GIF"
        >
          GIF
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button 
          onClick={handleSend} 
          size="icon"
          className={cn(
            "shrink-0 transition-all duration-200",
            message.trim() ? "opacity-100 scale-100" : "opacity-50 scale-95"
          )}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};