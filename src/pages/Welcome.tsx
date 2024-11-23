import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Link to="/">
            <X className="w-6 h-6 text-secondary" />
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">Welcome to Tinder.</h1>
        <p className="text-xl text-gray-600 mb-8">Please follow these House Rules.</p>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Be yourself.</h2>
            <p className="text-gray-600">Make sure your photos, age, and bio are true to who you are.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Stay safe.</h2>
            <p className="text-gray-600">Don't be too quick to give out personal information. <Link to="/safety" className="text-blue-500">Date Safely</Link></p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Play it cool.</h2>
            <p className="text-gray-600">Respect others and treat them as you would like to be treated.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Be proactive.</h2>
            <p className="text-gray-600">Always report bad behavior.</p>
          </div>
        </div>

        <Link 
          to="/"
          className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-white py-4 px-8 rounded-full text-center text-lg font-semibold"
        >
          I agree
        </Link>
      </div>
    </div>
  );
};

export default Welcome;