import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMapMarkerAlt,
  faTshirt,
  faCloudSun, // For Weather Forecast
} from "@fortawesome/free-solid-svg-icons";
import { DetailCardProps } from "@/Types";

function InvitationEssentials() {
  return (
    <div className="bg-white shadow-md  rounded-xl border border-gray-300 p-4 w-full text-gray-800 mt-10">
      <h1 className="text-2xl font-semibold mt-2 ">🎉 Event Essentials</h1>

      {/* Details Table */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <DetailCard
          icon={faCar}
          title="Transportation Info"
          details={[
            "Shuttle departs at 9:00 AM from Central Park Entrance",
            "Free parking available at the venue",
            "Ride sharing is encouraged",
          ]}
        />
        <DetailCard
          icon={faMapMarkerAlt}
          title="Venue Location"
          details={[
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 underline hover:text-gray-600"
            >
              View in Google Maps
            </a>,
          ]}
        />
        <DetailCard
          icon={faTshirt}
          title="Dress Code"
          details={[
            "Garden Formal",
            "Light fabrics, pastel colors recommended",
            "Avoid dark or heavy attire (venue is outdoors)",
          ]}
        />
        <DetailCard
          icon={faCloudSun}
          title="Weather Forecast"
          details={[
            "Expected to be sunny with a high of 75°F",
            "Low chance of rain, but consider a light shawl",
            "Check updated forecast closer to the date",
          ]}
        />
      </div>
    </div>
  );
}

function DetailCard({ icon, title, details }: DetailCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl shadow p-5 hover:shadow-lg transition">
      <h4 className="text-md font-semibold mb-3 flex items-center text-gray-700">
        <FontAwesomeIcon icon={icon} className="mr-2 text-gray-700" />
        {title}
      </h4>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {details.map((item, index) => (
          <li key={index} className="leading-snug text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvitationEssentials;
