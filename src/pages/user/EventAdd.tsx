import { useState, useEffect, useRef } from "react";
import eventImagePlaceholder from "@/assets/Pictures/event-image-placeholder.jpg";

import { Button } from "@/components/ui/components/Button";
import Dropdown from "@/components/ui/components/Dropdown";
import DurationInput from "@/components/ui/components/DurationInput";

function EventAdd() {
  //className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full  font-light text-sm"
  // Visibility: 0: Private, 1: Public
  // Event type: 0: Conference, 1: Workshop, 2: Webinar, 3: Meetup, 4: Other
  const eventVisibilityItems = [{ text: "Private" }, { text: "Public" }];

  const eventTypeItems = [
    { text: "Conference" },
    { text: "Workshop" },
    { text: "Webinar" },
    { text: "Meetup" },
    { text: "Other" },
  ];

  // Input fields
  const [image, setImage] = useState(eventImagePlaceholder);
  const imageRef = useRef<string>(eventImagePlaceholder);
  const [eventName, setEventName] = useState<string>("");
  const [eventDateTime, setEventDateTime] = useState<string>("");
  const [eventVenue, setEventVenue] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventDuration, setEventDuration] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [eventReminder, setEventReminder] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventVisibility, setEventVisibility] = useState<number>(0);

  function handleCreateEvent() {
    // Handle event creation logic here
    const eventDurationProcessed = `${eventDuration.hour}h ${eventDuration.minute}m ${eventDuration.second}s`;
    const eventDateTime123 = new Date(eventDateTime);
    console.log(eventDateTime123);
    console.log("Event Created:", {
      eventName,
      eventDateTime,
      eventVenue,
      eventType,
      eventDuration,
      eventReminder,
      eventDescription,
      eventVisibility,
    });
  }

  function handleSetImage(file: File | undefined) {
    if (file) {
      // Check file type
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PNG or JPEG image.");
        return;
      }

      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size must be smaller than 5MB.");
        return;
      }

      // Generate and set preview URL
      if (image !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageRef.current);
      }
      const previewURL = URL.createObjectURL(file);
      imageRef.current = previewURL;
      setImage(previewURL);
    }
  }

  useEffect(() => {
    return () => {
      if (imageRef.current !== eventImagePlaceholder) {
        URL.revokeObjectURL(imageRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mt-4 mb-4 text-purple-600">
        Add Event
      </h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          {/* Event name input */}
          <div>
            <label htmlFor="name" className="block mb-2 font-light text-base">
              Event Name:
            </label>
            <input
              onChange={(e) => {
                setEventName(e.target.value);
              }}
              id="name"
              placeholder="Event name..."
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>

          {/* Date and Time of the event input */}
          <div>
            <label htmlFor="date" className="block mb-2 font-light text-base">
              Date & Time:
            </label>
            <input
              id="date"
              onChange={(e) => {
                setEventDateTime(e.target.value);
              }}
              type="datetime-local"
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
          
          {/* Event venue input */}
          <div>
            <label htmlFor="venue" className="block mb-2 font-light text-base">
              Event Venue:
            </label>
            <input
              onChange={(e) => {
                setEventVenue(e.target.value);
              }}
              id="venue"
              placeholder="Event venue..."
              className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
        </div>
        <div>
          {/* Event type input */}
          <div>
            <label className="block mb-2 font-light text-base">
              Event Type:
            </label>
            <Dropdown
              placeholder="Select event type:"
              items={eventTypeItems}
              valueSetter={setEventType}
            />
          </div>

          {/* Event duration input */}
          <label>Event duration:</label>
          <div><DurationInput valueSetter={setEventDuration} /></div>

          {/* Event reminder input */}
          <label>Reminder setting:</label>
          <div><DurationInput valueSetter={setEventDuration} /></div>

          {/* Event image upload input */}
          <div>
            <label
              htmlFor="avatar"
              className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white"
            >
              Upload image event
            </label>
            <input
              id="avatar"
              onChange={(e) => handleSetImage(e.target.files?.[0])}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="visibility"
            className="block mb-2 font-light text-base"
          >
            Event Visibility:
          </label>
          <Dropdown
            placeholder="Event visibility:"
            items={eventVisibilityItems}
            valueSetter={setEventVisibility}
          />
        </div>
        <div className="bg-gray-100 w-1/3 h-70 flex justify-center items-center">
          {/* Example fixed height */}
          <img
            src={image}
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
          onChange={(e) => setEventDescription(e.target.value)}
          id="description"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm resize-y min-h-[80px]"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button to="/workspace/event" variant="secondary" className="mr-2">
          Cancel
        </Button>
        <Button
          onClick={handleCreateEvent}
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
