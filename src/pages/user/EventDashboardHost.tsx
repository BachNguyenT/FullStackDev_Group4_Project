import { useState } from "react";

import { AttendeeList, EventInfo, DiscussionBoard } from "@/components/ui/components/event";
import { ConfirmModal } from "@/components/ui/components/modals";


function EventDashboardHost() {

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedAttendee, setSelectedAttendee] = useState(null);



    const handleDeleteEvent = (item) => {
        setSelectedEvent(item);
        setDeleteModalOpen(true);
    }
    const handleDeleteAttendee = (item) => {
        setSelectedAttendee(item);
        setDeleteModalOpen(true);
    }

    const handleDelete = () => {
        // Handle the delete action here
        console.log("Deleting event:", selectedEvent);
        console.log("Deleting attendee:", selectedAttendee);
        setDeleteModalOpen(false);
    }
    return (
        <div className="p-4 sm:p-6 md:p-4 bg-gray-50">

            <EventInfo onDelete={handleDeleteEvent} />
            <AttendeeList onDelete={handleDeleteAttendee} />
            <DiscussionBoard />

            {isDeleteModalOpen && (
                <ConfirmModal
                    title="Delete Event"
                    message="Once the event is deleted all info and attendees will be removed."
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmModal
                    title="Delete Attendee"
                    message="Are you sure you want to delete this attendee? This action cannot be undone."
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}

export default EventDashboardHost;