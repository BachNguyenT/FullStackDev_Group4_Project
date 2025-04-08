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
export type { User, EventType };