//import the internal files
import { EventInfoProps } from "@/types/Types";
import { Card, CardContent, CardTitle } from "@/components/ui/components/Card";

// Import the icons from react-icons
import {
  FaBarcode,
  FaRegCalendar,
  FaRegClock,
  FaRegUser,
  FaRegEyeSlash,
  FaGitAlt,
  FaRegMap,
  FaRegCircleCheck,
} from "react-icons/fa6";

function InvitationInfo({
  eventId,
  eventName,
  imageURL,
  createdOn,
  eventType,
  visibility,
  dateTime,
  duration,
  status,
  description,
  venue,
}: EventInfoProps) {
  return (
    <>
      <h1 className="text-3xl font-semibold mt-4 mb-4 text-purple-600">
        {eventName || "AB Wedding"}
      </h1>

      <div className="flex">
        <img
          src={
            "https://i2-prod.mirror.co.uk/incoming/article30239516.ece/ALTERNATES/s1200d/0_Barca.jpg"
          }
          alt="Invitation"
          className="w-140 object-cover rounded-tl-lg rounded-bl-lg shadow-md"
        />

        <Card className="flex-1">
          {/* Add the button edit */}
          <div className="flex justify-between px-6 pt-4">
            <CardTitle className="text-lg  font-semibold">
              Invitation information
            </CardTitle>
          </div>

          <CardContent className="grid gap-4 p-6 text-sm">
            <div className="border-t border-gray-300" />
            {/* Top info grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* 3 columns of details */}
              <div className="grid gap-8">
                <InfoItem
                  icon={<FaBarcode />}
                  label="Event ID"
                  value={eventId}
                />
                <InfoItem
                  icon={<FaRegClock />}
                  label="Date & Time"
                  value={dateTime}
                />
              </div>
              <div className="grid gap-8">
                <InfoItem
                  icon={<FaRegCalendar />}
                  label="Created on"
                  value={createdOn}
                />
                <InfoItem
                  icon={<FaRegClock />}
                  label="Duration"
                  value={duration}
                />
              </div>
              <div className="grid gap-8">
                <InfoItem
                  icon={<FaRegUser />}
                  label="Event type"
                  value={eventType}
                />
                <InfoItem
                  icon={<FaRegCircleCheck />}
                  label="Status"
                  value={status}
                />
              </div>

              {/* visibility */}
              <div className="flex items-start justify-start">
                <div className="space-y-2">
                  <InfoItem
                    icon={<FaRegEyeSlash />}
                    label="Visibility"
                    value={visibility}
                  />
                </div>
              </div>
            </div>
            {/* Add the outline */}
            <div className="border-t border-gray-300 " />

            {/* Image */}
            {/* Description + Venue */}
            <div className="grid md:grid-cols-2 gap-6 ">
              <div className="flex items-start gap-2">
                <FaGitAlt className="mt-1" />
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="text-sm mt-1 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaRegMap className="mt-1" />
                <div>
                  <span className="font-semibold">Venue:</span>
                  <p className="text-sm mt-1 text-muted-foreground">{venue}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Reusable info row
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default InvitationInfo;
