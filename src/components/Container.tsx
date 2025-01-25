import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center bg-[#F5F5F5] px-[100px] py-[50px] rounded-[28px] gap-[10px]"
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </div>
  );
}

export default Container;
