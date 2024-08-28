import React from "react";

interface AvatarProps {
  fullName: string;
  color?: string;
  classNames?: string;
  initialClassNames?: string;
}
const AvatarInitial: React.FC<AvatarProps> = ({
  fullName,
  classNames,
  initialClassNames,
}) => {
  function getInitials(name: string) {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join("").toUpperCase();
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full dark:bg-gray-600 ${classNames}`}
    >
      <span
        className={`font-medium font-satoshi text-[14px] dark:text-gray-300 ${initialClassNames}`}
      >
        {getInitials(fullName)}
      </span>
    </div>
  );
};

export default AvatarInitial;
