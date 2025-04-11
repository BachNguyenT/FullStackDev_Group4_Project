import Comment from "./Comment";
import { Button } from "@/components/ui/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DiscussionBoard() {
  return (
    <div>
      {/* Header board */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-6 mt-8">Discussion board</h1>
        <div>
          <span className="text-sm mr-2">Sort: </span>
          <Button animated={false} variant="outline">
            <span>Most Recent</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      </div>

      {/*Comment Section*/}
      <div className="grid grid-cols-1 gap-4 bg-white rounded-lg shadow-md p-4">
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
        </div>
      </div>
    </div>
  );
}
export default DiscussionBoard;
