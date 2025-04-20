import { Button } from "@/components/ui/components/Button";
import {
  faUser,
  faCommentDots,
  faClock,
  faCalendar,
  faMap,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InvitationCard() {
  return (
    <div className="flex bg-white rounded-md shadow p-4 mb-4 border border-gray-200">
      {/* Date Box */}
      <div className="w-30  rounded-md overflow-hidden mr-4  ">
        {/* Top purple bar for month */}
        <div className="border-b-2 border-gray-200">
          <div className="bg-purple-500 text-white text-center py-1 text-sm">
            May
          </div>

          {/* White box for day and year */}
          <div className="bg-white text-black text-center py-2">
            <div className="text-2xl font-bold leading-none mb-2">8</div>
            <div className="text-sm mb-2 ">2025</div>
          </div>
        </div>
      </div>

      {/* Event Information */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-black mb-4">B&C Wedding</h2>

        {/* border */}
        <div className="border-b-2 border-gray-200 mb-2"></div>

        <div className="grid grid-cols-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-500" />
            <div>
              <div className="font-medium">Host :</div>
              <p>Supanika</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faClock} className="mt-1 text-gray-500" />
            <div>
              <div className="font-medium">Time :</div>
              <p>10:30am</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faMap} className="mt-1 text-gray-500" />
            <div>
              <div className="font-medium">Venue:</div>
              <p>
                Maison De Charme - Restaurant & Events Trần Xuân Soạn, Tân Hưng,
                Quận 7, Hồ Chí Minh 700000
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="mt-1 text-gray-500"
            />
            <div>
              <div className="font-medium">Event type:</div>
              <p>Wedding</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faCalendar} className="mt-1 text-gray-500" />
            <div>
              <div className="font-medium">Duration:</div>
              <p>2 hours</p>
            </div>
          </div>
        </div>
        {/* border */}
        <div className="border-b-2 border-gray-200 mt-2"></div>

        {/* Buttons */}
        <div className="flex justify-between items-center  pt-4">
          <Button
            to="/workspace/invitation/${invitation.id}/dashboard"
            variant="outline"
            animated={false}
            className="hover:bg-purple-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
            More Details
          </Button>

          <div className="space-x-2">
            <Button
              variant="secondary"
              className="hover:bg-green-500 hover:text-white"
            >
              ✓ Accept
            </Button>
            <Button
              variant="destructive"
              className="hover:bg-red-500 hover:text-white"
            >
              ✕ Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationCard;
