import { FetchStatus } from "@/enum";

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

type Event = {
  id: string;
  name: string;
  HostID: string;
  date: string;
  attendees: number;
  status: "Accepted" | "Declined" | "Pending";
};

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

interface FetchUserPFPResponse {
  status : number;
  debugCode : string;
  imageURL : string | undefined;
}

interface FetchResult {
  status : FetchStatus;
  result : any | undefined;
}

export type { FetchResult, User, EventType, AttendeeInfoProps, Event, FetchUserPFPResponse as fetchUserPFPResponse };
