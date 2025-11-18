import React, { useState } from "react";
import { menuItems } from "./menus";
import Navmenu from "./Navmenu";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
  isMobile: boolean;
};

const SidebarItems: React.FC<SidebarProps> = ({ collapsed, isMobile, mobileOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div style={{ left: isMobile && !mobileOpen ? "-250px" : "0", }}
        className={`sidebar-wrapper sidebar-bg-img ${collapsed ? "closed" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
        <Navmenu menus={menuItems} collapsed={collapsed} isHovered={isHovered} />
      </div>
    </>
  );
};
export default SidebarItems;
