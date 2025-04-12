import { useState } from "react";

import { InvitationCard } from "@/components/ui";
import { Button } from "@/components/ui/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function Invitation() {
  const [invitations, setInvitations] = useState(Array(20).fill(null));

  return (
    <div className="p-4 sm:p-6 md:p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          My Invitations
        </h2>
      </div>

      {/* Search, Filter & Sort Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm w-full sm:w-auto">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-500 mr-2"
            />
            <input
              type="text"
              placeholder="Search Invitation..."
              className="w-full outline-none text-sm"
            />
          </div>

          <Button animated={false} variant="outline">
            <span>Filter</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>

        {/* Right: Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm">Sort:</span>
          <Button animated={false} variant="outline">
            Most Recent
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      </div>

      {/* Invitations List */}
      <div >
        {invitations.map((_, index) => (
          <InvitationCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default Invitation;
