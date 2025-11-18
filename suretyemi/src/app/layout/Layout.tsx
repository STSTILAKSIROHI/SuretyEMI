// Purpose: Application Sidebar Layout
// Created by: Tilak
// Created Date: 30-08-2025
// Description: Common application layout for sidebar, header, and content display.

// Change history:
// 31-08-2025 / Tilak // Added comments
//********************************************************/

import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Loading from "../component/loading/Loading";
import SidebarItems from "./Sidebar/SidebarItems";
import Footer from "./Footer/Footer";

const Layout: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(true);

  // Handle window resize to adjust layout behavior
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      // Automatically collapse sidebar on small screens
      if (currentWidth <= 875) {
        setCollapsed(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 875;
  const sidebarWidth = isMobile ? 0 : collapsed ? 65 : 200;

  return (
    <>
      {/* Header Component */}
      <Header collapsed={collapsed} setCollapsed={setCollapsed} width={width} isMobile={isMobile} setMobileSidebarOpen={setMobileSidebarOpen} />
      <div style={{ marginTop: "60px" }} className="d-flex">
        {/* Sidebar */}
        <div style={{ width: `${sidebarWidth}px`, transition: "width 0.3s ease", }}>
          <SidebarItems collapsed={collapsed} mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} isMobile={isMobile} />
        </div>
        {/* Main Content */}
        <div className="Screens-Container position-relative flex-grow-1 overflow-auto" style={{ width: `calc(100vw - ${sidebarWidth}px)` }}>
          <div style={{ height: `calc(100vh - 110px)` }} className="position-relative pb-2 flex-grow-1 ">
            {/* Dynamic routed page content */}
            <Suspense fallback={<Loading />}><Outlet /></Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
