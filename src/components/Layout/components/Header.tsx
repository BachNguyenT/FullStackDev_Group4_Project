import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/components/Button";

function Header() {
  return (
    <div className="flex items-center justify-end w-full gap-4">
      <Button size="icon" variant="outline">
        <FontAwesomeIcon icon={faBell} className="text-gray-500 text-xl" />
      </Button>

      {/* Avatar Circle */}
      <Button size="icon" variant="ghost">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          <img></img>
        </div>
      </Button>
    </div>
  );
}

export default Header;
