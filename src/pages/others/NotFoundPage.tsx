import { Button } from "@/components/general/Button";
import { useNavigate } from "react-router-dom";

function NotFoundPage({ returnTo }: { returnTo: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-400 font-sans text-center relative">
      <div>
        <h1 className="text-7xl font-bold text-yellow-300 drop-shadow-md">
          404
        </h1>
        <p className="text-2xl text-gray-200 mt-4">Content Not Found 😓</p>
        <p className="text-base text-gray-300 mt-2 max-w-md">
          The URL for this content has changed or no longer exists. <br />
          If you saved this URL, try accessing it from the homepage instead.
        </p>
        <Button
          onClick={() => navigate(returnTo)}
          variant="default"
          size="default"
          className="mt-6 px-6 py-3 text-gray-800 bg-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 hover:scale-105 transition-all duration-200"
        >
          Back to Homepage
        </Button>
      </div>
      <p className="absolute bottom-4 text-sm text-gray-300">
        ©2025 Vai Gay Team
      </p>
    </div>
  );
}

export default NotFoundPage;
