import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lecturearray = {
    title: "",
    desc: "",
    lurl: "",
};
const Coursearray = {
    educatorID: "",
    Course_title: "",
    Course_ID: ""
};
const AddLecture = () => {
    const [LectureData, setLectureData] = useState(Lecturearray);
    const [Courses, setCourses] = useState([])
    const [SessionData, setSessionData] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(Coursearray);
    const [Thumbnail, setThumbnail] = useState('no file chosen');


    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        courselist();
    }, [])
    const HandelSubmit = async (e) => {
        e.preventDefault();
        if (isYouTubeUrl(LectureData.lurl)) {
            // Proceed with form submission
            console.log("Valid YouTube URL");
            // Add logic to save the lecture data to the database
        } else {
            // Display an error message to the user or prevent form submission
            console.log("Invalid YouTube URL");
            return;
            // Add logic to display an error message to the user or prevent form submission
        }
        const response = await axios.post(`${apiUrl}/api/educator/lecture/create`, LectureFormData );
        console.log(response);
        setThumbnail('no file chosen');
        setSelectedCourse(Coursearray);
        setLectureData(Lecturearray);
        toast.success('lecture Added', {
            position: "top-center",
            autoClose: 1250,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });

    };

    const HandelInputchange = (e) => {
        setLectureData({ ...LectureData, [e.target.name]: e.target.value, selectedCourse, Thumbnail })
    };
    const LectureFormData = {
        ...LectureData, selectedCourse, Thumbnail
    }

    const handleChange = (event) => {
        const selectedTitle = event.target.value;
        const selectedCourseData = Courses.find(course => course.Course_title === selectedTitle);

        setSelectedCourse({
            educatorID: selectedCourseData.EducatorID,
            courseID: selectedCourseData.CourseID,
            coursetitle: selectedTitle
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Convert the image to a Base64 string
            const base64String = reader.result;
            setThumbnail(base64String);
        };

        reader.readAsDataURL(file);
    };
    async function courselist() {
        const EducatorSessionData = localStorage.getItem('EducatorSession');
        const EduData = JSON.parse(EducatorSessionData);

        setSessionData(EduData);
        const response = await axios.get(`${apiUrl}/api/educator/course/data`, {
            params: {
                educatorID: EduData.educatorID
            }
        });
        setCourses(response.data)
    }
    function isYouTubeUrl(url) {
        // Regular expression pattern to match YouTube video URLs
        const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

        // Test the URL against the regular expression
        return youtubeRegex.test(url);
    }

    return (
        <div>
            <h3>Add Lecture</h3>


            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3" style={{ width: "112rem" }}>
                <form onSubmit={HandelSubmit}>
                    <div class="mb-3">
                        <label for="price" class="form-label">Select Course</label>
                        <select class="form-select" aria-label="Default select example"
                            onChange={handleChange}
                            name='course'
                            value={selectedCourse.Course_title}
                        >
                            <option selected disabled value="">Select Course</option>
                            {Courses.map(course => (
                                <option key={course.CourseID} value={course.Course_title}>
                                    {course.Course_title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="name" class="form-label">Lecture Title</label>
                        <input type="name" class="form-control" id="name" aria-describedby="emailHelp" onChange={HandelInputchange} name='title' value={LectureData.title} />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Lecture Description</label>
                        <input type="text" class="form-control" id="description" aria-describedby="description" onChange={HandelInputchange} name='desc' value={LectureData.desc} />
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Lecture Url</label>
                        <input type="text" class="form-control" id="description" aria-describedby="description" onChange={HandelInputchange} name='lurl' value={LectureData.lurl} />
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Lecture Thumbnail</label>
                        <input type="file" class="form-control" id="image" onChange={handleImageChange} accept="image/*" />
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check all details are correct</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddLecture;