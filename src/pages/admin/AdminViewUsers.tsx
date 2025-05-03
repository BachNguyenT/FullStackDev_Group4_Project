// import libraries
import { useState } from "react";
import type { ReactElement } from "react";

// import components
import { Button } from "@/components/general/Button";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFilter,
  faUser,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface UserData {
  id: string;
  name: string;
  email: string;
  eventsCount: number;
  status: "active" | "banned";
  avatar?: string;
}

export default function AdminViewUsers(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data for users
  const users: UserData[] = [
    {
      id: "0000001",
      name: "Lebron James",
      email: "youremail+test1@gmail.com",
      eventsCount: 8,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "0000002",
      name: "Ashton Hall",
      email: "youremail+test2@gmail.com",
      eventsCount: 6,
      status: "banned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "0000003",
      name: "Darian Jason Watkins Jr.",
      email: "youremail+test3@gmail.com",
      eventsCount: 7,
      status: "active",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Users</h1>
            
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative inline-block">
                <Button
                  variant="secondary"
                  animated={false}
                >
                  <span>Show 10</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md bg-white shadow-sm focus-within:border-gray-600"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="secondary"
                animated={false}
              >
                <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
                <span>Filter</span>
              </Button>
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
                      No. Events
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
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
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.avatar ? (
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={`${user.name} avatar`}
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.eventsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {user.status === "active" ? "Active" : "Banned"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <Button
                            className="w-8 h-8  text-white bg-red-500 "
                            animated={false}
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
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
    </div>
  );
}
