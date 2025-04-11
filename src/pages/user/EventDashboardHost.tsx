import {AttendeeList, EventInfo, DiscussionBoard} from "@/components/ui/components/event";


function EventDashboardHost() {
    return (
        <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
            <EventInfo />
            <AttendeeList />
            <DiscussionBoard />
        </div>
    )
}

export default EventDashboardHost;