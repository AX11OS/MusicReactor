import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
  
export const NavBarClienteDatos = [
  {
    title: "Home",
    path: "/Client/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Library",
    path: "/Client/",
    icon: <IoIcons.IoMdBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    subNav: [
      {
        title: "My Playlist",
        path: "/Client/Playlist",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "My Favorites",
        path: "/Client/Favorites",
        icon: <IoIcons.IoMdHeart />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Discover",
    path: "/Client/Discover",
    icon: <FaIcons.FaNewspaper />,
  },
  {
    title: "Genres",
    path: "/Client/Genres",
    icon: <FaIcons.FaMusic />,
  },
]