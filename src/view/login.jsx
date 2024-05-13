import React, { useEffect, useState } from "react";
import "../css/user.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const accountinitialvalues = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations",
    },
    signup: {
        view: "signup",
        heading: "Sign Up",
        subHeading: "Looks like you're new here! Register now",
    },
};
const UserDetails = {
    name: "",
    email: "",
    phone: "",
    password: "",
};
const UserLogin = {
    email: "",
    password: "",
};

function LoginDialog({ open, setDialogOpen }) {
    const [account, setAccount] = useState(accountinitialvalues.login);
    const [Signup, setSignup] = useState(UserDetails)
    const [Login, setlogin] = useState(UserLogin)
    const navigate = useNavigate();

    const handleClose = () => {
        setDialogOpen(false);

    };
    const toggleSignup = () => {
        setAccount(accountinitialvalues.signup);
    };

    const toggleLogin = () => {
        setAccount(accountinitialvalues.login);
    };

    const onInputChange = (e) => {
        setSignup({ ...Signup, [e.target.name]: e.target.value });
    };
    const onInputLogin = (e) => {
        setlogin({ ...Login, [e.target.name]: e.target.value });
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const HandelSubmit = async (e) => {
        try {
            const response = await axios.post(`${apiUrl}/api/user/register`, { credentials: Signup });
            if (response) {
                console.log("Data saved successfully");
                setSignup(UserDetails);
                setAccount(accountinitialvalues.login)
            } else {
                console.log("Error in saving the Data");
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };
    const HandelLogin = async (e) => {
        try {
            const response = await axios.post(`${apiUrl}/api/user/login`, { credentials: Login });

            console.log("Logdata",response.data.userData);
            setDialogOpen(false);
            if (response.status === 200) {
                console.log("login successfully");
                localStorage.setItem('UserSession', JSON.stringify(response.data.userData));
                
                setlogin(UserLogin);
                window.location.reload()
            } else {
                console.log("Error in Log in");
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };

    const handleGoogleSignIn = async () => {
        try {
            // Perform Google sign-in
            window.location.href = `${apiUrl}/auth/google?scope=profile email phone`; // Include 'phone' scope
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };


    return (
        <>
            <div id="UserLogform">

                <div className={`modal fade ${open ? 'show' : ''}`} id="exampleModalLive" style={{ display: open ? 'block' : 'none', background: open ? 'rgba(0, 0, 0, 0.5)' : 'none' }} aria-modal={open ? 'true' : undefined} aria-hidden={!open} tabIndex="-1" aria-labelledby="exampleModalLiveLabel" >
                    <div class="modal-dialog">


                        <div class="modal-content">

                            <div className="modalLog">
                                <div className="logBrief">
                                    <i class="fa fa-times" aria-hidden="true" onClick={handleClose}></i>
                                    <p>
                                        {account.heading}
                                    </p>
                                    <p>{account.subHeading}</p>
                                </div>
                                {account.view === "login" ? (
                                    <div className="Signin"  >

                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onInputLogin} value={Login.email} />
                                            <label for="floatingInput">Email address</label>
                                        </div>
                                        <div class="form-floating">
                                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onInputLogin} value={Login.password} />
                                            <label for="floatingPassword">Password</label>
                                        </div>
                                        <button id="Blogin" onClick={HandelLogin}>Continue</button>
                                        <p id="logopt">-------------------------- or -------------------------- </p>
                                        {/* Use onClick event to trigger Google sign-in */}
                                        <button className="google-button" >
                                            <span className="google-button__icon">
                                                <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg" ><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                                            </span>
                                            <span className="google-button__text" onClick={handleGoogleSignIn}>Sign in with Google</span>
                                        </button>
                                        <p className="changeform" onClick={toggleSignup} role="button" tabIndex="0">
                                            New Here? Create an account
                                        </p>
                                    </div>
                                ) : (
                                    <div className="Signup" >

                                        <div class="form-floating mb-3">
                                            <input type="name" class="form-control" id="floatingInput" placeholder="Name" name="name" onChange={onInputChange} value={Signup.name} />
                                            <label for="floatingInput">Name</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onInputChange} value={Signup.email} />
                                            <label for="floatingInput">Email address</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="Phone" class="form-control" id="floatingInput" placeholder="name@example.com" name="phone" onChange={onInputChange} value={Signup.phone} />
                                            <label for="floatingInput">Phone</label>
                                        </div>
                                        <div class="form-floating">
                                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onInputChange} value={Signup.password} />
                                            <label for="floatingPassword">Password</label>
                                        </div>
                                        <button onClick={HandelSubmit}>Continue</button>

                                        <p className="changeform" onClick={toggleLogin} role="button" tabIndex="0">
                                            Already a user? Login
                                        </p>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginDialog;
