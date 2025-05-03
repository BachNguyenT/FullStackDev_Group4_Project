import { useState } from "react";

import { EventInfo } from "@/components/event";
import AttendeeInfo from "@/components/event/AttendeeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "@/components/modals";
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

function EventDashboard() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "event" | "attendee";
    item: string;
  } | null>(null);

  const handleDeleteEvent = (item : string) => {
    setDeleteTarget({ type: "event", item });
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Handle the delete action here
    if (deleteTarget) {
      if (deleteTarget.type === "event") {
        console.log("Event", deleteTarget.item);
      } else {
        console.log(deleteTarget.item);
      }
    }
    setDeleteModalOpen(false);
  };
  return (
    <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
      <EventInfo onDelete={handleDeleteEvent} />
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
                className="text-sm py-1 border border-gray-300 rounded-md"
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
                className="text-sm px-3 py-1.5 border border-gray-300 rounded-md w-52 pl-9"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-2.5 text-gray-500 text-base"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-muted-foreground text-left">
              <tr>
                <th className="py-3 px-4 font-medium">User ID</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Invitation date</th>
                <th className="py-3 px-4 font-medium">Reply Date</th>
                <th className="py-3 px-4 font-medium">RSVP Status</th>
              </tr>
            </thead>
            <tbody>
              {attendeeData.map((attendee) => (
                <AttendeeInfo key={attendee.id} {...attendee} isEdit={false} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete modal for event and attendee */}
      {isDeleteModalOpen && deleteTarget && (
        <ConfirmModal
          title={
            deleteTarget.type === "event" ? "Delete Event" : "Delete Attendee"
          }
          message={
            deleteTarget.type === "event"
              ? "Once the event is deleted all info and attendees will be removed."
              : "Are you sure you want to delete this attendee? This action cannot be undone."
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default EventDashboard;
