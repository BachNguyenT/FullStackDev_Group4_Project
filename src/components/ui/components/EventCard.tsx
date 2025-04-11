import { Link } from "react-router-dom";
//import components and libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faCalendarAlt,
  faEye,
} from "@fortawesome/free-regular-svg-icons";

const EventCard = () => {
  return (
    <Link
      to="/event/${event.id}/dashboard"
      className="w-[300px] rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      <img
        className="w-full h-48 object-cover"
        src="https://kbhgames.com/wp-content/uploads/2017/07/Bleach-Vs-Naruto-3.jpg"
        alt="Wedding Venue"
      />
      <div className="px-6 py-4">
        <h2 className="font-semibold text-lg text-gray-800 text-center mb-4">
          A & B’s Wedding
        </h2>

        <div className="text-sm text-gray-600 space-y-2">
          {/* First Row: Event ID and Created on */}
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <span className="font-medium flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                Event ID:
              </span>
              <span>Evnt_109183</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-medium flex items-center justify-end">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Created on:
              </span>
              <span>01/01/2025</span>
            </div>
          </div>

          {/* Second Row: Visibility and No. Attendees */}
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col">
              <span className="font-medium flex items-center">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Visibility:
              </span>
              <span>Private</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-medium flex items-center justify-end">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                No. Attendees:
              </span>
              <span>20 out of 30</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
