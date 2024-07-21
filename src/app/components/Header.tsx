"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useTypewriter from "react-typewriter-hook";
import playIcon from "../../../public/icons/play-icon.svg";
import headerVideoPlaceholder from "../../../public/images/header-video-placeholder.svg";

import Navbar from "./Navbar";

const MagicOcean = ["Royalty", "Dmore", "Ease", "Discounts"];
let index = 0;

const Header = () => {
  const videoSrc = "videos/vid-home.mp4";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [magicName, setMagicName] = React.useState("Royalty");
  const intervalRef = useRef<number | null>(null);
  const name = useTypewriter(magicName);
  const nameRef = useRef<HTMLElement | null>(null);

  const [wordWidth, setWordWidth] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      // Update the state to the next item in the array
      index = index > 2 ? 0 : ++index;
      setMagicName(MagicOcean[index]);
    }, 5000); // Change the word every 5 seconds

    return function clear() {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [magicName]);

  useEffect(() => {
    if (nameRef.current) {
      setWordWidth(nameRef.current.offsetWidth);
    }
  }, [name]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-auto overflow-x-hidden bg-light-purple">
      <Navbar />
      {/* Header */}
      <div className="flex flex-col space-y-10 w-[90%] py-20 items-start">
        <div className="flex flex-col space-y-5">
          <p className="font-satoshi text-[90px] leading-[102px] -tracking-[1.8px] text-dark-purple relative z-10">
            Retail Online With{" "}
            <span className="italic" ref={nameRef}>
              {name}
            </span>
            <span className="cursor" />
            <span
              className={`bg-[#FFEB71] absolute right-0 bottom-0 -z-10`}
              style={{ width: `${wordWidth}px`, height: "50%" }}
            ></span>
          </p>
          <p className="font-satoshi font-medium text-[32px] leading-[32px] -tracking-[1%] text-dark-purple">
            Dmore we&apos;re together, the happier we shall be...
          </p>
        </div>
        <button className="px-20 py-[1rem] bg-dark-purple font-satoshi font-medium text-[20px] leading-[28px] text-[#F1F4F0] rounded-[10px]">
          Shop Now
        </button>
        <div className="grid grid-cols-10 w-full gap-5">
          <div className="col-span-4 bg-dark-purple rounded-[10px] flex justify-center items-center">
            <div className="w-full h-[442px]"></div>
          </div>
          <div className="col-span-6 rounded-[10px] flex justify-center items-center">
            <div className="h-full w-full relative rounded-[10px]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full absolute top-0 left-0 object-cover rounded-[10px]"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                <Image
                  src={playIcon}
                  alt="play icon"
                  className="cursor-pointer opacity-[.5] hover:opacity-[1] transition-all duration-300 ease-in-out"
                  onClick={togglePlayPause}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
