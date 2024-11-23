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
  onSwipe: (direction: "left" | "right" | "up") => void;
}

export const SwipeCard = ({ profile, onSwipe }: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const overlayControls = useAnimation();

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragStart({ x: info.point.x, y: info.point.y });
    setRotation(0);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    
    // Calculate rotation based on drag distance
    const newRotation = (xOffset / window.innerWidth) * 20;
    setRotation(newRotation);

    // Show overlay based on drag direction
    if (Math.abs(xOffset) > 50) {
      overlayControls.start({
        opacity: Math.min(Math.abs(xOffset) / 100, 1),
        scale: Math.min(Math.abs(xOffset) / 100 + 0.5, 1),
      });
    } else {
      overlayControls.start({ opacity: 0, scale: 0.5 });
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    const velocity = info.velocity;

    if (Math.abs(xOffset) > 100 || Math.abs(velocity.x) > 500) {
      const direction = xOffset > 0 ? "right" : "left";
      await controls.start({
        x: direction === "right" ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else if (yOffset < -100 || velocity.y < -500) {
      await controls.start({
        y: -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe("up");
    } else {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      });
      overlayControls.start({ opacity: 0, scale: 0.5 });
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ rotate: 0 }}
      style={{ 
        rotate: rotation,
        touchAction: "none"
      }}
      className="absolute w-full h-full"
    >
      <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
        
        <img 
          src={profile.photos[0]} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay animations */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          animate={overlayControls}
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <div className="relative">
            {rotation < 0 && (
              <div className="text-6xl font-bold text-pink-500 rotate-[-20deg] stroke-black">
                NOPE
              </div>
            )}
            {rotation > 0 && (
              <div className="text-6xl font-bold text-green-500 rotate-[20deg] stroke-black">
                LIKE
              </div>
            )}
          </div>
        </motion.div>

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
      </div>
    </motion.div>
  );
};