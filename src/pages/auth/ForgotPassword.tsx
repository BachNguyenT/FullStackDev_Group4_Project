// import components
import {Button} from "@/components/general/Button"

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
function ForgotPassword(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-400">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold text-purple-600 mb-4">Forgot Password</h2>
                <p className="text-gray-600 mb-6">
                    Sorry bro, we haven't implemented the forgot password feature yet.
                </p>
                <div className="flex flex-col space-y-4">
                    <Button 
                        to="/login" 
                        className="w-full py-2 px-4"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} />
                        Back to Login
                    </Button>
                    <Button 
                        to="/register" 
                        className="w-full py-2 px-4"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        Register New Account
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;