import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";
import Host from "@/assets/Icons/user-1.svg";
import Calender from "@/assets/Icons/calendar.svg";
import Visibility from "@/assets/Icons/eye2.svg";
import Duration from "@/assets/Icons/timer.svg";
import Venue from "@/assets/Icons/location.svg";

function InvitationCard() {
  return (
    <div className="min-w-[200px] max-w-[1000px] md:max-h-[250px] flex flex-col md:flex-row bg-white col rounded-md shadow p-3 mb-3 border border-gray-200 gap-3 ">
      {/* Image Box */}
      <div className="relative">
        <img
          className="w-[400px] h-full flex-initial object-cover rounded-md"
          src={eventImagePlaceholder}
          alt="Wedding Venue"
        />
        <div className="absolute top-0 left-0 bg-white mt-[10px] ml-[10px] flex flex-col items-center rounded-sm font-semibold px-2 py-1">
          <span className="text-gray-800 h-5">01</span>
          <span className="text-purple-500 text-xs">JAN</span>
        </div>
      </div>

      {/* Event Information */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="bg-purple-300 text-xs px-2 py-1 rounded-sm text-gray-800">
            Wedding
          </span>
          <h2 className="text-xl font-semibold text-black my-2">B&C Wedding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm text-gray-700 gap-y-1">
            <div className="flex items-center gap-2">
              <img src={Host} className="h-[18px]" />
              <div>
                <p>Supanika</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Visibility} className="h-[18px]" />
              <div>
                <p>Private</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Calender} className="h-[18px]" />
              <div>
                <p>10:30am</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img src={Duration} className="h-[18px]" />
              <div>
                <p>2 hours</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-700 mt-1">
            <img src={Venue} className="h-[18px]" />
            <div>
              <p>
                Maison De Charme - Restaurant & Events Trần Xuân Soạn, Tân Hưng,
                Quận 7, Hồ Chí Minh 700000
              </p>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full gap-4 mt-2">
          <Button
            variant="secondary"
            className="hover:bg-green-500 hover:text-white w-full"
          >
            ✓ Accept
          </Button>
          <Button
            variant="destructive"
            className="hover:bg-red-500 hover:text-white w-full"
          >
            ✕ Decline
          </Button>
          <Button
            to={`/workspace/invitation/"asdfasd"`}
            variant="outline"
            animated={false}
            className="hover:bg-purple-500 hover:text-white w-full"
          >
            More Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InvitationCard;
