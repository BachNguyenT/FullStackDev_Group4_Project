// import libraries
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { fetchUserPFP } from "@/api/user-services";
import { FetchStatus } from "@/enum.ts";
import { Button } from "@/components/general/Button";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";

function AttendeeInfo({ id, name, status, invitationDate, onDeleteHandler = () => { }, isEdit = true }: {
  id: string;
  name: string;
  status: string;
  invitationDate: string;
  onDeleteHandler: (id: string, name: string) => void;
  isEdit: boolean;
}) {
  const [pfpURL, setPfpURL] = useState<string>(pfpPlaceholder);
  const avatarURLRef = useRef<string>(pfpPlaceholder);
  const navigate = useNavigate();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "1":
        return "bg-green-500 text-white";
      case "0":
        return "bg-red-500 text-white";
      case "-1":
        return "bg-yellow-400 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "1":
        return "Accepted";
      case "0":
        return "Declined";
      case "-1":
        return "Pending";
      default:
        return "Unknown";
    }
  };

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

    loadPfp(abortController.signal);

    return () => {
      if (avatarURLRef.current != pfpPlaceholder) {
        URL.revokeObjectURL(avatarURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <tr className="border-t  border-gray-300">
      <td className="px-4 py-3">{id}</td>
      <td className="pl-3 py-3 flex items-center justify-start gap-2">
        <img
          src={pfpURL}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{name}</span>
      </td>
      <td className="px-4 py-3">
        {new Date(invitationDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {getStatusText(status)}
        </span>
      </td>

      {isEdit && (<td className="px-4 py-3">
        <Button
          variant="destructive"
          className="hover:bg-red-500 hover:text-white"
          onClick={() => { onDeleteHandler(id, name); }}
        >
          <FontAwesomeIcon icon={faRemove} className="ml-1 text-xs" />
          Remove
        </Button>
      </td>)}
    </tr>
  );
}

export default AttendeeInfo;
