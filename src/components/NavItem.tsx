import React from "react";
import SpeechIcon from "../icons/SpeechIcon";

interface Props {
  icon: React.ReactNode;
  text: string;
}
function NavItem({ icon, text }: Props) {
  return (
    <div
      className="h-[200px] w-[150px] relative cursor-pointer justify-center flex flex-col items-center gap-[10px] p-[20px] border border-[#0000004F] rounded-[20px] bg-[#EDFFFE]"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {icon}
      <span
        className="text-[24px] text-[#000000]  text-center"
        style={{ fontWeight: 100 }}
      >
        {text}
      </span>
      <div className="absolute top-[10px] right-[10px] cursor-pointer">
        <SpeechIcon />
      </div>
    </div>
  );
}

export default NavItem;
