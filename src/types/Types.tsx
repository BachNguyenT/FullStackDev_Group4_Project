
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
  visibility: 'Public' | 'Private';
  attendees: number;
  maxAttendees: number;
}



interface EventInfoProps {
  eventId: string;
  eventName: string;
  createdOn: string;
  visibility: string;
  attendeeCount : string;
  maxAttendeeCount : string;
}

interface AttendeeInfoProps {
  id: string;
  name: string;
  imageUrl?: string;
  invitationDate: string;
  replyDate: string;
  onDelete: (attendeeId: string) => void;
  status: "Accepted" | "Declined" | "Pending";
}


export type { User, EventType,EventInfoProps ,AttendeeInfoProps};