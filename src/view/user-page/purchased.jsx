import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Purchased = () => {

    const [Courses, setCourses] = useState([]);
    const [sessionData, setSessionData] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const appUrl = process.env.REACT_APP_APP_URL;
    
    useEffect(() => {
        handleSession();

    }, []);
    const handleSession = async () => {
        const userSessionData = localStorage.getItem('UserSession');
        const userData = JSON.parse(userSessionData);
        console.log(userData);

        setSessionData(userData);
        fetchCourses(userData);

    };
    // Check session status on component mount

    const fetchCourses = async (userData) => {

        try {

            const response = await axios.get(`${apiUrl}/api/purchased/courses/data`, {
                params: {
                    userID: userData
                }
            });
            const coursedata = response.data;
            setCourses(coursedata); // Update courses state with fetched data


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    const HandleCourseClick = async (e) => {
        window.location.href = `${appUrl}/course/${e}`;
    };

    return (
        <div>
            <h3>Purchased Courses</h3>


            <div class="row row-cols-1 row-cols-md-3 g-4">
                {Courses.map((course) => (

                    <div class="col" key={course._id}>
                        <div class="card">
                            <img src={course.CourseImage} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{course.Course_title}</h5>
                                <p class="card-text">{truncateText(course.Course_desc, 170)}</p>
                                <button className='enroll' onClick={(e) => HandleCourseClick(course.CourseID)} >
                                    View course
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Purchased;