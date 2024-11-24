import { useState } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { ProfileInfo } from "./profile/ProfileInfo";
import { ProfileDetail } from "./profile/ProfileDetail";
import { ActionButtons } from "./profile/ActionButtons";
import { ChevronDown } from "lucide-react";

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
  lookingFor?: string;
  tags?: string[];
  gender?: string;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right" | "up") => void;
  onAction: (action: "rewind" | "reject" | "superlike" | "like" | "boost") => void;
  canRewind: boolean;
  isMatch?: boolean;
}

export const SwipeCard = ({ 
  profile, 
  onSwipe, 
  onAction,
  canRewind,
  isMatch = false 
}: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpIndicator, setShowUpIndicator] = useState(false);
  const controls = useAnimation();
  const overlayControls = useAnimation();

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragStart({ x: info.point.x, y: info.point.y });
    setRotation(0);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    
    const newRotation = (xOffset / window.innerWidth) * 20;
    setRotation(newRotation);

    // Show up indicator when dragging up
    setShowUpIndicator(yOffset < -50);

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

    setShowUpIndicator(false);

    if (Math.abs(xOffset) > 100 || Math.abs(velocity.x) > 500) {
      const direction = xOffset > 0 ? "right" : "left";
      await controls.start({
        x: direction === "right" ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else if (!isMatch && (yOffset < -100 || velocity.y < -500)) {
      setShowDetail(true);
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
    <>
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
        <div className="w-full h-full bg-black rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black z-10" />
          
          <img 
            src={profile.photos[0]} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />

          {/* Swipe Up Indicator */}
          <motion.div 
            className="absolute inset-x-0 top-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
            animate={{ 
              opacity: showUpIndicator ? 1 : 0,
              y: showUpIndicator ? -20 : 0
            }}
            initial={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-12 h-12 text-white transform rotate-180" />
            <p className="text-white text-lg font-medium mt-2">View Profile</p>
          </motion.div>

          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            animate={overlayControls}
            initial={{ opacity: 0, scale: 0.5 }}
          >
            <div className="relative">
              {rotation < 0 && (
                <div className="text-7xl font-bold text-pink-500 rotate-[-20deg] drop-shadow-lg">
                  NOPE
                </div>
              )}
              {rotation > 0 && (
                <div className="text-7xl font-bold text-green-500 rotate-[20deg] drop-shadow-lg">
                  LIKE
                </div>
              )}
            </div>
          </motion.div>

          <ProfileInfo profile={profile} />
          
          <ActionButtons onAction={onAction} canRewind={canRewind} />
        </div>
      </motion.div>

      {!isMatch && (
        <ProfileDetail
          profile={profile}
          open={showDetail}
          onOpenChange={setShowDetail}
        />
      )}
    </>
  );
};