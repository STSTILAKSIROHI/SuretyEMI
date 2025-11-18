import React, { useState } from "react";
import NotificationDot from "./NotificationDot";
import "./NotificationDropdown.css";
import { FaBell } from "react-icons/fa";

type Notification = {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    type?: "action" | "info";
    actions?: { label: string; variant: string }[];
};

const notifications: Notification[] = [
    {
        id: 1,
        name: "Shawn",
        message: "performance in Math is below the threshold.",
        time: "Just Now",
        avatar: "assets/img/profiles/avatar-27.jpg",
    },
    {
        id: 2,
        name: "Sylvia",
        message: "added appointment on 02:00 PM",
        time: "10 mins ago",
        avatar: "assets/img/profiles/avatar-23.jpg",
        type: "action",
        actions: [
            { label: "Deny", variant: "light" },
            { label: "Approve", variant: "primary" },
        ],
    },
    {
        id: 3,
        name: "George",
        message: "New student record is created by Teressa",
        time: "2 hrs ago",
        avatar: "assets/img/profiles/avatar-25.jpg",
    },
    {
        id: 4,
        name: "Elisa",
        message: "A new teacher record for Elisa",
        time: "09:45 AM",
        avatar: "assets/img/profiles/avatar-01.jpg",
    },
];

const NotificationDropdown: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <div onMouseLeave={() => setOpen(!open)} className="me-1 notification_item position-relative">
            <div className="position-relative" onClick={() => setOpen(!open)}>
                <FaBell />
                <NotificationDot />
            </div>

            {open == true && (
                <div
                    className={`dropdown-menu-end notification-dropdown p-4 ${open ? "open" : ""}`}>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                        <h4 className="notification-title">
                            Notifications ({notifications.length})
                        </h4>
                        <div className="d-flex align-items-center">
                            <div className="dropdown">
                                <a
                                    href="#"
                                    className="bg-white dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="ti ti-calendar-due me-1"></i>Today
                                </a>
                                <ul className="dropdown-menu mt-2 p-3">
                                    {["This Week", "Last Week", "Last Month"].map((range, i) => (
                                        <li key={i}>
                                            <a href="#" className="dropdown-item rounded-1">
                                                {range}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="noti-content">
                        <div className="d-flex flex-column">
                            {notifications.map((n) => (
                                <div key={n.id} className="border-bottom text-sm mb-3 pb-3">
                                    <a href="activity">
                                        <div className="d-flex">
                                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                <img src={n.avatar} alt="Profile" />
                                            </span>
                                            <div className="flex-grow-1">
                                                <p className="mb-1">
                                                    <span className="text-dark fw-semibold">{n.name}</span>{" "}
                                                    {n.message}
                                                </p>
                                                <span>{n.time}</span>
                                                {n.type === "action" && (
                                                    <div className="d-flex justify-content-start align-items-center mt-1">
                                                        {n.actions?.map((action, i) => (
                                                            <span
                                                                key={i}
                                                                className={`btn btn-${action.variant} btn-sm me-2`}
                                                            >
                                                                {action.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            )}
        </div>
    );
};

export default NotificationDropdown;
