// import libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import components
import {InvitationCard} from "@/components/invitation";
import { Button } from "@/components/general/Button";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/components/general/Dropdown";
import { abort } from "process";

const statusOptions = [{ text: "Ongoing" }, { text: "Completed" }];

function Invitation() {
  const [statusFilter, setStatusFilter] = useState<string>("Ongoing");
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  async function fetchInvitations(AbortSignal : AbortSignal | undefined) {
    try {
      const queryParams = new URLSearchParams({
        statusFilter: statusFilter,
      });

      const response = await fetch(
        `http://localhost:3000/get-invitations?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if(response.status == 200) {
        const data = await response.json();
        setInvitations(data);
      }
      else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
      else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    }
    catch {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchInvitations(abortController.signal);

    return () => {
      abortController.abort(); // Cleanup function to abort the fetch request
    };

  }, []);

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
        {/* Right: Sort */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-sm">Event status:</span>
          <Dropdown
            placeholder="Event Status"
            items={statusOptions}
            value={statusFilter}
            valueSetter={setStatusFilter}
          />
          <Button variant="secondary" onClick={() => fetchInvitations(undefined)}>Test</Button>
        </div>
      </div>

      {/* Invitations List */}
      <div className="flex flex-col items-center">
        {
          invitations.length > 0 ? (
            invitations.map((item, index) => {
              return (
                <InvitationCard key={index}
                organizerName = {item.OrganizerName}
                visibility = {item.IsPrivate ? "Private" : "Public"}
                dateTime = {(new Date(item.Date.slice(0, -1)))}
                duration = {item.Duration}
                venue = {item.Venue}
                eventID = {item.ID}
                eventName = {item.Name}
                eventType = {item.Type}
                rsvpStatus = {item.Rsvp} />
              )
            })
          ) : (
            <div>No invitation.</div>
          )
        }
      </div>
    </div>
  );
}

export default Invitation;
