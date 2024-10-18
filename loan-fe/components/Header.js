import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = ({ setOpenUserNFTs }) => {
  return (
    <header className="uni-header uk-position-top  pl-20 pr-20">
      <div className="uni-header-navbar">
        <div className="uk-container-full">
          <nav className="uk-navbar uk-navbar-container uk-navbar-transparent">
            <div
              className="flex justify-between items-center uk-navbar-top"
            >
              <div className="uk-navbar-left uk-flex-1@m">
                <a
                  href="/"
                  className="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove"
                >
                  C2E-Loan
                </a>
              </div>
              <ul className="flex flex-grow justify-center uk-navbar-nav dark:uk-text-gray-10 uk-visible@m">
                <li
                >
                  <Link
                    className="mr-5"
                    onClick={() => {
                      console.log('home')
                    }} href={'/'} >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="ml-5"
                    onClick={() => {
                      console.log('history')
                    }}
                    href='/history'
                  >
                    History
                  </Link>
                </li>
              </ul>
              <ConnectButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
