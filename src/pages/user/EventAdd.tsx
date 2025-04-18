import { useState, useEffect } from "react";

import { Button } from "@/components/ui/components/Button";

const eventTypes = ["conference", "workshop", "webinar", "meetup", "other"];
const durationUnits = ["hours", "minutes", "days"];

function EventAdd() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("Event Name");
  const [date, setDate] = useState<string>("2023-10-01");
  const [venue, setVenue] = useState<string>("Venue Name");
  const [eventType, setEventType] = useState<string>("conference");
  const [duration, setDuration] = useState<number>(2);
  const [durationUnit, setDurationUnit] = useState<string>("hours");
  const [description, setDescription] = useState<string>("Event Description");

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImage(previewURL);
    }
  };

  useEffect(() => {
    //clean up function to revoke the object URL
    return () => {
      if (typeof image === "string") {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);


  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4 mb-4 text-purple-600">
        Add Event
      </h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div>
            {/* Event name input */}
            <label htmlFor="name" className="block mb-2 font-light text-base">
              Event Name:
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              placeholder="Event name..."
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
          <div>
            {/* Date and Time of the event input */}
            <label htmlFor="date" className="block mb-2 font-light text-base">
              Date & Time:
            </label>
            <input
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="datetime-local"
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
          <div>
            {/* Event venue input */}
            <label htmlFor="venue" className="block mb-2 font-light text-base">
              Event Venue:
            </label>
            <input
              onChange={(e) => {
                setVenue(e.target.value);
              }}
              id="venue"
              placeholder="Event venue..."
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
        </div>
        <div>
          <div>
            {/* Event type input */}
            <label
              className="block mb-2 font-light text-base"
              htmlFor="eventType"
            >
              Event Type:
            </label>
            <select
              id="eventType"
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
              onChange={(e) => {
                setEventType(e.target.value);
              }}
              value={eventType}
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* Event duration input */}
            <label
              htmlFor="duration"
              className="block mb-2 font-light text-base"
            >
              Event Duration:
            </label>
            <div className="flex items-center mb-4">
              <input
                onChange={(e) => {
                  setDuration(parseInt(e.target.value));
                }}
                id="Hour"
                placeholder="Hour..."
                type="number"
                min={0}
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
              />
              <div>Hour(s)</div>
              <input
                onChange={(e) => {
                  setDuration(parseInt(e.target.value));
                }}
                id="Minute"
                placeholder="Minute..."
                type="number"
                min={0}
                max={59} 
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
              />
              <div>Min(s)</div>
              <input
                onChange={(e) => {
                  setDuration(parseInt(e.target.value));
                }}
                id="Second"
                placeholder="Second..."
                type="number"
                min={0}
                max={59} 
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
              />
              <div>Sec(s)</div>
            </div>
          </div>
          <div>
            {/* Reminder time input */}
          <label
            htmlFor="Reminder"
            className="block mb-2 font-light text-base"
          >
            Reminder:
          </label>
          <input
                onChange={(e) => {
                  setDuration(parseInt(e.target.value));
                }}
                id="Reminder"
                placeholder="Second..."
                type="number"
                min={0}
                max={59} 
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
              />
              <div>Sec(s)</div>
          </div>
          <div>
            <label htmlFor="avatar" className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white">Upload image event</label>
            <input
              id="avatar"
              onChange={(e) => previewImage(e)}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <div className="bg-gray-100 w-1/3 h-70 flex justify-center items-center">
          {" "}
          {/* Example fixed height */}
          <img
            src={typeof image === "string" ? image : undefined}
            alt="Preview Image"
            className="h-full w-full object-cover text-center rounded-md"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-light text-base"
        >
          Description:
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="description"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm resize-y min-h-[80px]"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button to="/event" variant="secondary" className="mr-2">
          Cancel
        </Button>
        <Button
          animated={false}
          className="ml-2 bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
export default EventAdd;