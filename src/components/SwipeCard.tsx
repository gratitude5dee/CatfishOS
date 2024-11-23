import { useState } from "react";
import { motion, PanInfo, useAnimation, AnimatePresence } from "framer-motion";
import { Home, Camera, Ruler, Building, GraduationCap, User, X, Heart, ChevronDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

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
}

export const SwipeCard = ({ profile, onSwipe }: SwipeCardProps) => {
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

    // Show detail view on upward swipe
    if (yOffset < -50) {
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
    } else if (yOffset < -100 || velocity.y < -500) {
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

      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>{profile.name}, {profile.age}</span>
              <button onClick={() => setShowDetail(false)} className="p-2">
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
    </>
  );
};