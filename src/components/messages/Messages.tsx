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

const mockMatches: Profile[] = [
  {
    name: "Fleur",
    photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330"],
    isVerified: false,
    isStarred: false
  },
  {
    name: "Elisa",
    photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb"],
    lastMessage: "When will u come",
    isVerified: false,
    isStarred: false
  },
  {
    name: "Lot",
    photos: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"],
    lastMessage: "Ik kan je ophalen en dan make...",
    isVerified: false,
    isStarred: true
  },
  {
    name: "Pippa",
    photos: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80"],
    lastMessage: "Wat bedoel je als het zo moet...",
    isVerified: true,
    isStarred: false
  },
  {
    name: "Nissa",
    photos: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2"],
    lastMessage: "A cote de la belgique",
    isVerified: true,
    isStarred: true
  }
];

export const Messages = () => {
  // Split matches into new and existing
  const newMatches = mockMatches.slice(0, 1); // First match is considered new
  const existingMatches = mockMatches.slice(1); // Rest are existing matches

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
            {existingMatches.map((profile) => (
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
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};