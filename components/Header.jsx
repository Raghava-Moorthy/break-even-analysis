import React from "react";
import logo from "../public/icons/72BTimage.png";
import Image from "next/image";

function Header() {
  return (
    <>
      <div className="h-[6vh] bg-[#F5F5F5] ">
        <div className="ml-5 pt-2 flex items-center justify-between ">
          <Image src={logo} width={100} height={100} alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default Header;
