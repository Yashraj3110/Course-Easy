import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Saved = () => {


    const [lectures, setlectures] = useState([]);
    const [sessionData, setSessionData] = useState();
    const [Courses, setCourses] = useState();
    
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        getCourseName();
       
        

    }, []);
    const handleSession = async () => {
        const userSessionData = localStorage.getItem('UserSession');
        const userData = JSON.parse(userSessionData);
        setSessionData(userData);
        
        fetchsavedLecture(userData);

    };
    // Check session status on component mount

    const fetchsavedLecture = async (userData) => {

        try {

            const response = await axios.get(`${apiUrl}/api/saved/lectures`, {
                params: {
                    userID: userData
                }
            });
            const coursedata = response.data;
        
            setlectures(coursedata); // Update courses state with fetched data


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const getYouTubeThumbnail = (url) => {
        const videoId = getVId(url);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return '';
    };
    const getCourseName = async(id) => {
        
         const response = await axios.get(`${apiUrl}/api/course/details`, {
                params: {
                    ID: id
                }
            });
            const coursedata = response.data;
            setCourses(coursedata)
            handleSession();
            
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

    const getCourseNameById = (courseId) => {
        const course = Courses.find(c => c.CourseID === courseId);
        return course ? course.Course_title : 'Unknown Course';

    };
    return (
        <div >
            <h3>Saved Videos</h3>


           
                {lectures.map((course) => (
                    <div key={course.courseId} className="course">
                        <div className="row">
                        <h3>Course name: {getCourseNameById(course.courseId)}</h3>
                            {course.savedVideos.map((video) => (
                                <div class="col">
                                    <div class="card" style={{
                                        width: "17rem"
                                    }} key={video._id}>
                                        <img src={getYouTubeThumbnail(video.Lecture_url)} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title" style={{fontSize: "17px"}}>{video.Lecture_title}</h5>
                                            <a href={video.Lecture_url} className="card-text" target="_blank" rel="noopener noreferrer">
                                                Watch Video
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}

           
        </div>
    );
};

export default Saved;