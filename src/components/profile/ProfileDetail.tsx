import { ChevronDown, Camera, Home, User, Ruler, Building, GraduationCap } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent } from "../ui/sheet";

interface Profile {
  name: string;
  age: number;
  location: string;
  distance: string;
  bio: string;
  occupation: string;
  education: string;
  height: string;
  isVerified?: boolean;
  lookingFor?: string;
  tags?: string[];
}

interface ProfileDetailProps {
  profile: Profile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileDetail = ({ profile, open, onOpenChange }: ProfileDetailProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] sm:h-[90vh] overflow-y-auto rounded-t-[20px] p-0"
      >
        <div className="sticky top-0 z-10 bg-background pt-2 px-3 sm:px-4 pb-4 border-b">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {profile.name}, {profile.age}
              </h2>
              {profile.occupation && (
                <p className="text-muted-foreground text-sm sm:text-base">{profile.occupation}</p>
              )}
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4">
          {profile.lookingFor && (
            <Card className="p-3 sm:p-4 border-none shadow-none bg-gray-50">
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Looking For</h3>
              <p className="text-gray-700 text-sm sm:text-base">{profile.lookingFor}</p>
            </Card>
          )}

          <Card className="p-3 sm:p-4 border-none shadow-none bg-gray-50">
            <h3 className="font-semibold mb-2 text-base sm:text-lg">About Me</h3>
            <p className="text-gray-700 text-sm sm:text-base">{profile.bio}</p>
          </Card>

          <Card className="p-3 sm:p-4 border-none shadow-none bg-gray-50">
            <h3 className="font-semibold mb-4 text-base sm:text-lg">Essentials</h3>
            <div className="space-y-4">
              {profile.isVerified && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-gray-700">Photo Verified</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Home className="w-5 h-5 text-gray-500" />
                </div>
                <span className="text-gray-700">Lives in {profile.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <span className="text-gray-700">{profile.distance}</span>
              </div>
              {profile.height && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-gray-700">{profile.height}</span>
                </div>
              )}
              {profile.occupation && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Building className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-gray-700">{profile.occupation}</span>
                </div>
              )}
              {profile.education && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-gray-700">{profile.education}</span>
                </div>
              )}
            </div>
          </Card>

          {profile.tags && profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
