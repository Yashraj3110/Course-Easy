import ResponsiveAppBar from "./Nav";
import LoginDialog from "./login";
import MainvHome from "./homepage/mainvHome";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/homepage.css";

function MainPage() {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        // Check session status on component mount
        const Authcheck = async () => {
            try {
                const userSessionData = localStorage.getItem('UserSession');
                const userData = JSON.parse(userSessionData);
                // Now you have access to the user data (userData) on this page
                console.log("lStorage",userData);
                setSessionData(userData);
               
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        Authcheck();
        console.log(sessionData)
    }, []);

    if (loading) {
        // Render loading indicator while fetching session data
        return <div></div>;
    }
    return (
        <>
            <ResponsiveAppBar sesData={sessionData} />
            < MainvHome sesData={sessionData} />
            <LoginDialog />
        </>
    )
};

export default MainPage;