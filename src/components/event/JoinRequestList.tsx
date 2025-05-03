// import libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/general/Button";
import JoinRequestRow from "./JoinRequestRow";



interface JoinRequest {
  UserID: string;
  Name: string;
}

function JoinRequestList({
  joinRequestList,
  eventID,
  refreshHandler,
}: {
  joinRequestList: JoinRequest[];
  eventID: string | undefined;
  refreshHandler(abortSignal: AbortSignal | undefined): Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleOnAcceptClick(userID: string) {
    try {
      const searchParams = new URLSearchParams({
        id: eventID || "",
      });

      const response = await fetch(
        `http://localhost:3000/accept-join-request?${searchParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
          }),
          credentials: "include",
        }
      );

      if (response.status == 200) {
        refreshHandler(undefined);
      } else if (response.status == 401) {
        console.log("Session expired. Please log in again.");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else if (response.status == 500) {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    }
    catch (error) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/workspace/event");
    }
  }

  async function handleOnDeclineClick(userID: string) {
    try {
      const searchParams = new URLSearchParams({
        id: eventID || "",
      });

      const response = await fetch(
        `http://localhost:3000/decline-join-request?${searchParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
          }),
          credentials: "include",
        }
      );

      if (response.status == 200) {
        refreshHandler(undefined);
      } else if (response.status == 401) {
        console.log("Session expired. Please log in again.");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (response.status == 404) {
        navigate("/not-found-page");
      } else if (response.status == 500) {
        alert("Service temporarily unavailable. Please try again later.");
        navigate("/workspace/event");
      }
    }
    catch (error) {
      alert("Service temporarily unavailable. Please try again later.");
      navigate("/workspace/event");
    }
  }

  return (
    <div>
      <div className="space-y-4">
        {/* Header row with filter/search/add */}
        <h1 className="text-2xl font-semibold mb-4 mt-8 ">Join Requests</h1>
        {/* Right: Add Attendee & Refresh */}
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await refreshHandler(undefined);
              setIsLoading(false);
            }}
          >
            Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md h-100 overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead
              className="bg-muted text-muted-foreground text-left sticky top-0"
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <tr className="text-center">
                <th className="py-3 px-4 font-medium ">User ID</th>
                <th className="py-3 px-4 font-medium ">Name</th>
                <th className="py-3 px-4 font-medium ">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {joinRequestList.map((request) => {
                return (
                  <JoinRequestRow
                    key={request.UserID}
                    id={request.UserID}
                    name={request.Name}
                    onAcceptHandler={handleOnAcceptClick}
                    onDeclineHandler={handleOnDeclineClick}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JoinRequestList;
