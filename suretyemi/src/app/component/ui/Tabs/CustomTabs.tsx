/************************************************************
// Component     : Custom Tabs Component
// Purpose       : Custom Tabs Component for implementation of the tabs in any pages
// Created by    : Prateek
// Created Date  : 05-08-2025
// Description   : Custom Tabs Component for using the tabs in any pages

// Change History:
************************************************************/

import './CustomTabs.css'
import React, { Suspense, useState } from "react";
import { IconType } from 'react-icons';
import Loading from '../../loading/Loading';

interface MenuItem {
    title: string;
    icon?: IconType | React.ReactNode;
    link: string;
}

interface CustomTabsProps {
    menus: MenuItem[];
    contentMap: any; // key = menu.link

}

const CustomTabs: React.FC<CustomTabsProps> = ({ menus, contentMap }) => {
    const [activeTab, setActiveTab] = useState<string>(menus[0]?.link || "");
    const ActiveContent = contentMap[activeTab];
    return (
        <div className="CustomHeight d-flex ">
            {/* Sidebar */}
            <ul className="sidebar-tab-list pt-3 px-3 border-end">
                {menus.map((item, i) => {
                    const isActive = activeTab === item.link;
                    return (
                        <li
                            key={i}
                            className={`sidebar-tab-item ${isActive ? "active-tab" : ""}`}
                            onClick={() => setActiveTab(item.link)}
                        >
                            <div className="tab-link d-flex align-items-center gap-2 py-2 px-3 cursor-pointer mb-1">
                                {item.icon &&
                                    (typeof item.icon === "function"
                                        ? React.createElement(item.icon, { size: 15 })
                                        : item.icon)}
                                <span className="tab-label fw-medium">{item.title}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Content Panel */}
            <div className="tab-content-panel w-100 bg-white">
                <Suspense fallback={<Loading />}>
                    {React.isValidElement(ActiveContent) ? (
                        ActiveContent
                    ) : ActiveContent ? (
                        React.createElement(ActiveContent)
                    ) : (
                        <p className="p-3">No content available</p>
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default CustomTabs;
