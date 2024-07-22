import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.svg";

import cartIcon from "../../../public/icons/cart-icon.svg";
import heartIcon from "../../../public/icons/heart-icon.svg";
import searchIcon from "../../../public/icons/search-icon.svg";

const Navbar = () => {
  const navLinks = [
    {
      title: "Appliances",
      link: "appliances",
    },
    {
      title: "New Arrivals",
      link: "new-arrivals",
    },
    {
      title: "Electronics",
      link: "electronics",
    },
    {
      title: "Fashion",
      link: "fashion",
    },
    {
      title: "Other Categories",
      link: "other-categories",
    },
  ];
  return (
    <div className='flex flex-col justify-center items-center w-screen overflow-x-hidden bg-light-purple h-auto py-8 border border-[#3F097333] border-t-0 border-r-0 border-l-0 border-b border-opacity-[20%]'>
      <div className='flex w-[90%] py-0 justify-between items-center'>
        <div className='flex space-x-10 items-center'>
          <Link href='/'>
            <Image src={logo} alt='logo' />
          </Link>
          <div className='flex space-x-10 items-center'>
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`/${link.link}`}
                className='font-satoshi text-[16px] leading-[20px] -tracking-[.32px] text-dark-purple'
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
        <div className='flex space-x-10 items-center'>
          <div className='flex space-x-5 items-center'>
            <Image
              src={searchIcon}
              alt='search-icon'
              className='cursor-pointer'
            />
            <Image
              src={heartIcon}
              alt='heart-icon'
              className='cursor-pointer'
            />
            <Image src={cartIcon} alt='cart-icon' className='cursor-pointer' />
          </div>
          <div className='flex space-x-3 items-center'>
            <Link
              href='/signup'
              className='font-satoshi font-medium text-[14px] leading-[18.9px] tracking-[.15px] text-center px-5 py-3 text-dark-purple bg-light-purple border border-dark-purple rounded-[10px]'
            >
              Sign up
            </Link>
            <Link
              href='/login'
              className='font-satoshi font-medium text-[14px] leading-[18.9px] tracking-[.15px] text-center px-5 py-3 text-white bg-dark-purple border border-dark-purple hover:bg-light-purpl rounded-[10px]'
            >
              Sign in
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
