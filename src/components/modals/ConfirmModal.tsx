// import libraries
import { useState } from "react";

// import components
import { Button } from "@/components/general/Button";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md z-50" onClick={onCancel}>
      <div
        className="flex flex-col items-center justify-center bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-auto mt-20"
        onClick={handlePropagation}
      >
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center text-5xl text-purple-500 mb-4">
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-base text-gray-600 mt-2 text-center">{message}</p>
        </div>
        <div className="flex justify-center mt-2">
          <Button variant="secondary" className="mr-2" onClick={onCancel} disabled={isLoading}>
            Close
          </Button>
          <Button
            animated={false}
            className="ml-2 bg-purple-500 text-white hover:bg-purple-700 hover:scale-105  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={async () => { setIsLoading(true); await onConfirm(); setIsLoading(false); }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
