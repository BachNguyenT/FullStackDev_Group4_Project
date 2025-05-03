import { StatusBarProps, UserRowProps } from "@/Types";
import { User } from "lucide-react";

export default function Dashboard() {
  function StatusBar({ label, percentage, color }: StatusBarProps) {
    return (
      <div className="flex items-center justify-between">
        <div className="w-3/4 bg-gray-200 rounded-full h-4 mr-2">
          <div
            className={`${color} h-4 rounded-full`}
            style={{ width: `${percentage}%` }}
          >
            <span className="flex h-full items-center justify-center text-xs text-white">
              {percentage}%
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    );
  }

  function UserRow({
    id,
    name,
    events,
    image,
    showDefaultAvatar = false,
  }: UserRowProps) {
    return (
      <tr className="border-b border-gray-200">
        <td className="py-4 text-sm">
          <div className="flex items-center space-x-3">
            {image ? (
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className="h-8 w-8 rounded-full"
              />
            ) : showDefaultAvatar ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>
            ) : (
              <img
                src="/placeholder.svg?height=40&width=40"
                alt={name}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span>{id}</span>
          </div>
        </td>
        <td className="py-4 text-sm">{name}</td>
        <td className="py-4 text-right text-sm">{events}</td>
      </tr>
    );
  }

  return (
    <div className="flex bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Summary Cards */}
            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="text-sm text-gray-500">
                  Total Organizer/ Attendee:
                </div>
                <div className="mt-2 text-3xl font-bold">120</div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="text-sm text-gray-500">Total Event:</div>
                <div className="mt-2 text-3xl font-bold">1200</div>
              </div>
            </div>

            {/* RSVP and Status Section */}
            <div className="col-span-1 lg:col-span-1">
              <div className="h-full rounded-lg border border-gray-200 bg-white p-6">
                <div className="mb-4 flex justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    RSVP Response Breakdown
                  </h3>
                  <h3 className="text-sm font-medium text-gray-500">
                    Event Status
                  </h3>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-end space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-8 bg-black rounded-t-md"></div>
                      <div className="mt-2 text-xs text-gray-500">Pending</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-8 bg-black rounded-t-md"></div>
                      <div className="mt-2 text-xs text-gray-500">Declined</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-20 w-8 bg-black rounded-t-md relative">
                        <div className="absolute bottom-0 h-1/3 w-full bg-purple-300 rounded-t-md"></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">Accepted</div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 w-32">
                    <StatusBar
                      label="Active"
                      percentage={52}
                      color="bg-purple-300"
                    />
                    <StatusBar
                      label="Completed"
                      percentage={32}
                      color="bg-purple-300"
                    />
                    <StatusBar
                      label="New"
                      percentage={16}
                      color="bg-purple-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Productive Users Table */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium">Productive Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      User ID
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Name
                    </th>
                    <th className="pb-2 text-right text-sm font-medium text-gray-500">
                      Total event created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <UserRow
                    id="0000001"
                    name="Lebron James"
                    events={120}
                    image="/placeholder.svg?height=40&width=40"
                  />
                  <UserRow
                    id="0000002"
                    name="Ashton Hall"
                    events={100}
                    image="/placeholder.svg?height=40&width=40"
                  />
                  <UserRow
                    id="0000003"
                    name="Darian Jason Watkins Jr."
                    events={98}
                    image=""
                    showDefaultAvatar
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* Event Information Table */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium">Event Information</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Event ID
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-500">
                      Event Organizer
                    </th>
                    <th className="pb-2 text-right text-sm font-medium text-gray-500">
                      Total event created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <UserRow
                    id="0000001"
                    name="Lebron James"
                    events={120}
                    image="/placeholder.svg?height=40&width=40"
                  />
                  <UserRow
                    id="0000002"
                    name="Ashton Hall"
                    events={100}
                    image="/placeholder.svg?height=40&width=40"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
