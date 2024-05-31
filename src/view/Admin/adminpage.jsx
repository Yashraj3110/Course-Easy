import React, { useState, useEffect } from 'react';
import "./sb-admin-2.min.css"
import Dashboard from './Dashboard';
import Addcourse from './Addcourse';
import Editplaylist from './Editplaylist';
import Editcourse from './Editcourse';
import AddLecture from './Addlecture';
import Feedback from './feedback';
import Soldcourse from './SoldCourses';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminPage = () => {

    const [style, setstyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const [selectedOption, setSelectedOption] = useState('dashboard');
    const [sessionData, setSessionData] = useState('');
    const navigate = useNavigate();

    const changestyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toogled");
        } else {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    }
    const changestyleM = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toogled1");
        } else {
            setstyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    }
    const handelClickli = (e) => {
        setSelectedOption(e);
    };

    useEffect(() => {


    }, [])


    // const Authcheck = async (e) => {
    //     try {
    //         const response = await axios.get(`${apiUrl}/api/educator/authchecker`);
    //         const Verify = response.data.valid
    //         if (Verify == true) {
    //             const Sdata = response.data.Session;
    //             setSessionData(Sdata);
    //         } else {
    //             navigate('/HomePage')
    //         }

    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };
    const handleLogout = async () => {
        // Make an HTTP request to your backend API endpoint to log out
        const response = await axios.delete(`${apiUrl}/api/educator/logout`);
        console.log(response)
        if (response.status == 200) {
            navigate('/HomePage')
        }
    };
    return (
        <>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
            <>

                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <ul
                        className={style}
                        id="accordionSidebar"
                    >
                        {/* Sidebar - Brand */}

                        <Link to="/" className="logo">


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
                        {/* Divider */}
                        <hr className="sidebar-divider my-0" />
                        {/* Nav Item - Dashboard */}
                        <li className="nav-item active" href="#" onClick={(e) => handelClickli('dashboard')}>
                            <a className="nav-link" >
                                <i className="fas fa-fw fa-tachometer-alt" />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        {/* Divider */}
                        <hr className="sidebar-divider" />
                        {/* Heading */}

                        {/* Nav Item - Pages Collapse Menu */}

                        {/* <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                data-toggle="collapse"
                                data-target="#collapsePages"
                                aria-expanded="true"
                                aria-controls="collapsePages"
                            >
                                <i className="fas fa-fw fa-folder" />
                                <span>Course List</span>
                            </a>
                            <div
                                id="collapsePages"
                                className="collapse"
                                aria-labelledby="headingPages"
                                data-parent="#accordionSidebar"
                            >
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <a className="collapse-item" onClick={(e) => handelClickli('addcourse')} href="#">
                                        Create Playlist
                                    </a>
                                    <a className="collapse-item" onClick={(e) => handelClickli('editcourse1')} href="#">
                                        Edit Course
                                    </a>
                                    <a className="collapse-item" onClick={(e) => handelClickli('editcourse')} href="#">
                                        Edit Playlist
                                    </a>
                                </div>
                            </div>
                        </li> */}
                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                onClick={(e) => handelClickli('addcourse')}
                            >
                                <i className="fas fa-fw fa-folder" />
                                <span>Create Playlist</span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                onClick={(e) => handelClickli('editcourse1')}
                            >
                                <i className="fas fa-fw fa-folder" />
                                <span>Edit Course</span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                onClick={(e) => handelClickli('addlecture')}
                            >
                                <i className="fas fa-fw fa-folder" />
                                <span>Add Lecture</span>
                            </a>

                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link collapsed"
                                href="#"
                                onClick={(e) => handelClickli('editcourse')}
                            >
                                <i className="fas fa-fw fa-folder" />
                                <span>Edit Playlist</span>
                            </a>
                        </li>



                        {/* Divider */}
                        <hr className="sidebar-divider d-none d-md-block" />
                        {/* Sidebar Toggler (Sidebar) */}
                        <div className="text-center d-none d-md-inline" onClick={changestyle}>
                            <button className="rounded-circle border-0" id="sidebarToggle" />
                        </div>

                    </ul>
                    {/* End of Sidebar */}
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/* Sidebar Toggle (Topbar) */}
                                <button
                                    id="sidebarToggleTop"
                                    className="btn btn-link d-md-none rounded-circle mr-3"
                                    onClick={changestyleM}
                                >
                                    <i className="fa fa-bars" />
                                </button>
                                {/* Topbar Search */}
                               
                               
                            </nav>
                            {/* End of Topbar */}
                            {/* ################################################################################################# Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                {selectedOption === 'dashboard' && (
                                    // <iframe src="/User-Profile/details" title="User Form" width="100%" height="400px" frameBorder="0" />
                                    <Dashboard style={{ width: "100%", height: "400px" }} />
                                )}
                                {selectedOption === 'addcourse' && (
                                    // <iframe src="/User-Profile/details" title="User Form" width="100%" height="400px" frameBorder="0" />
                                    <Addcourse style={{ width: "100%", height: "400px" }} />
                                )}
                                {selectedOption === 'editcourse' && (
                                    // <iframe src="/User-Profile/details" title="User Form" width="100%" height="400px" frameBorder="0" />
                                    <Editplaylist style={{ width: "100%", height: "400px" }} />
                                )}
                                {selectedOption === 'editcourse1' && (
                                    // <iframe src="/User-Profile/details" title="User Form" width="100%" height="400px" frameBorder="0" />
                                    <Editcourse style={{ width: "100%", height: "400px" }} />
                                )}
                                {selectedOption === 'addlecture' && (
                                    // <iframe src="/User-Profile/details" title="User Form" width="100%" height="400px" frameBorder="0" />
                                    <AddLecture style={{ width: "100%", height: "400px" }} />
                                )}


                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2021</span>
                                </div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
                {/* Scroll to Top Button*/}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>


            </>



        </>
    );
};

export default AdminPage;