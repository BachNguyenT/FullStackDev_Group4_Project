//import the internal files
import { Button } from "@/components/general/Button";
import { Card, CardContent } from "@/components/general/Card";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import the icons from react-icons
import {
  FaBarcode,
  FaRegClock,
  FaRegUser,
  FaRegEyeSlash,
  FaGitAlt,
  FaRegMap,
  FaRegCircleCheck,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Ongoing":
      return "bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium";
    case "Completed":
      return "bg-gray-500 text-white rounded-full px-3 py-1 text-xs font-medium";
  }
};

function EventInfo({
  eventId,
  eventName,
  imageURL,
  eventType,
  visibility,
  dateTime,
  duration,
  status,
  description,
  venue,
  isOrganizer,
} : EventInfoProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleDeleteClick() {
    setDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    try {
      const queryParams = new URLSearchParams({
        id: eventId || "",
      });

      const response = await fetch(
        `http://localhost:3000/delete-event?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );

      if (response.status == 200) {
        navigate("/workspace/event");
      }
      else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    }
    catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  // Reusable info row
  function InfoItem({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) {
    return (
      <div className="flex gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600">
          {icon}
        </div>
        <div className="flex flex-col" >
          <div className="font-semibold mb-1">{label}:</div>
          <div className={`text-gray-700  ${getStatusStyle(
            value
          )}`}>{value}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold mb-4">
          {eventName || "AB Wedding"}
        </h1>
        <div className="flex-end">
          {isOrganizer && (
            <div>
              <Button
                to={`/workspace/event/${eventId}/edit`}
                animated={false}
                variant="secondary"
              >
                <FaPenToSquare className="mr-2" />
                Edit
              </Button>
              <Button
                animated={false}
                variant="destructive"
                className="bg-red-500 text-white ml-4"
                onClick={handleDeleteClick}
              >
                <FaTrashCan />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <img
          src={imageURL}
          alt="Event"
          className="w-full h-100 object-cover rounded-lg shadow-md"
        />
        <h1 className="text-2xl font-semibold mb-4 mt-8 ">Event Information</h1>
        <Card >
          {/* Add the button edit */}
          <CardContent className="grid gap-4 p-6 text-sm">
            {/* Top info grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 3 columns of details */}
              <div className="grid gap-4">
                <InfoItem
                  icon={<FaBarcode />}
                  label="Event ID"
                  value={eventId}
                />
                <InfoItem
                  icon={<FaRegClock />}
                  label="Date & Time"
                  value={dateTime}
                />
              </div>
              <div className="grid gap-4">
                <InfoItem
                  icon={<FaRegClock />}
                  label="Duration"
                  value={duration}
                />
                <InfoItem
                  icon={<FaRegUser />}
                  label="Event type"
                  value={eventType}
                />
              </div>
              {/* visibility */}
              <div className="grid gap-4">
                <InfoItem
                  icon={<FaRegEyeSlash />}
                  label="Visibility"
                  value={visibility}
                />
                <InfoItem
                  icon={<FaRegCircleCheck />}
                  label="Status"
                  value={status}
                />
              </div>
            </div>

            <InfoItem
              icon={<FaGitAlt />}
              label="Description"
              value={description}
            />
            <InfoItem
              icon={<FaRegMap />}
              label="Venue"
              value={venue}
            />

          </CardContent>
        </Card>
      </div>

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Delete Event"}
          message={
            "Are you sure you want to delete this event? This action cannot be undone."
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}

export default EventInfo;
