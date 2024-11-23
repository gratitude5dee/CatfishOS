import { ChevronDown, Camera, Home, User, Ruler, Building, GraduationCap } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

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
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{profile.name}, {profile.age}</span>
            <button onClick={() => onOpenChange(false)} className="p-2">
              <ChevronDown className="w-6 h-6" />
            </button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Looking For Section */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Looking For</h3>
            <p>{profile.lookingFor}</p>
          </Card>

          {/* About Me Section */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">About Me</h3>
            <p>{profile.bio}</p>
          </Card>

          {/* Essentials Section */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Essentials</h3>
            <div className="space-y-3">
              {profile.isVerified && (
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  <span>Photo Verified</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{profile.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                <span>{profile.height}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>{profile.occupation}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>{profile.education}</span>
              </div>
            </div>
          </Card>

          {/* Tags Section */}
          {profile.tags && profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
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