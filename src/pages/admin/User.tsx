import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AdminAttendeeInfo from "@/components/ui/components/event/AdminAttendeeInfo";
const attendeeData = [
    {
        id: "0000001",
        name: "Lebron James",
        imageUrl: "https://i.pravatar.cc/150?img=1",
        email: "asf",
        noEvents: 2,
        status: "Accepted",
    },
    {
        id: "0000002",
        name: "Stephen Curry",
        imageUrl: "https://i.pravatar.cc/150?img=2",
        email: "asf",
        noEvents: 2,
        status: "Accepted",
    },
    {
        id: "0000003",
        name: "Kevin Durant",
        imageUrl: "https://i.pravatar.cc/150?img=3",
        email: "asf",
        noEvents: 2,
        status: "Declined",

    }
];

function User({ onDelete }: { onDelete: (id: string) => void }) {
    return (
        <div className="space-y-4">
            {/* Header row with filter/search/add */}
            <h1 className="text-2xl font-semibold mb-4 mt-8 ">Users</h1>
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
                            placeholder="Search users..."
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
                    <thead className="bg-muted text-muted-foreground text-center ">
                        <tr>
                            <th className="py-3 px-4 font-medium">User ID</th>
                            <th className="py-3 px-4 font-medium">Name</th>
                            <th className="py-3 px-4 font-medium">Email</th>
                            <th className="py-3 px-4 font-medium">No.Events</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendeeData.map((attendee) => (
                            <AdminAttendeeInfo key={attendee.id} {...attendee} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;
