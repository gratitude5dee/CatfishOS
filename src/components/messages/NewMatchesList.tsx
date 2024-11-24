import { Heart } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { NewMatchCard } from "./NewMatchCard";

type Profile = Tables<"profiles">;

interface NewMatchesListProps {
  matches: Profile[];
  onChatCreate: (profile: Profile) => void;
}

export const NewMatchesList = ({ matches, onChatCreate }: NewMatchesListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-pink-500 mb-4">New matches</h2>
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        <div className="text-center flex-shrink-0">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
              {matches.length}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
              <div className="bg-pink-500 rounded-full p-1">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Likes</p>
        </div>
        {matches.map((profile) => (
          <NewMatchCard
            key={profile.id}
            profile={profile}
            onClick={() => onChatCreate(profile)}
          />
        ))}
      </div>
    </div>
  );
};