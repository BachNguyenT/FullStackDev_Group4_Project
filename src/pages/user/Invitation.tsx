// import libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { InvitationCard } from "@/components/invitation";
import { Dropdown } from "@/components/general";
import { useDebounce } from "@/hooks";



interface invitation {
  ID: string;
  Name: string;
  Type: string;
  Date: string;
  Duration: string;
  Venue: string;
  IsPrivate: boolean;
  OrganizerName: string;
  Rsvp: string; // -1 not set, 0 no, 1 yes
}

const statusOptions = [{ text: "Ongoing" }, { text: "Completed" }];

function Invitation() {
  const [statusFilter, setStatusFilter] = useState<string>("Ongoing");
  const [invitations, setInvitations] = useState<invitation[]>([]);
  const navigate = useNavigate();
  const debouncedStatusFilter = useDebounce(statusFilter, 500); // Debounce the status filter
  async function fetchInvitations(abortSignal: AbortSignal | undefined) {
    try {
      const queryParams = new URLSearchParams({
        statusFilter: debouncedStatusFilter,
      });

      const response = await fetch(
        `http://localhost:3000/event/invitations?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: abortSignal,
        }
      );

      if (response.status == 200) {
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

  }, [debouncedStatusFilter]);

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
        </div>
      </div>

      {/* Invitations List */}
      <div className="flex flex-col items-center">
        {
          invitations.length > 0 ? (
            invitations.map((item, index) => {
              return (
                <InvitationCard key={index}
                  organizerName={item.OrganizerName}
                  visibility={item.IsPrivate ? "Private" : "Public"}
                  dateTime={(new Date(item.Date))}
                  duration={item.Duration}
                  venue={item.Venue}
                  eventID={item.ID}
                  eventName={item.Name}
                  eventType={item.Type}
                  rsvpStatus={item.Rsvp} />
              )
            })
          ) : (
            <div className="min-h-[20vh] text-center" >No invitation.</div>
          )
        }
      </div>
    </div>
  );
}

export default Invitation;
