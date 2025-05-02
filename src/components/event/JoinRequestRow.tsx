import { useState } from "react";
import { fetchUserPFP } from "@/api/user-services";
import { FetchStatus } from "@/enum.ts";
import { Button } from "@/components/general/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";

function JoinRequestRow({
  id,
  name,
  onAcceptHandler,
  onDeclineHandler,
}: {
  id: string;
  name: string;
  onAcceptHandler: (id: string) => Promise<void>;
  onDeclineHandler: (id: string) => Promise<void>;
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
      <td className="pl-32 py-3 flex items-center justify-start gap-2">
        <img
          src={pfpURL}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{name}</span>
      </td>

      <td className="px-4 py-3">
        <Button
          variant="destructive"
          className="hover:bg-green-500 hover:text-white"
          onClick={async () => {
            await onAcceptHandler(id);
          }}
        >
          Accept
        </Button>
      </td>

      <td className="px-4 py-3">
        <Button
          variant="destructive"
          className="hover:bg-red-500 hover:text-white"
          onClick={async () => {
            await onDeclineHandler(id);
          }}
        >
          Decline
        </Button>
      </td>
    </tr>
  );
}

export default JoinRequestRow;
