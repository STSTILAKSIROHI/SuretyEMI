// Purpose: Application sidebar
// Created by: Tilak
// Created Date: 29-07-2025
// Description: This is application common sidebar to adjust the layout of the application. It is used to display the sidebar of the application.

// Change history:
// 29-07-2025 / Tilak // create Ui 
//***********************/
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";

type ProfileProps = {
  isProfile: boolean;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
  screenWidth?: number;
};

const Profile = ({ isProfile, setIsProfile, screenWidth = 1024 }: ProfileProps) => {
  const navigate = useNavigate(); // used for navigate to other pages
  const [animate, setAnimate] = useState(false); // it is using for animate the profile when it is open or close

  // slight delay to trigger transition
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // on  profile page 
  const handleProfileClick = () => {
    navigate("/profile");
    setIsProfile(false);
  };
  //  logout 
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!isProfile) return null;

  return (
    // ========================== profile 
    <div onMouseLeave={() => setIsProfile(false)} >
      <div className={`${screenWidth >= 875 ? "" : "bg-sidebar"}`}></div>

      <div className={`profile-menu-section ${animate ? "dropdown-animate" : ""} bg-white shadow-sm rounded p-3 position-absolute end-0 mt-2 me-3 ${screenWidth < 450 ? "MobileProfile-section" : ""}`}
        style={{ minWidth: "220px", zIndex: 1000, }}>

        <ul className="list-unstyled m-0 text-sm fw-medium text-dark">
          {/* =========================== Profile Header ================================= */}
          <li className="border-bottom mb-2 pb-2 d-flex align-items-center gap-2">
            <div className="ProfileHeader-icon rounded-circle overflow-hidden" style={{ width: "35px", height: "35px" }}>
              <img
                src="https://static.vecteezy.com/system/resources/previews/027/951/137/large_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                alt="Profile"
                className="img-fluid"
              />
            </div>
            <div>
              <div className="fw-semibold" style={{ fontSize: "0.9rem" }}>Praveen Patel</div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>Prompt Engineer</div>
            </div>
          </li>

          {/* =========================== Menu Items ===================================== */}
          <li className="px-2 py-1 hover-effect cursor-pointer" onClick={handleProfileClick}>
            <i className="me-2 feather feather-user" /> Profile
          </li>
          <li className="px-2 py-1 hover-effect cursor-pointer">
            <i className="me-2 feather feather-settings" /> Settings
          </li>
          {/*  */}
          <li className="px-2 py-1 hover-effect text-danger cursor-pointer" onClick={handleLogout}>
            <i className="me-2 feather feather-log-out" /> Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
