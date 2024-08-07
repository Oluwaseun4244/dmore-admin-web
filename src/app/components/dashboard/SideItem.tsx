import React from "react";
import Image from "next/image";

interface SideItemProps {
  imgSource: string;
}

const SideItem: React.FC<SideItemProps> = ({ imgSource }) => {
  return (
    <div className="my-5">
      <Image src={imgSource} alt="settings" />
    </div>
  );
};

export default SideItem;
