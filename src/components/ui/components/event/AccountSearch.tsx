import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";
import { useState, useRef } from "react";
import { useEffect } from "react";

function AccountSearch({ senderName, email, phoneNumber }) {
    return (
        <div className="py-4">
            {/* Avatar */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center">
                    <img
                        src={userDummyPFP} // Placeholder for user profile picture
                        alt="avatar"
                        className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover mr-3"
                    />
                    <div>
                        <h4 className="font-semibold text-gray-800 text-base">
                            {senderName}
                        </h4>
                        <span className="text-gray-400 text-sm font-light">{email} ({phoneNumber})</span>
                    </div>
                </div>
                <div className="hover:bg-purple-600 hover:text-white rounded-full p-2 cursor-pointer"> 
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                </div>
            </div>


        </div>
    );
}
export default AccountSearch;