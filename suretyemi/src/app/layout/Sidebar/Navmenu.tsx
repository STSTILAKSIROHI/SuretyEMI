import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavmenuProps } from "../../../types/type";

const Navmenu: React.FC<NavmenuProps> = React.memo(({ menus, collapsed, isHovered }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const prevOpenRef = useRef<number | null>(null); // store previously-open submenu when collapsed
  const { pathname } = useLocation();

  // Determine current location short name (for active top-level highlighting)
  const locationName = pathname.replace(/^\//, "");

  // Toggle submenu using index. Ensures only one open at a time.
  const toggleSubmenu = useCallback((index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  }, []);

  // keyboard handler for parent toggles (Enter/Space)
  const onParentKey = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleSubmenu(index);
      }
    },
    [toggleSubmenu]
  );

  // Auto-expand submenu on first load if current URL matches a child route
  useEffect(() => {
    const matchedIndex = menus.findIndex(
      (item) =>
        Array.isArray(item.child) &&
        item.child.some((ci) => pathname.startsWith(`/${ci.childlink}`))
    );
    setActiveSubmenu(matchedIndex !== -1 ? matchedIndex : null);
  }, [pathname, menus]);

  // Handle Collapse State Transitions
  useEffect(() => {
    if (collapsed) {
      // when entering collapsed state, save the current active submenu then hide it
      prevOpenRef.current = activeSubmenu;
      setActiveSubmenu(null);
    } else {
      // when not collapsed, clear saved prevOpen because full sidebar shows all behaviour
      prevOpenRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed]);

  // Handle Hover State Transitions while Collapsed
  useEffect(() => {
    if (!collapsed) return;

    if (isHovered) {
      // restore previously saved submenu (if any) when hovering collapsed sidebar
      if (prevOpenRef.current !== null) {
        setActiveSubmenu(prevOpenRef.current);
      }
    } else {
      // when hover ends, close active submenu but keep prevOpenRef (already set or updated)
      prevOpenRef.current = activeSubmenu ?? prevOpenRef.current;
      setActiveSubmenu(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, collapsed]);

  return (
    <nav aria-label="Main navigation">
      <ul className="menu-list mt-3">
        {menus.map((item, i) => {
          const isActive = activeSubmenu === i;
          const pathSegment = pathname.split("/")[1] || "";
          const isCurrent = locationName === item.link || pathSegment === item.link;

          // Logic 1: Handle Section Headers
          if (item.isHeadr) {
            return (
              <li key={i} className="menu-header mt-3 mb-1 px-3">
                {(!collapsed || isHovered) && (
                  <span className="text-uppercase small fw-bold text-muted">
                    {item.title}
                  </span>
                )}
                {/* If collapsed and not hovered, we typically show nothing or a separator for headers */}
              </li>
            );
          }

          const Icon = item.icon;

          // Logic 2: Single Link (No Children)
          if (!item.child) {
            return (
              <li
                key={i}
                className={[
                  "single-sidebar-menu",
                  isCurrent ? "menu-item-active" : "",
                ].join(" ")}
              >
                <NavLink
                  className="menu-link d-flex align-items-center"
                  to={item.link || "#"} // Fallback to hash if link is missing
                >
                  <span className="menu-icon pe-2">
                    {Icon && <Icon width={18} height={18} />}
                  </span>
                  {(!collapsed || isHovered) && (
                    <span className="menu-text fw-medium">{item.title}</span>
                  )}
                </NavLink>
              </li>
            );
          }

          // Logic 3: Submenu Parent (Has Children)
          return (
            <li
              key={i}
              className={[
                "single-sidebar-menu",
                "item-has-children",
                isActive ? "open" : "",
                isCurrent ? "menu-item-active" : "",
              ].join(" ")}
            >
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-controls={`submenu-${i}`}
                className={[
                  "menu-link",
                  "d-flex",
                  "justify-content-between",
                  "align-items-center",
                  "px-2",
                  "py-2",
                  "cursor-pointer",
                  isActive
                    ? "parent_active not-collapsed background-light"
                    : "collapsed",
                ].join(" ")}
                onClick={() => toggleSubmenu(i)}
                onKeyDown={(e) => onParentKey(e, i)}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="menu-icon">
                    {Icon && <Icon width={18} height={18} />}
                  </span>

                  {(!collapsed || isHovered) && (
                    <span className="menu-text fw-medium">{item.title}</span>
                  )}
                </div>

                {(!collapsed || isHovered) && (
                  <div
                    className={`menu-arrow rounded-circle ${isActive ? "rotate-icon" : ""
                      }`}
                  >
                    <MdOutlineKeyboardArrowDown width={18} height={18} />
                  </div>
                )}
              </div>
              <Sidebar
                activeSubmenu={activeSubmenu}
                item={item}
                i={i}
                collapsed={collapsed}
                isHovered={isHovered}
                isMenuBar={false}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navmenu;