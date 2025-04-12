import {DiscussionBoard} from "@/components/ui/components/event";
import {InvitationInfo, InvitationEssentials} from "@/components/ui/components/invitation";

function InvitationDashboardAttendee() {
    return (
        <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
            <InvitationInfo />
            <InvitationEssentials />
            <DiscussionBoard />
        </div>
    )
}

export default InvitationDashboardAttendee;