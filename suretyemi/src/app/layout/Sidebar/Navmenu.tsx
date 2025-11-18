// Navmenu.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

/**
 * Types
 */
type IconComponent = React.ComponentType<
  | { width?: number | string; height?: number | string; className?: string }
  | React.SVGProps<SVGSVGElement>
>;

export interface SubMenuItem {
  childtitle: string;
  childlink: string;
  childicon?: string;
}

export interface MenuItem {
  title: string;
  link?: string; // parent top-level link if exists
  icon: IconComponent;
  child?: SubMenuItem[]; // if has children
  isHeadr?: boolean; // header-like non-clickable item
}

/**
 * Props to Navmenu
 */
interface NavmenuProps {
  menus: MenuItem[];
  collapsed: boolean;
  isHovered: boolean;
}

/**
 * Navmenu component
 *
 * Behaviour summary:
 * - When collapsed: show only icons, hide submenu (display:none).
 * - On hover while collapsed: expand to show labels and restore last-open submenu.
 * - Only one submenu open at a time.
 * - Clicking a parent toggles its submenu (and closes any other).
 * - Parent toggles are keyboard-accessible.
 */
const Navmenu: React.FC<NavmenuProps> = React.memo(({ menus, collapsed, isHovered }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const prevOpenRef = useRef<number | null>(null); // store previously-open submenu when collapsed
  const { pathname } = useLocation();

  // Determine current location short name (for active top-level highlighting)
  const locationName = pathname.replace(/^\//, "");

  // Toggle submenu using index. Ensures only one open at a time.
  const toggleSubmenu = useCallback((index: number) => {
    setActiveSubmenu(prev => (prev === index ? null : index));
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
    const matchedIndex = menus.findIndex(item =>
      Array.isArray(item.child) && item.child.some(ci => pathname.startsWith(`/${ci.childlink}`))
    );
    setActiveSubmenu(matchedIndex !== -1 ? matchedIndex : null);
  }, [pathname, menus]);

  // Handle collapse/hover interactions:
  // - When collapsed becomes true, remember currently open submenu and close it.
  // - While collapsed, if isHovered becomes true, restore previous submenu.
  // - When hover ends while collapsed, close submenu but keep previous saved.
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

  useEffect(() => {
    if (!collapsed) return;

    if (isHovered) {
      // restore previously saved submenu (if any) when hovering collapsed sidebar
      if (prevOpenRef.current !== null) {
        setActiveSubmenu(prevOpenRef.current);
      }
    } else {
      // when hover ends, close active submenu but keep prevOpenRef (already set)
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
          const pathSegment = pathname.split("/")[1]; // e.g. "integrations" from "/integrations/apiview"
          const isCurrent = locationName === item.link || pathSegment === item.link;

          // Should submenu content be visible? It's visible when either:
          // - sidebar is expanded (!collapsed), OR
          // - sidebar is collapsed but hovered (isHovered)
          // AND the submenu is actually open (isActive)
          const showSubmenu = (!collapsed || isHovered) && isActive;

          // Top-level link (no child)
          if (!item.child && !item.isHeadr && item.link) {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className={[
                  "single-sidebar-menu",
                  isCurrent ? "menu-item-active" : "",
                ].join(" ")}
              >
                <NavLink className="menu-link d-flex align-items-center" to={item.link}>
                  <span className="menu-icon pe-2">
                    <Icon width={18} height={18} />
                  </span>
                  {(!collapsed || isHovered) && (
                    <span className="menu-text fw-medium">{item.title}</span>
                  )}
                </NavLink>
              </li>
            );
          }

          // Dropdown parent with children
          const Icon = item.icon;
          return (
            <li
              key={i}
              className={[
                "single-sidebar-menu",
                item.child ? "item-has-children" : "",
                isActive ? "open" : "",
                isCurrent ? "menu-item-active" : "",
              ].join(" ")}
            >
              <div
                // Parent toggle - uses role=button for screen readers
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
                  isActive ? "parent_active not-collapsed background-light" : "collapsed",
                ].join(" ")}
                onClick={() => toggleSubmenu(i)}
                onKeyDown={(e) => onParentKey(e, i)}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="menu-icon">
                    <Icon width={18} height={18} />
                  </span>

                  {(!collapsed || isHovered) && (
                    <span className="menu-text fw-medium">{item.title}</span>
                  )}
                </div>

                {(!collapsed || isHovered) && (
                  <div className={`menu-arrow rounded-circle ${isActive ? "rotate-icon" : ""}`}>
                    <MdOutlineKeyboardArrowDown width={18} height={18} />
                  </div>
                )}
              </div>

              {/* Sidebar component responsible for rendering children.
                  We pass showSubmenu so Sidebar can hide with display:none when collapsed */}
              <Sidebar
                activeSubmenu={activeSubmenu}
                item={item}
                i={i}
                collapsed={collapsed}
                isHovered={isHovered}
                isMenuBar={false}
              // showSubmenu={showSubmenu} // <-- new prop you should read in Sidebar
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default Navmenu;
