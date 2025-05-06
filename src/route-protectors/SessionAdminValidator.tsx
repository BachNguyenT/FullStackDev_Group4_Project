// import libraries
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// import components
import Loading from "@/pages/others/Loading";
import { SessionValidatorProps } from "@/Types";



function SessionAdminValidator({ children } : SessionValidatorProps) {
  const [renderChildren, setRenderChildren] = useState<number>(-1);

  useEffect(() => {
    function checkSession() {
      fetch("http://localhost:3000/verify-admin-session", {
        method: "GET",
        credentials: "include", // Send cookies with the request
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((response) => response.text())
        .then((checkResult) => {
          if (checkResult === "0x000") {
            setRenderChildren(1);
          } else {
            setRenderChildren(0);
          }
        })
        .catch(() => {
          setRenderChildren(0);
        });
    }

    checkSession(); // Call the function only once when the component mounts
  }, []);

  return (
    <div>
      {renderChildren == 1 ? (
        children
      ) : renderChildren == 0 ? (
        <Navigate to="/login" />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default SessionAdminValidator;
