import { FetchResult } from "@/Types";
import { FetchStatus } from "@/enum.ts";

async function fetchUserPFP(
  abortSignal: AbortSignal,
  userID: string | undefined
): Promise<FetchResult> {
  try {
    const searchParams = new URLSearchParams({
      id: userID ? userID : "#SENDER#",
    });

    const response = await fetch(
      `http://localhost:3000/get-user-pfp?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: abortSignal,
      }
    );

    const responsePackage = await response.json();

    if (response.status == 200) {
      let imageURL = undefined;

      if (responsePackage.imageBlob.length > 0) {
        const byteArray = new Uint8Array(responsePackage.imageBlob);
        const blob = new Blob([byteArray]);
        imageURL = URL.createObjectURL(blob);
        return {
          status: FetchStatus.SUCCESS,
          result: imageURL,
        };
      } else {
        return {
          status: FetchStatus.SUCCESS,
          result: undefined,
        };
      }
    } else if (response.status == 401) {
      return {
        status: FetchStatus.UNAUTHORIZED,
        result: undefined,
      };
    } else {
      return {
        status: FetchStatus.ERROR,
        result: undefined,
      };
    }
  } catch {
    return {
      status: FetchStatus.ERROR,
      result: undefined,
    };
  }
}

export { fetchUserPFP };
