import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-center p-24">
      <Image
        alt="logo"
        src={require("../../public/images/logo.png")}
        width={200}
        height={200}
        priority
        className="rounded-lg"
      />
      <p className="text-[4rem] font-bold text-[#0094FF]">Specto</p>
      <p className="text-[1.8rem] font-medium">
        스펙 관리에 어려움을 겪는 대학생을 위한, 1:1 스펙 매니징 서비스
      </p>
      <div className="text-[1.4rem] flex flex-col items-center gap-4">
        <p>
          문의:{" "}
          <Link href={"mailto:qhdwltn1380@gmail.com"}>
            <span className="hover:underline hover:text-sky-500">
              qhdwltn1380@gmail.com
            </span>
          </Link>
        </p>
        <Link href={"/privacy"}>
          <span className="font-bold">개인정보처리방침</span>
        </Link>
      </div>
    </main>
  );
}
