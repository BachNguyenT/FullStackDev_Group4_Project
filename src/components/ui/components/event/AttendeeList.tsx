import AttendeeInfo from "./AttendeeInfo";
import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AttendeeList({ attendeeList, refreshHandler }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="space-y-4">
      {/* Header row with filter/search/add */}
      <h1 className="text-2xl font-semibold mb-4 mt-8 ">Attendees</h1>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {/* Left: Show and Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search attendees..."
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-md w-52 pl-9"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-2.5 text-gray-500 text-base"
            />
          </div>
        </div>

        {/* Right: Add Attendee & Refresh */}
        <Button animated={false} variant="default" disabled={isLoading}>
          <FontAwesomeIcon icon={faPlus} className="ml-1 text-xs" />
          Add Attendee
        </Button>
        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading} onClick={async () => {setIsLoading(true); await refreshHandler(null); setIsLoading(false);}}>
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-md h-100 overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead
            className="bg-muted text-muted-foreground text-left sticky top-0"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <tr>
              <th className="py-3 px-4 font-medium ">User ID</th>
              <th className="py-3 px-4 font-medium ">Name</th>
              <th className="py-3 px-4 font-medium ">Invitation date</th>
              <th className="py-3 px-4 font-medium ">RSVP Status</th>
              <th className="py-3 px-4 font-medium ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendeeList.map((attendee) => (
              <AttendeeInfo
                key={attendee.attendeeID}
                id={attendee.attendeeID}
                name={attendee.attendeeName}
                status={attendee.rsvp}
                invitationDate={attendee.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendeeList;
