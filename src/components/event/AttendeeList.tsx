import AttendeeInfo from "./AttendeeInfo";
import { Button } from "@/components/general/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useNavigate } from "react-router-dom";
import AttendeeAddModal from "../modals/AttendeeAddModal";
import { deleteAttendee } from "@/api/event-services";
import { FetchResult } from "@/Types";
import { FetchStatus } from "@/enum.ts";

function AttendeeList({
  attendeeList,
  eventID,
  refreshHandler,
}: {
  attendeeList: any[];
  eventID: string | undefined;
  refreshHandler(abortSignal: AbortSignal | undefined): Promise<boolean>;
}) {
  const [deleteTarget, setDeleteTarget] = useState({ id: "", name: "" });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isAddAttendeeModalOpen, setAddAttendeeModalOpen] = useState(false);

  function processFetchFail(fetchResult: FetchResult) {
    if (fetchResult.status === FetchStatus.UNAUTHORIZED) {
      console.log("Session expired. Please log in again.");
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else if (fetchResult.status === FetchStatus.NOT_FOUND) {
      navigate("/not-found-page");
    } else if (fetchResult.status === FetchStatus.ERROR) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/workspace/event");
    }
  }

  function handleOnDeleteClick(attendeeID: string, attendeeName: string) {
    setDeleteTarget({ id: attendeeID, name: attendeeName });
    setDeleteModalOpen(true);
  }

  async function handleOnConfirmDeleteClick(attendeeID: string) {
    setIsLoading(true);
    const fetchResult = await deleteAttendee(undefined, eventID, attendeeID);
    if (fetchResult.status === FetchStatus.SUCCESS) {
      refreshHandler(undefined);
    } else {
      processFetchFail(fetchResult);
    }
    setIsLoading(false);
    setDeleteModalOpen(false);
  }

  return (
    <div>
      <div className="space-y-4">
        {/* Header row with filter/search/add */}
        <h1 className="text-2xl font-semibold mb-4 mt-8 ">Attendees</h1>
        {/* Right: Add Attendee & Refresh */}
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await refreshHandler(undefined);
              setIsLoading(false);
            }}
          >
            Refresh
          </Button>
          <Button
            animated={false}
            variant="default"
            disabled={isLoading}
            onClick={() => setAddAttendeeModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="ml-1 text-xs" />
            Add Attendee
          </Button>
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md h-100 overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead
              className="bg-muted text-muted-foreground text-left sticky top-0"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <tr className="text-center">
                <th className="py-3 px-4 font-medium ">User ID</th>
                <th className="py-3 px-4 font-medium ">Name</th>
                <th className="py-3 px-4 font-medium ">Invitation date</th>
                <th className="py-3 px-4 font-medium ">RSVP Status</th>
                <th className="py-3 px-4 font-medium ">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {attendeeList.map((attendee) => (
                <AttendeeInfo
                  key={attendee.attendeeID}
                  id={attendee.attendeeID}
                  name={attendee.attendeeName}
                  status={attendee.rsvp}
                  invitationDate={attendee.date}
                  onDeleteHandler={handleOnDeleteClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete modal for event and attendee */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Delete Attendee"}
          message={`Are you sure you want to remove ${deleteTarget.name} from this event? This action cannot be undone.`}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={() => handleOnConfirmDeleteClick(deleteTarget.id)}
        />
      )}

      {/* Add Attendee modal */}
      {isAddAttendeeModalOpen && (
        <AttendeeAddModal
          eventID={eventID}
          onCancel={() => {
            setAddAttendeeModalOpen(false);
            refreshHandler(undefined);
          }}
        />
      )}
    </div>
  );
}

export default AttendeeList;
