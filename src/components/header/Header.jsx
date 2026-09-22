"use client";

import React, { useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import Logo from "../../logo.png";
import NextImage from "../NextImage";

import { Link } from "react-router-dom";
import { usePathname } from "next/navigation";
// import Snowfall from "../Snowfall";

const HamburgerContent = dynamic(() => import("./HamburgerContent"), {
  ssr: false,
});

const Header = ({ history, frameRef }) => {
  const pathname = usePathname();
  // State of our Menu
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "",
  });
  // State of our button
  const [disabled, setDisabled] = useState(false);
  const [hasMenuMounted, setHasMenuMounted] = useState(false);
  const disableTimerRef = useRef(null);

  

  // Toggle menu
  const handleMenu = () => {
    setHasMenuMounted(true);
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "open",
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "",
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "open",
      });
    }
  };

  const handleButtonClick = () => {
    disableMenu();
    setState({
      initial: null,
      clicked: false,
      menuName: "",
    });
  };

  useEffect(() => {
    setState((currentState) => {
      if (currentState.clicked !== true) {
        return currentState;
      }

      return {
        initial: null,
        clicked: false,
        menuName: "",
      };
    });
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (disableTimerRef.current) {
        clearTimeout(disableTimerRef.current);
      }
    };
  }, []);

  //Determine if out menu button should be disabled
  const disableMenu = () => {
    if (disableTimerRef.current) {
      clearTimeout(disableTimerRef.current);
    }
    setDisabled(true);
    disableTimerRef.current = setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <>
     
      <header className="header__area"  ref={frameRef}>
        <div className="header__inner">
          <div className="header__logo">
            <div className="logo-primary">
              <Link to={'/'}  id="logo" title="ReBrand Gurus">
                <NextImage
                  data-cursor-size="80px"
                  data-cursor-color="#FF9776"
                  src={Logo}
                  alt="ReBrand Gurus"
                  width={102}
                  height={255}
                  sizes="(max-width: 1024px) 128px, 73px"
                />
              </Link>
            </div>
          </div>

          <div className="header__nav-icon">
            
            <button disabled={disabled}
            className={`menu btn12 ${state.menuName}`}
            onClick={handleMenu} >
              <div className="icon"></div>
            </button>
          </div>

          <div className="header__support">
            <p>
              Support center 
              <a
                href="tel:+1-4353950079"
                data-cursor-size="80px"
                data-cursor-color="#FF9776"
              >
                +1 (435)-395-0079
              </a>
            </p>
          </div>
        </div>
      </header>
      {hasMenuMounted && (
        <HamburgerContent state={state} onButtonClick={handleButtonClick} />
      )}

    </>
  );
};

export default Header;
