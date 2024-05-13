import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const GoogleAuthSuccess = () => {
    const location = useLocation();


    useEffect(() => {
        // Parse query parameters from URL
        const params = new URLSearchParams(window.location.search);
        const userDataParam = params.get('userData');
     
        // Check if user data is available
        if (userDataParam) {
            // Parse user data JSON string
            const userDataObject = JSON.parse(decodeURIComponent(userDataParam));
            // Update state with user data
            console.log("Glog",userDataObject)

            localStorage.setItem('UserSession', JSON.stringify(userDataObject));
            window.location.href = '/';
        }


        
    }, [location]);

    return (
        <div>
            <h1>Google Authentication Success</h1>
            {/* You can display a success message or redirect the user to another page */}
        </div>
    );
};

export default GoogleAuthSuccess;