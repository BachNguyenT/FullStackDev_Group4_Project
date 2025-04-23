import { Button } from "@/components/ui/components/Button";
import AccountSearch from "@/components/ui/components/event/AccountSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ConfirmModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function SearchModal({
    title,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const handlePropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md z-50" onClick={onCancel}>
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto mt-20"
                onClick={handlePropagation}
            >
                <div className="">
                    <div className="flex items-center justify-between p-6">
                        <h2 className="text-1xl font-semibold">{title || "Invite User"}</h2>
                        <div onClick={onCancel} className="cursor-pointer text-gray-400 hover:text-gray-800">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                    {/* Border */}
                    <div className="border-b border-gray-300 mb-4"></div>

                    <div className="relative px-6 py-4">
                        <input
                            type="text"
                            placeholder="Search attendees..."
                            className="text-sm border border-gray-300 rounded-md block w-full h-14 pl-9"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute left-9 top-9.5 text-gray-500 text-base"
                        />
                    </div>

                    {/* Border */}
                    <div className="border-b border-gray-300 mb-4 mt-4"></div>

                    {/* search result area */}
                    <div>
                        <AccountSearch />
                        <AccountSearch />
                        <AccountSearch />
                        <AccountSearch />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default SearchModal;
