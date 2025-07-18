// import libraries
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// import components
import Loading from "@/pages/others/Loading";

function EventAccessValidator({ children }: any) {
  const [renderChildren, setRenderChildren] = useState<number>(-1);

  function checkSession() {
    fetch("http://localhost:3000/event/verify-event-access", {
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

  useEffect(() => {
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

export default EventAccessValidator;
