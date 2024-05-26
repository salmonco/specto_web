import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface SpecPostReqBase {
  name: string;
  category: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  contents: string | null;
  detail: {
    host: string;
    field: string;
    motivation: string;
    goal: string;
    direction: string;
  };
}
interface SpecBase {
  specPostReq: SpecPostReqBase;
  documentation: string | null;
}
export default function SpecSend() {
  const searchParams = useSearchParams();
  const specPostReq = searchParams?.get("specPostReq");
  // const fileBase64 = searchParams?.get("fileBase64") ?? "";
  const fileUri = searchParams?.get("fileUri") ?? "";
  const fileName = searchParams?.get("fileName") ?? "";
  const accessToken = searchParams?.get("ac") ?? "";

  const dataURLtoFile = (dataurl: string, fileName: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  useEffect(() => {
    if (!specPostReq) return;
    if (!accessToken) {
      alert("세션이 만료되었습니다.");
      return;
    }
    alert("ac=" + accessToken);
    postData(JSON.parse(specPostReq), fileUri, fileName);

    async function postData(
      specPostReq: SpecPostReqBase,
      fileUri: string,
      fileName: string
    ) {
      alert("fileUri=" + fileUri + " and fileName=" + fileName);
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(specPostReq)], {
        type: "application/json",
      });
      formData.append("specPostReq", blob);
      if (fileUri) {
        // formData.append("documentation", dataURLtoFile(fileBase64, fileName));
        const response = await fetch(fileUri);
        const blob = await response.blob();
        alert("blob=" + JSON.stringify(blob));
        formData.append("documentation", blob);
      }

      try {
        const res = await fetch("/api/api/v1/spec", {
          method: "POST",
          body: formData,
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await res.json();
        alert("/api/v1/spec " + JSON.stringify(json));

        // if (window.ReactNativeWebView) {
        //   window.ReactNativeWebView.postMessage("success");
        // }
      } catch (error) {
        console.error("Error 에러:", error);
      }
    }
  }, [specPostReq]);

  return <div>hihi</div>;
}
