import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface Profile {
  name: string;
  age: number;
  photos: string[];
  lastMessage?: string;
}

interface MessagesProps {
  matches: Profile[];
}

export const Messages = ({ matches }: MessagesProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-4 p-4">
        {matches.length === 0 ? (
          <div className="text-center text-muted-foreground p-8">
            <p>No matches yet! Start swiping to connect with people.</p>
          </div>
        ) : (
          matches.map((profile) => (
            <Card key={profile.name} className="p-4 flex items-center gap-4 hover:bg-accent cursor-pointer">
              <img
                src={profile.photos[0]}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{profile.name}, {profile.age}</h3>
                {profile.lastMessage && (
                  <p className="text-sm text-muted-foreground">{profile.lastMessage}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
};