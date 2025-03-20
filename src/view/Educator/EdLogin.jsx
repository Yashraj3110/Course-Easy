import React, { useState } from "react";
import "../../css/Ed.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const accountinitialvalues = {
    login: {
        view: "login",
        heading: "Lecture Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations",
    },
    signup: {
        view: "signup",
        heading: "Lecture Sign Up",
        subHeading: "Looks like you're new here! Register now",
    },
};
const EducatorDetails = {
    name: "",
    email: "",
    phone: "",
    password: "",
};
const EducatorLogin = {
    email: "",
    password: "",
};
function LoginDialog2({ open, setDialogOpen }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [account, setAccount] = useState(accountinitialvalues.login);
    const [Signup, setSignup] = useState(EducatorDetails)
    const [Login, setlogin] = useState(EducatorLogin)
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


    const HandelSubmit = async (e) => {
        try {
            const response = await axios.post(`${apiUrl}/api/educator/register`, { credentials: Signup });
            if (response.status === 200) {
                console.log("Data saved successfully");
                setSignup(EducatorDetails);
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
            const response = await axios.post(`${apiUrl}/api/educator/login`, { credentials: Login });

            console.log(response);
            setDialogOpen(false);
            if (response.status === 200) {
                console.log("login successfully");
                localStorage.setItem('EducatorSession', JSON.stringify(response.data.educatorData));
                setlogin(EducatorLogin);

                navigate('/Admin')

            } else {
                console.log("Error in Log in");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div id="EducatorLogform">

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

                                        <button onClick={HandelLogin}>Continue</button>


                                        <div>
                                            <h4>Login Details :- </h4>
                                            <p> Email: 3110yashraj@gmail.com || password: 3110</p>
                                        </div>
                                        {/* <p className="changeform" onClick={toggleSignup} role="button" tabIndex="0">
                                            New Here? Create an account
                                        </p> */}
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

export default LoginDialog2;
