// import libraries
import { useMemo } from "react";
interface Event {
  ID: string;
  Name: string;
  Type: string;
  Date: string;
  IsPrivate: string;
  AtendeeCount: number;
}
const useEvent = (events: Array<Event>, sidebarOpen: boolean) => {
  const showMore = useMemo(() => {
    return events.length > (sidebarOpen ? 3 : 4);
  }, [events, sidebarOpen]);

  const displayedItems = useMemo(() => {
    return events.slice(0, sidebarOpen ? 3 : 4);
  }, [events, sidebarOpen]);

  return { showMore, displayedItems };
};

export default useEvent;