import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { useState } from "react";
import LoginDialog from './login';
import axios from "axios";

const ResponsiveAppBar = ({ sesData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [Nav, setNav] = useState('collapse navbar-collapse')
  const [sessionData, setSessionData] = useState(sesData);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [courseResults, setCourseResults] = useState([]);
  const [lectureResults, setLectureResults] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const appUrl = process.env.REACT_APP_APP_URL;

  useEffect(() => {
    const userSessionData = localStorage.getItem('UserSession');
    const userData = JSON.parse(userSessionData);
    setSessionData(userData);
  }, [])

  const handleSearch = async (event) => {
    const { value } = event.target;
    setQuery(value);
    try {
      const response = await axios.get(`${apiUrl}/api/search?q=${value}`);
      console.log(response.data)
      setCourseResults(response.data.courses);
      setLectureResults(response.data.lectures);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getVId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return '';
  };

  const getVId = (url) => {
    const videoUrl = new URL(url);
    if (videoUrl.hostname === "youtu.be") {
      return videoUrl.pathname.slice(1);
    } else if (
      (videoUrl.hostname === "www.youtube.com" ||
        videoUrl.hostname === "youtube.com") &&
      videoUrl.searchParams.has("v")
    ) {
      return videoUrl.searchParams.get("v");
    } else {
      return null;
    }
  };

  const HandleCourseClick = async (e) => {
    window.location.href = `${appUrl}/course/${e}`;
  };

  const handleNav = () => {
    if (Nav == 'collapse navbar-collapse') {
      setNav('collapse navbar-collapse show')
    } else {
      setNav('collapse navbar-collapse')
    }
  };
  const handleLoginButtonClick = () => {
    setDialogOpen(true); // Open the login dialog
  };
  const handleLogout = async () => {
    localStorage.removeItem('UserSession');
    window.location.reload()

  };


  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <div className="container-fluid" id="navp">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid" >
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

            <button
              className="navbar-toggler"
              type="button"

              onClick={handleNav}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className={Nav} id="navbarTogglerDemo02">
              <form className="d-flex  me-auto" role="search">
                <div className="form">
                  <img
                    className="fa-search"
                    src="data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20class%3D%22%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ESearch%20Icon%3C%2Ftitle%3E%3Cpath%20d%3D%22M10.5%2018C14.6421%2018%2018%2014.6421%2018%2010.5C18%206.35786%2014.6421%203%2010.5%203C6.35786%203%203%206.35786%203%2010.5C3%2014.6421%206.35786%2018%2010.5%2018Z%22%20stroke%3D%22%23717478%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M16%2016L21%2021%22%20stroke%3D%22%23717478%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
                    alt="Plus Brand"
                  />
                  <input
                    type="text"
                    class="form-control form-input"
                    placeholder="Search for Products,Brands and More"
                    value={query}
                    onChange={handleSearch}
                  />
                </div>
              </form>

              {(courseResults.length >= 1 || lectureResults.length >= 1) && query.length >= 1 && (
                <div className="search_result">
                  {courseResults.length >= 1 && (
                    <div>
                      <h4>Courses</h4>
                      {courseResults.map(course => (
                        <div key={course.CourseID} className="cList" onClick={(e) => HandleCourseClick(course.CourseID)}><img src={course.CourseImage} alt="" /> <p>{course.Course_title}</p></div>
                      ))}
                    </div>
                  )}

                </div>
              )}



              <div id="Sidenavbar">
                {sessionData === null || sessionData === undefined ? (
                  <>
                    <ul className="navbar-nav navhome">
                      <li className="nav-item">
                        <Link to="/Educator" className="nav-link">
                          <p>
                            <i class="bi bi-person-video"></i>
                            Upcoming Updates
                          </p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" onClick={handleLoginButtonClick}>
                          <p>
                            <i class="bi bi-person-circle"></i>
                            {/* <span className="navt">Sign in</span> */}
                            Sign in
                          </p>
                        </Link>
                        <LoginDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
                      </li>


                    </ul>
                  </>
                ) : (
                  <><ul className="navbar-nav navhome">

                    <li className="nav-item">
                      <Link to="/Educator" className="nav-link">
                        <p>
                          <i class="bi bi-person-video"></i>
                          Upcoming Updates
                        </p>
                      </Link>
                    </li>


                    <li className="nav-item">
                      <Link to="/User-profile" className="nav-link">
                        <p>
                          My Profile
                          <img src={sessionData.profileImage} style={{
                            height: "35px",
                            width: "38px",
                            borderRadius: "27px"
                          }} alt="" />

                        </p>
                      </Link>
                    </li>

                    <li className="nav-item">

                      <a
                        href="#"
                        onClick={handleLogout}
                      >
                        <p>

                          Log out

                          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        </p>
                      </a>

                    </li>

                  </ul></>

                )};

              </div>
            </div >
          </div >
        </nav >
      </div >
      <div className="container1"></div>
    </div >
  );
};

export default ResponsiveAppBar;
