import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

function Comment() {
  return (
    <div className="">
      {/* Avatar */}
      <div className="flex items-center ">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.UyHfcv3FBLzxXpEd91eNzgHaFb&pid=Api&P=0&h=180"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover mr-3"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-base">
            Lebron James
          </h4>
          <div className="flex items-center text-xs text-gray-400 mb-1">
            <FontAwesomeIcon icon={faCalendar} className="mr-1" />
            <span>27/02/2023</span>
          </div>
        </div>
      </div>

      {/* Comment Content */}
      <div>
        <p className="text-gray-700 text-sm pt-1 pl-2">
          Hi! Just a quick question—what time should guests arrive for the
          ceremony? Will transportation be provided between the ceremony and
          reception venues? Also, is there a seating chart or should we find our
          own spots at the reception hello hello peter hello merry?
        </p>
      </div>
    </div>
  );
}

export default Comment;
