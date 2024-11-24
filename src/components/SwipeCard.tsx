import { useState } from "react";
import { motion, PanInfo, useAnimation, AnimatePresence } from "framer-motion";
import { ProfileInfo } from "./profile/ProfileInfo";
import { ProfileDetail } from "./profile/ProfileDetail";

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
  isMatch?: boolean;
}

export const SwipeCard = ({ profile, onSwipe, isMatch = false }: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
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

    if (Math.abs(xOffset) > 50) {
      overlayControls.start({
        opacity: Math.min(Math.abs(xOffset) / 100, 1),
        scale: Math.min(Math.abs(xOffset) / 100 + 0.5, 1),
      });
    } else {
      overlayControls.start({ opacity: 0, scale: 0.5 });
    }

    if (yOffset < -50 && !isMatch) {
      setShowDetail(true);
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
      <AnimatePresence mode="wait">
        <motion.div
          key={profile.name}
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
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

            <ProfileInfo profile={profile} />
          </div>
        </motion.div>
      </AnimatePresence>

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