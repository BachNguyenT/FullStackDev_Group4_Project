import { DiscussionBoard } from "@/components/event";
import InvitationInfo from "@/components/invitation/InvitationInfo";
import InvitationEssentials from "@/components/invitation/InvitationEssentials";

function InvitationDashboardAttendee() {
  return (
    <div className="p-4 sm:p-6 md:p-4 bg-gray-50">
      <InvitationInfo />
      <InvitationEssentials />
      <DiscussionBoard />
    </div>
  );
}

export default InvitationDashboardAttendee;
