import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  classname?: string;
}
function PrimaryButton({
  children,
  type = "button",
  onClick,
  classname,
}: Props) {
  return (
    <button
      className={`bg-[#4BB9B3] text-[16px] rounded-[20px] px-[24px] py-[12px] border-0 text-[white] h-[48px] min-w-[300px] ${classname}`}
      type={type}
      onClick={onClick}
      style={{ fontWeight: "bold" }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
