// Purpose: Application Sidebar
// Created by: Prateek
// Created Date: 27-07-2025
// Description: This is application common sidebar show with layout after login.

// Change history:
//***********************/

// sidebar submenu items code collapse
import React from "react";
import { Collapse } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

interface SubMenuItem {
  childtitle: string;
  childlink: string;
  childicon: string;
  multi_menu?: boolean;
}

interface SubmenuProps {
  activeSubmenu: number | null;
  item?: any;
  i: number;
  isMenuBar: boolean;
  collapsed: boolean;
  isHovered: boolean;
}

const Sidebar: React.FC<SubmenuProps> = ({ activeSubmenu, item, i, collapsed, isHovered }) => {
  const { pathname } = useLocation();
  const shouldOpen = activeSubmenu === i && (!collapsed || isHovered);
  return (

    // Submenu 
    <Collapse in={shouldOpen}>
      <ul className="sub-menu ms-3 solid-line">
        {item?.child?.map((subItem: SubMenuItem, j: number) => {
          const isCurrent = pathname.startsWith(`/${subItem.childlink}`);
          return (
            <li key={j} className="px-3 py-2 width-max-content">
              <NavLink to={`/${subItem.childlink}`}>
                <div className={`d-flex align-items-center gap-2 text-sm fw-medium ${isCurrent ? "fw-semibold text-black" : "text-muted"}`}>  <span>{subItem.childtitle}</span></div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </Collapse>
  );
};

export default Sidebar;
