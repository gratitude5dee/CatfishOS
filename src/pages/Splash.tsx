import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-gradient-from to-primary-gradient-to">
      <div className="flex flex-col items-center animate-fade-up">
        <Flame className="w-16 h-16 text-white mb-4" />
        <h1 className="text-4xl font-bold text-white">tinder</h1>
      </div>
    </div>
  );
};

export default Splash;