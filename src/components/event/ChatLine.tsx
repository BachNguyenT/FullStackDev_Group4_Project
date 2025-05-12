// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { fetchUserPFP } from "@/api/user-services";
import { FetchStatus } from "@/enum.ts";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";

function ChatLine({ sender, senderName, message, timestamp }: {
  sender: string;
  senderName: string;
  message: string;
  timestamp: string;
}) {
  const [avatarURL, setAvatarURL] = useState<string>(pfpPlaceholder);
  const avatarURLRef = useRef<string>(pfpPlaceholder);
  const navigate = useNavigate();

  async function loadPfp(abortSignal: AbortSignal) {
    const fetchResult = await fetchUserPFP(abortSignal, sender);
    if (fetchResult.status === FetchStatus.SUCCESS) {
      if (fetchResult.result) {
        setAvatarURL(fetchResult.result);
        avatarURLRef.current = fetchResult.result;
      }
    } else if (fetchResult.status === FetchStatus.UNAUTHORIZED) {
      console.log("Session expired. Please log in again.");
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    loadPfp(abortController.signal);

    return () => {
      if (avatarURLRef.current != pfpPlaceholder) {
        URL.revokeObjectURL(avatarURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <div className="py-4">
      {/* Avatar */}
      <div className="flex items-center">
        <img
          src={avatarURL}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover mr-3"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-base">
            {senderName}
          </h4>
          <div className="flex items-center text-xs text-gray-400 mb-1">
            <FontAwesomeIcon icon={faCalendar} className="mr-1" />
            <span>{(new Date(timestamp)).toLocaleString("en-UK", { hour12: true, dateStyle: "short", timeStyle: "short" })}</span>
          </div>
        </div>
      </div>

      {/* Comment Content */}
      <div>
        <p className="text-gray-700 text-sm pt-1 pl-2">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatLine;
