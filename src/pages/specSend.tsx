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
  const fileBase64 = searchParams?.get("fileBase64") ?? "";
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
    postData(JSON.parse(specPostReq), fileBase64, fileName);

    async function postData(
      specPostReq: SpecPostReqBase,
      fileBase64: string,
      fileName: string
    ) {
      alert("fileBase64=" + fileBase64 + " and fileName=" + fileName);
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(specPostReq)], {
        type: "application/json",
      });
      formData.append("specPostReq", blob);
      if (fileBase64) {
        formData.append("documentation", dataURLtoFile(fileBase64, fileName));
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
