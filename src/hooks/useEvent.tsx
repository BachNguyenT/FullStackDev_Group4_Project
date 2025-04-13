import { useState, useMemo } from "react";

const useEvent = (initialEvents: Array<any>, sidebarOpen: boolean) => {
    const [items] = useState(initialEvents);

    const showMore = useMemo(() => {
        return sidebarOpen ? items.length > 3 : items.length > 4;
    }, [items, sidebarOpen]);

    const displayedItems = useMemo(() => {
        return items.slice(0, sidebarOpen ? 3 : 4);
    }, [items, sidebarOpen]);

    return { items, showMore, displayedItems };
};

export default useEvent;