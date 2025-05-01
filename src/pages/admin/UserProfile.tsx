import { useState } from "react";
import { Button } from "@/components/general/Button";
import AdminEventInfo from "@/components/event/AdminEventInfo";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
function UserProfile() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    // Handle the delete action here
    console.log("User banned");
    setDeleteModalOpen(false);
  };
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
  ];
  return (
    <div className="p-4 sm:p-6 md:p-4">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-2xl font-semibold mb-4">
          User Profile
        </h2>
        <Button
          className="hover:bg-red-500 hover:text-white flex items-center"
          onClick={() => setDeleteModalOpen(true)}
        >
          <FontAwesomeIcon icon={faBan} />
          Ban User
        </Button>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Ban User"}
          message={
            "Are you sure you want to ban this user? This action cannot be undone."
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
      <div className="mb-4 gap-4">
        {/* Account Information */}
        <div className="flex ">
          {/* Avatar */}
          <div className="rounded w-60 bg-white shadow-md flex  justify-center items-center mr-4">
            <img
              src="https://b.fssta.com/uploads/application/nba/headshots/1120.vresize.350.350.medium.27.png"
              alt="Avatar"
              className="w-24 h-24 rounded-full mr-2 border-2 border-gray-200 shadow-md hover:scale-105 transition-transform duration-200"
            />
            <div>
              <p className="text-base font-semibold">Lebron Jame</p>
              <p>ID: 2342</p>
            </div>
          </div>
          {/* Text Information */}
          <div className="flex rounded bg-white shadow-md flex--1 flex-1">
            <div className="w-full p-4">
              <div className="flex justify-between gap-6">
                <div className="w-1/3">
                  <div>
                    <label className="block mt-2 font-light text-base">
                      Username:
                    </label>
                    <p className="font-semibold">Lebron jame</p>
                  </div>
                  <div>
                    <label className="block mt-2 font-light text-base">
                      Date Joined:
                    </label>
                    <p className="font-semibold">01/01/2000</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <label className="block mt-2 font-light text-base">
                      Email:
                    </label>
                    <p className="font-semibold">lebron jame</p>
                  </div>
                  <div>
                    <label className="block mt-2 font-light text-base text-gray-700">
                      Birthday:
                    </label>
                    <p className="font-semibold">01/01/2000</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <label className="block mt-2 font-light text-base">
                      Phone:
                    </label>
                    <p className="font-semibold">+1 234 567 890</p>
                  </div>

                  <div>
                    <label className="block mt-2 font-light text-base">
                      Status:
                    </label>
                    <p className="font-semibold">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl sm:text-xl font-semibold mb-4">Host Events</h2>
      <div className="space-y-4">
        {/* Header row with filter/search/add */}
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
                  status={event.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
