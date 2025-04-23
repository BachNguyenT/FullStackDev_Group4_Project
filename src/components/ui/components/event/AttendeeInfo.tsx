import { useState } from "react";
import { AttendeeInfoProps } from "@/types/Types";
import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

import { useEffect } from "react";

import avatarPlaceholder from "@/assets/Icons/avatar-placeholder.svg";

function AttendeeInfo({ id, name, status, invitationDate }: AttendeeInfoProps) {
  const [avatarURL, setAvatarURL] = useState<string>(avatarPlaceholder);
  const avatarURLRef = useRef<string>(avatarPlaceholder);

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

  async function fetchPFP(abortSignal: AbortSignal) {
    // Call API
    const queryParams = new URLSearchParams({
      id: id || ""
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
      if (avatarURL.current != userDummyPFP) {
        URL.revokeObjectURL(avatarURL.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <tr className="border-t  border-gray-300">
      <td className="px-4 py-3">{id}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        <img
          src={avatarURL}
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

      <td className="px-4 py-3">
        <Button
          variant="destructive"
          className="hover:bg-red-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faRemove} className="ml-1 text-xs" />
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default AttendeeInfo;
