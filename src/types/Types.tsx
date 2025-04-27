type User = {
  id: string;
  username: string;
  password: string;
  // Add other user properties as needed
};

type EventType = {
  id: string;
  name: string;
  date: string;
  visibility: "Public" | "Private";
  attendees: number;
  maxAttendees: number;
};

type TimeDuration = {
  hour: number;
  minute: number;
  second: number;
};

type Event = {
  id: string;
  name: string;
  HostID: string;
  date: string;
  attendees: number;
  status: "Accepted" | "Declined" | "Pending";
};

interface EventInfoProps {
  eventId: string;
  eventName: string;
  createdOn: string;
  eventType: string;
  visibility: string;
  attendeeCount: number;
  maxAttendeeCount: number;
}

interface AttendeeInfoProps {
  id: string;
  name: string;
  imageUrl?: string;
  email: string;
  noEvents: number;
  invitationDate: string;
  replyDate: string;
  onDelete: (attendeeId: string) => void;
  isEdit: boolean;
  status: "Accepted" | "Declined" | "Pending";
}

export type {
  User,
  EventType,
  EventInfoProps,
  AttendeeInfoProps,
  Event,
  TimeDuration,
};
