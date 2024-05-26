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
  const documentation = searchParams?.get("documentation") ?? "";

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
    postData(JSON.parse(specPostReq), documentation);

    async function postData(
      specPostReq: SpecPostReqBase,
      documentation: string | null
    ) {
      alert("documentation " + documentation);
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(specPostReq)], {
        type: "application/json",
      });
      formData.append("specPostReq", blob);
      if (documentation) {
        formData.append("documentation", documentation);
      }

      try {
        const res = await fetch("/api/api/v1/spec", {
          method: "POST",
          body: formData,
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InhrcWpzc2xzZWs4MEBuYXZlci5jb20iLCJpYXQiOjE3MTY3MjQ3MzYsImV4cCI6MTcxNjcyNjUzNiwidHlwZSI6ImFjY2VzcyJ9.Qj7BCILySgLYX2atHNORH-TFGx_jW3EwR8oDXQyF2wg",
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
