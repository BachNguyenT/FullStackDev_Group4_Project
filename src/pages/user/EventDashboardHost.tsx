import { useState } from "react";

import { AttendeeList, EventInfo, DiscussionBoard } from "@/components/ui/components/event";
import { ConfirmModal } from "@/components/ui/components/modals";


function EventDashboardHost() {

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ type: "event" | "attendee", item: string } | null>(null);



    const handleDeleteEvent = (item) => {
        setDeleteTarget({ type: "event", item });
        setDeleteModalOpen(true);
    }
    const handleDeleteAttendee = (item) => {
        setDeleteTarget({ type: "attendee", item });
        setDeleteModalOpen(true);
    }

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
    }
    return (
        <div className="p-4 sm:p-6 md:p-4 bg-gray-50">

            <EventInfo onDelete={handleDeleteEvent} />
            <AttendeeList onDelete={handleDeleteAttendee} />
            <DiscussionBoard />


            {/* Delete modal for event and attendee */}
            {isDeleteModalOpen && deleteTarget && (
                <ConfirmModal
                    title={deleteTarget.type === "event" ? "Delete Event" : "Delete Attendee"}
                    message={deleteTarget.type === "event" ? "Once the event is deleted all info and attendees will be removed." : "Are you sure you want to delete this attendee? This action cannot be undone."}
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}

export default EventDashboardHost;