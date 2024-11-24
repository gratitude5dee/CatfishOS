import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { Pencil, Star, Zap, Flame, Check, Minus } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2 text-white shadow-lg">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <div className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-3">
            10% COMPLETE
          </div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Test, 29
            <span className="text-gray-400">
              <Check className="w-5 h-5" />
            </span>
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-6">
        <Card className="p-4 text-center">
          <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-xl font-semibold">0</div>
          <div className="text-sm text-gray-600">Super Likes</div>
          <div className="text-blue-500 text-sm font-medium mt-1">GET MORE</div>
        </Card>
        <Card className="p-4 text-center">
          <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">My Boosts</div>
          <div className="text-purple-500 text-sm font-medium mt-1">GET MORE</div>
        </Card>
        <Card className="p-4 text-center">
          <Flame className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <div className="text-sm text-gray-600">Subscriptions</div>
        </Card>
      </div>

      {/* Tinder Plus Card */}
      <div className="px-4">
        <Card className="p-6 bg-gradient-to-r from-pink-50 to-pink-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-semibold">tinder</span>
              <span className="text-pink-500 text-xl font-semibold">+</span>
            </div>
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium">
              Upgrade
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">What's Included</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Unlimited Likes</span>
              <div className="flex gap-12">
                <Minus className="w-5 h-5 text-gray-400" />
                <Check className="w-5 h-5 text-pink-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Unlimited Rewinds</span>
              <div className="flex gap-12">
                <Minus className="w-5 h-5 text-gray-400" />
                <Check className="w-5 h-5 text-pink-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Passport</span>
              <div className="flex gap-12">
                <Minus className="w-5 h-5 text-gray-400" />
                <Check className="w-5 h-5 text-pink-500" />
              </div>
            </div>
          </div>

          <button className="w-full text-pink-500 font-medium text-center mt-6">
            See All Features
          </button>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;