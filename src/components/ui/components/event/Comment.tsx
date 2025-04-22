import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";
import { useState, useRef } from "react";
import { useEffect } from "react";

function Comment({ sender, senderName, message, timestamp }) {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const avatarURLRef = useRef<string>(userDummyPFP);

  async function fetchPFP(abortSignal: AbortSignal) {
    // Call API
    const queryParams = new URLSearchParams({
      id: sender || ""
    });

    try {
      const response = await fetch(`http://localhost:3000/get-user-pfp?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        signal: abortSignal,
      });

      // Handle response
      if (response.status == 200) {
        const blob = await response.blob();
        if(blob.size > 0) {
          const objectURL = URL.createObjectURL(blob);
          avatarURLRef.current = objectURL;
          setAvatarURL(objectURL);
        }
        return;
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      } else {
        return;
      }
    } catch {
      return;
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchPFP(abortController.signal);

    return () => {
      if (avatarURLRef.current != userDummyPFP) {
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
            <span>{(new Date(timestamp)).toLocaleString("en-UK", {hour12: true, dateStyle: "short", timeStyle: "short"})}</span>
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

export default Comment;
