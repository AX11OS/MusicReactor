import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
  
export const NavBarClienteDatos = [
  {
    title: "Inicio",
    path: "/PanelUsuario/Inicio",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Biblioteca",
    path: "/PanelUsuario/Inicio",
    icon: <IoIcons.IoMdBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    subNav: [
      {
        title: "Mis listas de reproducción",
        path: "/PanelUsuario/Listas",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Favoritos",
        path: "/PanelUsuario/Favoritos",
        icon: <IoIcons.IoMdHeart />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Descrubrir",
    path: "/PanelUsuario/Descubrir",
    icon: <FaIcons.FaNewspaper />,
  },
  {
    title: "Géneros",
    path: "/PanelUsuario/Generos",
    icon: <FaIcons.FaMusic />,
  },
]