import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Theme from "../daisyui/Theme";

const Header = () => {
  return (
    <>
      <header>
        <input
          type="checkbox"
          name="hbr"
          id="hbr"
          className="hbr peer"
          hidden
          aria-hidden="true"
        />
        <nav className="fixed top-0 z-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative md:bg-transparent dark:shadow-none">
          <div className="xl:container m-auto px-6 md:px-4 w-full">
            <div className="flex w-full flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
              <div className="w-full flex justify-between lg:w-auto">
                <Link
                  to="/"
                  aria-label="logo"
                  className="flex items-center space-x-4"
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-12 rounded-full"
                  />
                  <h1 className="text-2xl  font-extrabold text-[#0f2f63] dark:text-[#2cce75] tracking-wide">
                    Blue
                    <span className="text-[#2cce75] dark:text-[#4878c7]">
                      Moon
                    </span>{" "}
                    Mart26
                  </h1>
                </Link>
                <label
                  htmlFor="hbr"
                  className="peer-checked:hamburger block relative z-20 p-6 ml-auto -mr-6 cursor-pointer lg:hidden"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-6 rounded bg-[#0f2f63] dark:bg-[#2cce75] transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-[#0f2f63] dark:bg-[#2cce75] transition duration-300"
                  ></div>
                </label>
              </div>
              <div className="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 tracking-wide font-bold text-base lg:text-sm lg:flex lg:space-y-0 ">
                    <li>
                      <Link
                        to={"/"}
                        className={`${
                          window.location.pathname === "/"
                            ? "text-[#0f2f63] dark:text-[#2cce75]"
                            : ""
                        } block md:px-4 transition hover:text-[#0f2f63] dark:hover:text-[#2cce75]`}
                      >
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/about"}
                        className="block md:px-4 transition hover:text-[#0f2f63] dark:hover:text-[#2cce75]"
                      >
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/product"}
                        className="block md:px-4 transition hover:text-[#0f2f63] dark:hover:text-[#2cce75]"
                      >
                        <span>Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/contact"}
                        className="block md:px-4 transition hover:text-[#0f2f63] dark:hover:text-[#2cce75]"
                      >
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l">
                  <div className="ml-2 flex items-center max-lg:justify-end max-lg:mt-[-12.5rem] max-lg:mb-36">
                    <Theme />
                  </div>
                  <a
                    href="#"
                    className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-[#0f2f63]/20 dark:focus:before:bg-[#2cce75]/40 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-sm font-semibold text-[#0f2f63] dark:text-[#2cce75]">
                      Sign Up
                    </span>
                  </a>
                  <a
                    href="#"
                    className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#4878c7] before:to-[#2cce75] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span className="relative text-sm font-semibold text-white dark:text-gray-900">
                      Login
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
