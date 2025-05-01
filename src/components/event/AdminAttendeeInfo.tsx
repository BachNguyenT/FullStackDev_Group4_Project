import { AttendeeInfoProps } from "@/types";
import { Button } from "@/components/general/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FaUser } from "react-icons/fa6";

function AdminAttendeeInfo({
  id,
  imageUrl,
  name,
  email,
  noEvents,
  status,
  onDelete,
}: AttendeeInfoProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500 text-white";
      case "Declined":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-yellow-400 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <tr className="border-t  border-gray-300 text-center">
      <td className="px-4 py-3">{id}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-gray-500">
            <FaUser />
          </div>
        )}
        <span>{name}</span>
      </td>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3">{noEvents}</td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <Button
          size="icon"
          variant="icon"
          className="hover:bg-purple-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faEye} className="text-xs" />
        </Button>
        <Button
          size="icon"
          variant="icon"
          className="hover:bg-red-500 hover:text-white"
        >
          <FontAwesomeIcon icon={faTrash} className="text-xs" />
        </Button>
      </td>
    </tr>
  );
}

export default AdminAttendeeInfo;
