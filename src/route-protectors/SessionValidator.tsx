import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "@/pages/others/Loading";

function SessionValidator({ children }: any) {
  const [renderChildren, setRenderChildren] = useState<number>(-1);

  useEffect(() => {
    function checkSession() {
      fetch("http://localhost:3000/verify-session", {
        method: "GET",
        credentials: "include", // Send cookies with the request
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
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

export default SessionValidator;
