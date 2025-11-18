/************************************************************
// Purpose       : Application Header
// Created by    : Tilak 
// Created Date  : 1-08-2025
// Description   : This is application common header show with layout after login.
//
// Change history:
// 1-08-2025 / Tilak // Write Comments 
// 05-09-2025 / Tilak // Added framer-motion animations for sidebar toggle, notification & profile dropdown
************************************************************/

import { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import Profile from "./Profile";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NotificationDropdown from "../../component/ui/Notification/NotificationDropdown";
import { MdArrowBackIosNew } from "react-icons/md";

type HeaderProps = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  width: number;
  isMobile: boolean;
  setMobileSidebarOpen: (val: boolean) => void;
};

const Header = ({ collapsed, setCollapsed, isMobile, setMobileSidebarOpen, }: HeaderProps) => {
  const [isProfile, setIsProfile] = useState<boolean>(false);

  // Toggle sidebar (for desktop & mobile separately)
  const handleSidebarToggle = () => {
    isMobile ? setMobileSidebarOpen(true) : setCollapsed(!collapsed);
  };

  return (
    <>
      {/* === Fixed/Sticky Header === */}
      <Navbar
        expand="md"
        className="w-100 position-fixed top-0 start-0 end-0 bg-white border-bottom py-2 px-3"
        style={{ zIndex: 1000, height: "60px" }}
      >
        <Container fluid className="p-0 d-flex justify-content-between align-items-center">
          {/* === Left Section: Logo & Sidebar Toggle === */}
          <div className="d-flex align-items-center gap-3">
            <img
              src={"https://suretytelco.com/resources/assets/img/new-logo.png"}
              alt="SmartDesk Logo"
              style={{ height: "40px", width: "auto" }}
              className="img-fluid"
            />

            {/* Animated Sidebar Toggle */}
            <div
              className="toggleicon rounded-circle p-2 bg-light d-flex align-items-center justify-content-center"
              style={{ cursor: "pointer" }}
              onClick={handleSidebarToggle}
            >
              <MdArrowBackIosNew />
            </div>

          </div>

          {/* === Right Section === */}
          <div className="d-flex align-items-center gap-2">
            {/* SearchBar */}
            <div className="d-none d-md-block">
              {/* <SearchBar
                style={{ backgroundColor: "rgb(243, 247, 255)", borderRadius: "25px" }}
                searchTerm="Search here..."
              /> */}
            </div>
            <NotificationDropdown />


            {/* Profile Section with dropdown toggle */}
            <div
              onClick={() => setIsProfile(!isProfile)}
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center gap-2"
            >
              <div
                className="rounded-circle overflow-hidden"
                style={{ width: "36px", height: "36px" }}
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/027/951/137/large_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="d-none d-md-block">
                <span className="text-sm">Tilak Kumar</span>
                <p className="mb-0 text-xs text-muted">Web Designer</p>
              </div>


              <MdOutlineKeyboardArrowDown width="20" height="20" />
            </div>
          </div>
        </Container>
      </Navbar >


      {isProfile && (
        <Profile isProfile={isProfile} setIsProfile={setIsProfile} />
      )
      }

    </>
  );
};

export default Header;
