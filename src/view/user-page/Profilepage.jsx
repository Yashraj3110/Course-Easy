import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../media/logouser.jpg"
import UserForm from './User-Form';
import UserDetails from './UserDetails';
import Purchased from './purchased';
import Saved from './saved';


const UserPage = () => {
    const [selectedOption, setSelectedOption] = useState('details');
    const [isOpen, setIsOpen] = useState();
    const [sessionData, setsessionData] = useState('')
    const [selectedPage, setSelectedPage] = useState("UserDetails");

    const handleClick = (page) => {
        setSelectedPage(page);
    };


    useEffect(() => {
        const userSessionData = localStorage.getItem('UserSession');
        const userData = JSON.parse(userSessionData);
        setsessionData(userData);

        const handleResize = () => {
            if (window.innerWidth <= 760) {
                setIsOpen("open");
            } else {
                setIsOpen("");
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const toggleNavbar = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <>
            <section id='Profilepage'>
                <div className='UserTopbar'>
                    <div>
                        <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
                        ></link>
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                        ></link>

                        <div className="container-fluid" id="unavp">
                            <Link to="/" className="logo" style={{ position: "absolute", top: "3px", left: "0" }}>


                                <p className="_2FZvZO">

                                    <span className="_1NZ9Rr">Course</span>
                                    <span className="G90_N3">Easy</span>
                                    <img
                                        className="_2IlWoL"
                                        width="10"
                                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus-brand-bc165b.svg"
                                        height="10"
                                        alt="Plus Brand"
                                    />
                                </p>
                            </Link>
                        </div>
                    </div>

                </div>
                <div id='user-page'>

                    <div className="sidebar">
                        <h5 style={{
                            color: "wheat",
                            padding: "7px",
                        }}>Welcome</h5>
                        <h5 style={{
                            color: "white",
                            padding: "0 7px",
                            marginBottom: "31px",
                        }}>{sessionData.name}</h5>
                        <p> </p>
                        <nav>
                            <button className="toggle-btn" onClick={toggleNavbar}>
                                toggle
                            </button>
                            <ul className={`navlist ${isOpen ? 'open' : ''}`}>

                                <li
                                    className={`${selectedPage === 'UserDetails' ? 'selected' : ''} ${isOpen ? 'open' : ''}`}
                                    onClick={() => handleClick('UserDetails')}>Profile Details
                                </li>
                                <li
                                    className={`${selectedPage === 'UserForm' ? 'selected' : ''} ${isOpen ? 'open' : ''}`}
                                    onClick={() => handleClick('UserForm')}>Profile Edit
                                </li>
                                <li
                                    className={`${selectedPage === 'Purchased' ? 'selected' : ''} ${isOpen ? 'open' : ''}`}
                                    onClick={() => handleClick('Purchased')}>Puchased Courses
                                </li>
                                <li
                                    className={`${selectedPage === 'Saved' ? 'selected' : ''} ${isOpen ? 'open' : ''}`}
                                    onClick={() => handleClick('Saved')}>Saved Videos
                                </li>

                            </ul>
                        </nav>
                    </div>

                    <div className="content">
                        {selectedPage === 'UserDetails' && <UserDetails userData={sessionData} />}
                        {selectedPage === 'UserForm' && <UserForm userData={sessionData} />}
                        {selectedPage === 'Purchased' && <Purchased userData={sessionData} />}
                        {selectedPage === 'Saved' && <Saved userData={sessionData} />}
                    </div>


                </div>

            </section >

        </>
    );
};

export default UserPage;