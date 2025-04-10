
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
  createdOn: string;
  eventType: string;
  visibility: string;
  dateTime: string;
  duration: string;
  status: string;
  imageUrl: string;
  description: string;
  venue: string;
}

interface AttendeeInfoProps {
  id: string;
  name: string;
  imageUrl?: string;
  invitationDate: string;
  replyDate: string;
  status: "Accepted" | "Declined" | "Pending";
}


export type { User, EventType,EventInfoProps ,AttendeeInfoProps};