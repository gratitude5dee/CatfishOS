import { Home, Building, GraduationCap, Ruler, User, Camera } from "lucide-react";
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
    <div className="absolute bottom-20 left-0 right-0 p-6 text-white z-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-4xl font-bold">{profile.name}</h2>
        <span className="text-3xl">{profile.age}</span>
        {profile.isVerified && (
          <Badge className="bg-blue-500/90 text-white border-none px-3 py-1">
            <Camera className="w-4 h-4 mr-1.5" />
            Verified
          </Badge>
        )}
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <Home className="w-5 h-5" />
          <span className="text-lg">Lives in {profile.location}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Building className="w-5 h-5" />
          <span className="text-lg">{profile.occupation}</span>
        </div>
        
        {profile.education && (
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5" />
            <span className="text-lg">{profile.education}</span>
          </div>
        )}
        
        {profile.height && (
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5" />
            <span className="text-lg">{profile.height}</span>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <User className="w-5 h-5" />
          <span className="text-lg">{profile.distance}</span>
        </div>
      </div>
    </div>
  );
};