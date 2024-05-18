import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../Nav';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from "react-spinners";


const CoursePage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sesData = JSON.parse(decodeURIComponent(searchParams.get('sesData')));

    // axios.defaults.withCredentials = true;
    const { topic } = useParams();
    const [loading, setLoading] = useState(true); // Track loading state
    const [Courses, setCourses] = useState([]);
    const [sessionData, setSessionData] = useState(sesData);
    const [filteredCourses, setFilteredCourses] = useState([]); // State to store filtered courses

    // Function to filter courses based on level
    const filterCoursesByLevel = (level) => {
        const filtered = Courses.filter(course => course.Course_level === level);
        setFilteredCourses(filtered); // Display courses with the selected level
    };

    const filterCoursesByPriceLowToHigh = () => {
        const sortedByPrice = [...filteredCourses].sort((a, b) => a.Course_price - b.Course_price);
        setFilteredCourses(sortedByPrice);
        console.log(sortedByPrice)
    };
    const filterCoursesByPriceHighToLow = () => {
        const sortedByPrice = [...filteredCourses].sort((a, b) => b.Course_price - a.Course_price);
        setFilteredCourses(sortedByPrice);
        console.log(sortedByPrice)
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {

        fetchCourses();

    }, []);

    // Check session status on component mount

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/courses/data/${topic}`);
            const coursedata = response.data;
            setCourses(coursedata); // Update courses state with fetched data
            setFilteredCourses(coursedata)
            setLoading(false)

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const truncateDescription = (description, maxWords) => {
        const words = description.split(' ');
        return words.slice(0, maxWords).join(' ') + (words.length > maxWords ? ' ...' : '');
    };


    return (<>


        <ResponsiveAppBar sesData={sessionData} />
        <div></div>
        <div style={{ marginTop: "30px", paddingLeft: "20px" }}>
            <h4>{topic}</h4>
        </div>


        <section id='filter'>

            <div class="container-fluid" >
                <div className="row">
                    <h5>Filter :-</h5>
                    <div className="col-md-12">
                        <div className='filteropt'>
                            <div class="dropdown open">
                                <a class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > Course level </a>
                                <div class="dropdown-menu" aria-labelledby="triggerId">
                                    <a class="dropdown-item" href="#" onClick={() => setFilteredCourses(Courses)}>All</a>
                                    <a class="dropdown-item" href="#" onClick={() => filterCoursesByLevel('Beginer')}>Beginner</a>
                                    <a class="dropdown-item" href="#" onClick={() => filterCoursesByLevel('Intermediate')}>Intermediate</a>
                                    <a class="dropdown-item" href="#" onClick={() => filterCoursesByLevel('Advanced')}>Advanced</a>
                                </div>
                            </div>
                            <div class="dropdown open">
                                <a class="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Sort </a>
                                <div class="dropdown-menu" aria-labelledby="triggerId">
                                    <a class="dropdown-item" href="#" onClick={filterCoursesByPriceLowToHigh}>Low to high</a>
                                    <a class="dropdown-item" href="#" onClick={filterCoursesByPriceHighToLow}>high to Low</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>
        <section id="coursesPage"   >

            <div class="container-fluid">
                <div className="container">
                    <div className="row" style={{ width: "81vw !important" }}>
                        <div className="col-md-12">
                            {loading ? (
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "18%" }}>
                                    <ClipLoader color="black" loading={loading} size={50} cssOverride={{ borderColor: "white black" }} />
                                </div>
                            ) : (
                                <>
                                    {filteredCourses.length === 0 ? (
                                        <p style={{ display: "flex", justifyContent: "center" }}>No courses found for this topic.</p>
                                    ) : (
                                        filteredCourses.map(course => (
                                            <Link key={course.CourseID} to={`/course/${course.CourseID}?sesData=${encodeURIComponent(JSON.stringify(sesData))}`}>
                                                <figure className="card">
                                                    <img className="card-img-top" src={course.CourseImage} alt="Course Thumbnail" />
                                                    <figcaption className="card-body">
                                                        <h5 className="card-title" style={{ fontWeight: "700" }}>{course.Course_title}</h5>
                                                        <p className="card-text">{truncateDescription(course.Course_desc, 24)} read more</p>
                                                        <div style={{ display: "flex", gap: "29rem" }}>
                                                            <p style={{
                                                                width: "150px",
                                                                fontSize: "17px",
                                                                color: "rgb(167 0 0)",
                                                            }}>level : {course.Course_level}</p>
                                                            <p style={{
                                                                width: "150px",
                                                                fontSize: "17px",
                                                                color: "#0000c2",
                                                            }}>price : {course.Course_price} Rs </p>
                                                        </div>
                                                    </figcaption>
                                                </figure>
                                            </Link>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    </div>



                </div>
            </div>


        </section >
    </>

    );
};

export default CoursePage;