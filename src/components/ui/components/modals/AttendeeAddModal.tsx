import { Button } from "@/components/ui/components/Button";
import AccountSearch from "@/components/ui/components/event/AccountSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function AttendeeAddModal({  onCancel, eventID }: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState([]);
  const [searchString, setSearchString] = useState<string>(""); 
  const navigate = useNavigate(); 

  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const fetchInvitableAttendee = async () => {
    setIsLoading(true);
    console.log(searchString);

    try {
      const queryParams = new URLSearchParams({
        id: eventID || "",
        searchString: searchString || "",
      });

      const response = await fetch(
        `http://localhost:3000/get-invitable-attendee?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 200) {
        const data = await response.json();
        setUserFound(data);
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
      else if (response.status == 404) {
        navigate("/not-found-page");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching invitable attendees:", error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchInvitableAttendee();
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-md z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto mt-20"
        onClick={handlePropagation}
      >
        <div className="">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-1xl font-semibold">{"Invite User"}</h2>
            <div
              onClick={onCancel}
              className="cursor-pointer text-gray-400 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          {/* Border */}
          <div className="border-b border-gray-300 mb-4"></div>

          <div className="relative px-6 py-4">
            <input
              disabled={isLoading}
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              placeholder="Search attendees..."
              className="text-sm border border-gray-300 rounded-md block w-full h-14 pl-9"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-9 top-9.5 text-gray-500 text-base"
            />
            <Button variant="outline" onClick={fetchInvitableAttendee}>Find</Button>
          </div>
          

          {/* Border */}
          <div className="border-b border-gray-300 mb-4 mt-4"></div>

          {/* search result area */}
          <div>
            {
              userFound.map((user, index) => (
                <AccountSearch
                  key={index}
                  senderName={user.Name}
                  email={user.Email}
                  phoneNumber={user.PhoneNumber}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default AttendeeAddModal;
