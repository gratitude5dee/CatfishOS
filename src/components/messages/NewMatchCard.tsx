import { CheckCircle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

interface NewMatchCardProps {
  profile: Profile;
  onClick: () => void;
}

export const NewMatchCard = ({ profile, onClick }: NewMatchCardProps) => {
  return (
    <div className="text-center flex-shrink-0">
      <div 
        className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all"
        onClick={onClick}
      >
        <img
          src={profile.photos?.[0] || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        {profile.is_verified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">{profile.name}</p>
    </div>
  );
};