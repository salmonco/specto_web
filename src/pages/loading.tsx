import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Image
        alt="loading..."
        src={require("../../public/images/loader-spinner.gif")}
        width={100}
        height={100}
        priority
      />
    </div>
  );
}
