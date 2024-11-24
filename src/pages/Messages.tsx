import { Messages } from "@/components/messages/Messages";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="pt-16 pb-20">
        <Messages />
      </main>
      <BottomNav />
    </div>
  );
};

export default MessagesPage;