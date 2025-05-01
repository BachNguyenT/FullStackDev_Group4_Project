import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";
import { fetchUserPFP } from "@/api/user-services";
import { FetchStatus } from "@/enum";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AttendeeEntry({
  name,
  email,
  phoneNumber,
  id,
  loadingSetter,
}: {
  name: string;
  email: string;
  senderID: string;
  phoneNumber: string;
  id: string;
  loadingSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [pfpURL, setPfpURL] = useState<string>(pfpPlaceholder);
  const avatarURLRef = useRef<string>(pfpPlaceholder);
  const navigate = useNavigate();

  async function loadPfp(abortSignal: AbortSignal) {
    const fetchResult = await fetchUserPFP(abortSignal, id);
    if (fetchResult.status === FetchStatus.SUCCESS) {
      if (fetchResult.result) {
        setPfpURL(fetchResult.result);
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
    const abortSignal = abortController.signal;

    loadPfp(abortSignal);

    return () => {
      if (avatarURLRef.current !== pfpPlaceholder) {
        URL.revokeObjectURL(avatarURLRef.current);
      }
      abortController.abort(); // Cleanup function to abort the fetch request
    };
  }, []);

  return (
    <div className="py-4">
      {/* Avatar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src={pfpURL} // Placeholder for user profile picture
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover mr-3"
          />
          <div>
            <h4 className="font-semibold text-gray-800 text-base">{name}</h4>
            <span className="text-gray-400 text-sm font-light">
              {email} ({phoneNumber})
            </span>
          </div>
        </div>

        <button
          className="flex items-center hover:bg-purple-600 w-8 h-8 hover:text-white rounded-full p-2 cursor-pointer"
          disabled={true}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
        </button>
      </div>
    </div>
  );
}
export default AttendeeEntry;
