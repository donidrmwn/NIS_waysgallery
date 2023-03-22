import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Navibar from "./Navibar/Navibar";

export function PrivateRouteLogin() {
    const [state] = useContext(UserContext);
    if (!state.isLogin) {
        return <Navigate to="/" />
    }
    return (
        <>
            <Navibar />
            <Outlet />
        </>
    )


}