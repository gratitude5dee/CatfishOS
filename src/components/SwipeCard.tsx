import { useState } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Home, Camera, Ruler, Building, GraduationCap, User } from "lucide-react";
import { Badge } from "./ui/badge";

interface Profile {
  name: string;
  age: number;
  location: string;
  distance: string;
  bio: string;
  occupation: string;
  education: string;
  height: string;
  photos: string[];
  isVerified?: boolean;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = ({ profile, onSwipe }: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleDragStart = () => {
    setDragStart({ x: 0, y: 0 });
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? "right" : "left";
      await controls.start({
        x: direction === "right" ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute w-full h-full"
      style={{ touchAction: "none" }}
    >
      <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        <img 
          src={profile.photos[0]} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
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
      </div>
    </motion.div>
  );
};