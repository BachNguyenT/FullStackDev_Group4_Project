import { FetchStatus } from "@/enum";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { JSX } from "react";

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
  imageURL: string;
  eventType: string;
  visibility: string;
  dateTime: string;
  duration: string;
  status: string;
  description: string;
  venue: string;
  isOrganizer: boolean;
}

type DetailCardProps = {
  icon: IconProp;
  title: string;
  details: (string | JSX.Element)[];
};

type AttendeeInfoProps = {
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

type SessionValidatorProps = {
  children: JSX.Element;
};

type StatusBarProps = {
  label: string;
  percentage: number;
  color: string;
}

type UserRowProps = {
  id: string;
  name: string;
  events: number;
  image?: string;
  showDefaultAvatar?: boolean;
}

type FetchUserPFPResponse = {
  status: number;
  debugCode: string;
  imageURL: string | undefined;
}

type FetchResult = {
  status: FetchStatus;
  result: any | undefined;
}

type NotificationProps = {
  ID: string;
  Title: string;
  Message: string;
  Date: Date;
  recipientID: string;
}

export type {
  User,
  EventType,
  EventInfoProps,
  AttendeeInfoProps,
  Event,
  TimeDuration,
  DetailCardProps,
  SessionValidatorProps,
  StatusBarProps,
  UserRowProps,
  FetchUserPFPResponse,
  FetchResult,
  FetchStatus,
  NotificationProps
};
