import Comment from "./Comment";
import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronDown,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function DiscussionBoard() {
  return (
    <div className="mb-4">
      {/* Header board */}
      <div className="flex items-center justify-between mt-10 ">
        <h1 className="text-2xl font-semibold mb-6 ">Discussion board</h1>
        <div className="mb-6">
          <span className="text-sm mr-2">Sort: </span>
          <Button animated={false} variant="outline">
            <span>Most Recent</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      </div>

      {/*Comment Section*/}
      <div className="grid grid-cols-1 gap-4 bg-white rounded-xl border border-gray-300 shadow-md p-4">
        <Comment />
        <Comment />
        <Comment />
        {/* Add Comment Section */}
        <div className="flex items-center mt-8 rounded-full border border-gray-200 px-4 py-2 shadow-sm w-full bg-white">
          <span className="text-gray-400 mr-2">Aa</span>
          <input
            type="text"
            placeholder="Write reply..."
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
          />
          <FontAwesomeIcon
            icon={faCommentDots}
            className="text-gray-400 ml-2"
          />
        </div>
      </div>
    </div>
  );
}
export default DiscussionBoard;
