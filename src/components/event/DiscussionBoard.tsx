// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import components
import ChatLine from "./ChatLine";
import { Button } from "@/components/general/Button";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";


function DiscussionBoard({
  chatLog,
  refreshHandler,
  eventID,
}: {
  chatLog: any;
  refreshHandler: (abortSignal: AbortSignal | undefined) => Promise<boolean>;
  eventID: string;
}) {
  // Interface control hooks
  const chatLogRef = useRef<HTMLDivElement>(null);
  const [disableSend, setDisableSend] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  // Data hooks
  const [message, setMessage] = useState<string>("");
  // Navigate hook
  const navigate = useNavigate();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      setIsLoading(true);
      await handleSendMessage(message, new Date().toISOString());
      setIsLoading(false);
    }
  };

  async function handleSendMessage(message: string, timestamp: string) {
    setDisableSend(true);

    try {
      const queryParams = new URLSearchParams({
        id: eventID || "",
      });

      const response = await fetch(`http://localhost:3000/user-data/message?${queryParams.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          eventID: eventID,
          timestamp: timestamp,
        }),
        credentials: "include",
      });

      if (response.status == 200) {
        setMessage("");
        refreshHandler(undefined);
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  // Scroll to the bottom of the chat log whenever chat log changes
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mt-10 ">
        <h1 className="text-2xl font-semibold mb-6 ">Discussion board</h1>
        <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={async () => {
              setIsLoading(true);
              await refreshHandler(undefined);
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/*Chat log display section*/}
      <div className="grid grid-cols-1 gap-4 bg-white rounded-xl border border-gray-300 shadow-md p-4">
        <div ref={chatLogRef} className="overflow-y-auto h-100">
          {chatLog.map((comment: any, index: any) => (
            <ChatLine
              key={index}
              sender={comment.sender}
              senderName={comment.senderName}
              message={comment.message}
              timestamp={comment.timestamp}
            />
          ))}
        </div>

        {/* Add Comment Section */}
        <div className="flex items-center mt-8 rounded-full border border-gray-200 px-4 py-2 shadow-sm w-full bg-white focus-within:border-gray-600">
          <label htmlFor="comment" className="text-gray-400 mr-2">
            Aa
          </label>
          <input
            id="comment"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.length > 0) {
                setDisableSend(false);
              } else {
                setDisableSend(true);
              }
            }}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Write reply..."
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
          />
          <Button
            variant="ghost"
            onClick={async () => {
              setIsLoading(true);
              await handleSendMessage(message, new Date().toISOString());
              setIsLoading(false);
            }}
            disabled={disableSend || isLoading}
          >
            <FontAwesomeIcon
              icon={faCommentDots}
              className="text-gray-400 ml-2"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DiscussionBoard;
