import AttendeeInfo  from "./AttendeeInfo";
import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const attendeeData = [
  {
    id: "0000001",
    name: "Lebron James",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    invitationDate: "19/03/2026",
    replyDate: "20/03/2026",
    status: "Accepted",
  },
  {
    id: "0000002",
    name: "Ashton Hall",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    invitationDate: "19/03/2026",
    replyDate: "20/03/2026",
    status: "Declined",
  },
  {
    id: "0000003",
    name: "Darren Jason Watkins Jr.",
    imageUrl: "",
    invitationDate: "19/03/2026",
    replyDate: "20/03/2026",
    status: "Pending",
  },
];

function AttendeeList() {
  return (
    <div className="space-y-4">
      {/* Header row with filter/search/add */}
      <h1 className="text-2xl font-semibold mb-4 mt-8 ">Attendees</h1>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {/* Left: Show and Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <label htmlFor="show" className="text-sm ">
              Show
            </label>
            <select
              id="show"
              className="text-sm py-1 border rounded-md"
              defaultValue={10}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search attendees..."
              className="text-sm px-3 py-1.5 border rounded-md w-52 pl-9"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-2.5 text-gray-500 text-base"
            />
          </div>
        </div>

        {/* Right: Add Attendee */}
        <Button animated={false} variant="default">
          <FontAwesomeIcon icon={faPlus} className="ml-1 text-xs" />
          Add Attendee
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-muted-foreground text-left">
            <tr>
              <th className="py-3 px-4 font-medium">User ID</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Invitation date</th>
              <th className="py-3 px-4 font-medium">Reply Date</th>
              <th className="py-3 px-4 font-medium">RSVP Status</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendeeData.map((attendee) => (
              <AttendeeInfo key={attendee.id} {...attendee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendeeList;
