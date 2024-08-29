import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SideItemProps {
  imgSource: string;
  route: string;
}

const SideItem: React.FC<SideItemProps> = ({ imgSource, route }) => {
  return (
    <Link href={route}>
      <div className="my-5 flex items-center justify-center">
        <Image src={imgSource} alt={route} />
      </div>
    </Link>
  );
};

export default SideItem;
