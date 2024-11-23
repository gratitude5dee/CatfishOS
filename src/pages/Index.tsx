import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 aspect-[3/4] flex items-center justify-center">
            <p className="text-gray-500">No more profiles to show</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;