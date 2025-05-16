// FEx001: indicate error comming from the front end
import { FetchUserPFPResponse } from "@/Types";

async function fetchUserPFP(
  abortSignal: AbortSignal,
  userID: string | undefined
): Promise<FetchUserPFPResponse> {
  try {
    const searchParams = new URLSearchParams({
      id: userID ? userID : "#SENDER#",
    });

    const response = await fetch(`http://localhost:3000/user-data/pfp?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      signal: abortSignal,
    });

    const responsePackage = await response.json();

    if (response.status == 200) {
      let imageURL = undefined;

      if (responsePackage.imageBlob.length > 0) {
        const byteArray = new Uint8Array(responsePackage.imageBlob);
        const blob = new Blob([byteArray]);
        imageURL = URL.createObjectURL(blob);
      }

      return {
        status: response.status,
        debugCode: responsePackage.debugCode,
        imageURL: imageURL,
      };
    } else if (response.status == 401) {
      return {
        status: response.status,
        debugCode: responsePackage.debugCode,
        imageURL: undefined,
      };
    } else {
      return {
        status: response.status,
        debugCode: responsePackage.debugCode,
        imageURL: undefined,
      };
    }
  } catch {
    return {
      status: 500,
      debugCode: "FEx001",
      imageURL: undefined,
    };
  }
}


export { fetchUserPFP };
