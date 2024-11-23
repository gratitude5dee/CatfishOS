import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Star, CheckCircle, Heart } from "lucide-react";

interface Profile {
  name: string;
  age?: number;
  photos: string[];
  lastMessage?: string;
  isVerified?: boolean;
  isStarred?: boolean;
}

interface MessagesProps {
  matches: Profile[];
}

export const Messages = ({ matches }: MessagesProps) => {
  // Split matches into new and existing
  const newMatches = matches.slice(0, 2); // First 2 matches are considered new
  const existingMatches = matches.slice(2);

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
                  {matches.length}
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
              <div key={profile.name} className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={profile.photos[0]}
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
            {existingMatches.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">
                <p>No messages yet! Start chatting with your matches.</p>
              </div>
            ) : (
              existingMatches.map((profile) => (
                <Card key={profile.name} className="p-4 flex items-center gap-4 hover:bg-accent cursor-pointer">
                  <div className="relative">
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{profile.name}</h3>
                      {profile.isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                      {profile.isStarred && <Star className="w-4 h-4 text-yellow-500" />}
                    </div>
                    {profile.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">
                        ← {profile.lastMessage}
                      </p>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
