import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import AdminEventInfo from "@/components/ui/components/event/AdminEventInfo";
function Event() {
    const events = [
        {
            id: "1",
            name: "Event 1",
            HostID: "Host 1",
            date: "2023-10-01",
            attendees: 100,
            status: "Accepted",
        },
        {
            id: "2",
            name: "Event 2",
            HostID: "Host 2",
            date: "2023-10-02",
            attendees: 50,
            status: "Declined",
        },

        {
            id: "3",
            name: "Event 3",
            HostID: "Host 3",
            date: "2023-10-03",
            attendees: 75,
            status: "Pending",
        },
    ]
    return (
        <div className="space-y-4">
            {/* Header row with filter/search/add */}
            <h1 className="text-2xl font-semibold mb-4 mt-8 ">Events</h1>
            <div className="flex flex-wrap gap-2 justify-between items-center">
                {/* Left: Show and Search and Filter */}
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
                            placeholder="Search events..."
                            className="text-sm px-3 py-1.5 border border-gray-300 rounded-md w-52 pl-9"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-3 top-2.5 text-gray-500 text-base"
                        />
                    </div>
                </div>

                {/* Right: Add Attendee */}
                <div className="">
                    <span className="text-sm mr-2">Sort: </span>
                    <Button animated={false} variant="outline">
                        <span>Most Recent</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto border border-gray-300 rounded-md">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted text-muted-foreground text-center ">
                        <tr>
                            <th className="py-3 px-4 font-medium ">Event ID</th>
                            <th className="py-3 px-4 font-medium">Name</th>
                            <th className="py-3 px-4 font-medium">Host ID</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">No. Attendees</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <AdminEventInfo
                                key={index}
                                eventId={event.id}
                                name={event.name}
                                HostID={event.HostID}
                                date={event.date}
                                attendees={event.attendees}
                                status={event.status} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Event;