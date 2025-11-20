import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getUserData } from './common';
interface privateRouteProps {
    children: ReactNode
}

const PrivateRoute: React.FC<privateRouteProps> = ({ children }) => {

    const userData = getUserData();

    // var commonArr = [{ name: "Profile", url: "/profile" }];  if (menuItem(userData?.role).filter((items: menusDataProps) => items.isShow).some((items: any) => items.link === currentPath) || currentPath === "/profile")
    const location = useLocation();
    const currentPath = "/" + location.pathname.split("/")[1];


    if (userData?.loginFlag !== "Y") {
        document.title = "Smart Saas Manager";
        return <Navigate to='/' />
    } else {
        document.title =
            "Smart Saas Manager | User Name : " +
            userData?.userNm +
            " | Last Login: " +
            userData?.lastLogin;

        if (userData.tempPassword) {
            return <>
                <Navigate to='/profile' state={{ changePwd: true }} />
                {children}
            </>
        } else {
            return <>{children}</>
        }
        //  else {
        //     document.title = "Smart Saas Manager";
        //     logout();
        //     return <Navigate to='/sessionout' />
        // }
    }
}

export default PrivateRoute;