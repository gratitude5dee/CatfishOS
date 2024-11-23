import { Home, Camera, Ruler, Building, GraduationCap, User } from "lucide-react";
import { Badge } from "../ui/badge";

interface ProfileInfoProps {
  profile: {
    name: string;
    age: number;
    location: string;
    occupation: string;
    education?: string;
    height?: string;
    distance: string;
    isVerified?: boolean;
  };
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-3xl font-bold">{profile.name}</h2>
        <span className="text-2xl">{profile.age}</span>
        {profile.isVerified && (
          <Badge variant="secondary" className="bg-blue-500">
            <Camera className="w-4 h-4 mr-1" />
            Verified
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Home className="w-4 h-4" />
          <span>Lives in {profile.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building className="w-4 h-4" />
          <span>{profile.occupation}</span>
        </div>
        {profile.education && (
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>{profile.education}</span>
          </div>
        )}
        {profile.height && (
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="w-4 h-4" />
            <span>{profile.height}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>{profile.distance}</span>
        </div>
      </div>
    </div>
  );
};