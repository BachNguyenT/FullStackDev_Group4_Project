import { FetchResult } from "@/Types";
import { FetchStatus } from "@/enum.ts";

async function verifyEventAccess(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined
): Promise<FetchResult> {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(
      `http://localhost:3000/verify-event-access?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    if (response.status == 200) {
      return {
        status: FetchStatus.SUCCESS,
        result: undefined,
      };
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

async function fetchEventInfo(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined
): Promise<FetchResult> {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(
      `http://localhost:3000/get-event-info?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    if (response.status == 200) {
      const data = await response.json();
      return {
        status: FetchStatus.SUCCESS,
        result: {
          eventName: data.eventName,
          eventID: data.eventID,
          eventDateTime: new Date(data.eventDateTime).toLocaleString("en-UK", {
            hour12: true,
            dateStyle: "long",
            timeStyle: "short",
          }),
          eventDuration: data.eventDuration,
          eventType: data.eventType,
          eventStatus: data.eventStatus,
          eventVisibility: data.eventVisibility,
          eventDescription: data.eventDescription,
          eventVenue: data.eventVenue,
          isOrganizer: data.isOrganizer,
        },
      };
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch (error) {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

async function fetchEventImage(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined
) {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(
      `http://localhost:3000/get-event-image?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    if (response.status == 200) {
      const blob = await response.blob();
      if (blob.size > 0) {
        const objectURL = URL.createObjectURL(blob);
        return {
          status: FetchStatus.SUCCESS,
          result: objectURL,
        };
      } else {
        return {
          status: FetchStatus.SUCCESS,
          result: undefined,
        };
      }
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch (error) {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

async function fetchEventAttendeeList(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined
): Promise<FetchResult> {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(
      `http://localhost:3000/get-attendees?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    if (response.status == 200) {
      const data = await response.json();
      return {
        status: FetchStatus.SUCCESS,
        result: data,
      };
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

async function fetchEventChatLog(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined
): Promise<FetchResult> {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(
      `http://localhost:3000/get-event-chatlog?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    if (response.status == 200) {
      const data = await response.json();
      return {
        status: FetchStatus.SUCCESS,
        result: data,
      };
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch (error) {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

async function deleteAttendee(
  abortSignal: AbortSignal | undefined,
  eventId: string | undefined,
  attendeeId: string | undefined
): Promise<FetchResult> {
  try {
    const queryParams = new URLSearchParams({
      id: eventId || "",
    });

    const response = await fetch(`http://localhost:3000/delete-attendee?${queryParams.toString()}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendeeID: attendeeId,
      }),
      credentials: "include",
      signal: abortSignal,
    });

    if (response.status === 200) {
      return {
        status: FetchStatus.SUCCESS,
        result: undefined,
      };
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else if (response.status == 404) {
      return {
        status: FetchStatus.NOT_FOUND,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch (error) {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

export {
  verifyEventAccess,
  fetchEventInfo,
  fetchEventImage,
  fetchEventAttendeeList,
  fetchEventChatLog,
  deleteAttendee,
};
