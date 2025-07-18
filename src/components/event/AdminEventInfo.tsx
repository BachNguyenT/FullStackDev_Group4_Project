// import components
import { Button } from "@/components/general/Button";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

function AdminEventInfo({
  id,
  name,
  HostID,
  date,
  attendees,
  status,
}: {
  id: string;
  name: string;
  HostID: string;
  date: string;
  attendees: number;
  status: string;
}) {
  // destructure props
  // const { id, name, HostID, date, attendees, status } = props;
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
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">{HostID}</td>
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3">{attendees}</td>
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
export default AdminEventInfo;
