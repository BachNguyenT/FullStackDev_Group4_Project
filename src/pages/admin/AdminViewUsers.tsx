// import libraries
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import { ConfirmModal } from "@/components/modals";
import { useDebounce } from "@/hooks";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserSlash,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

interface UserData {
  ID: string;
  Name: string;
  Email: string;
  PhoneNumber: string;
  OrganizedEventCount: number;
  avatar?: string;
}

function AdminViewUsers(): ReactElement {
  const [searchName, setSearchName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<string>("");
  const navigate = useNavigate();
  function handleDeleteClick(id: string) {
    setDeleteID(id);
    setDeleteModalOpen(true);
  }

  const debouncedSearchName = useDebounce(searchName, 300);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        searchString: debouncedSearchName || "",
      });

      const response = await fetch(
        `http://localhost:3000/admin-get-all-user?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status === 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setIsLoading(false);
  };

  async function handleConfirmDelete() {
    try {
      const queryParams = new URLSearchParams({
        id: deleteID || "",
      });
      const response = await fetch(
        `http://localhost:3000/admin-delete-user?${queryParams.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
      );

      if (response.status == 200) {
        setDeleteModalOpen(false);
        setReloadFlag(prev => !prev);
      }
      else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-pageAdmin");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchName, reloadFlag]);

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Users</h1>

          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus-within:border-gray-600"
                placeholder="Search users..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              {isLoading && (<FontAwesomeIcon icon={faSpinner} className="absolute right-3 top-2.5 text-gray-500 animate-spin" />)}
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No. Events
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.ID}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        navigate(`/admin/user/${user.ID}`);
                      }}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.ID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-sm text-gray-500">
                            {user.Name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.Email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.PhoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.OrganizedEventCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            className="w-8 h-8  text-white bg-red-500 "
                            animated={false}
                            size="icon"
                            onClick={(e) => {
                              handleDeleteClick(user.ID);
                              e.stopPropagation();
                            }}
                          >
                            <FontAwesomeIcon icon={faUserSlash} className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {/* Delete modal */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={"Ban User"}
          message={
            `Are you sure you want to ban user ${deleteID} from the system? This action cannot be undone.`
          }
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
export default AdminViewUsers;