import BtnUrl from "@/components/btnUrl/btnUrl.component";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 rounded shadow">
        <div className="mx-auto text-center" >
          <h1 className="text-white" >HELLO</h1>
        </div>
        <div className="flex justify-evenly" >
          <BtnUrl margin="me-1" name={"REGISTER"} border={"border-white"} hoverBg={"hover:bg-blue-500"} text={"text-white"} bgColor={"bg-transparent"} url={"/auth/register"} pdd={"p-1"} hoverText={"hover:text-black"} />
          <BtnUrl name={"LOGIN"} border={"border-white"} hoverBg={"hover:bg-blue-500"} text={"text-white"} bgColor={"bg-transparent"} url={"/auth/login"} pdd={"p-1"} hoverText={"hover:text-black"} />
        </div>
      </div>
    </div>
  );
}
