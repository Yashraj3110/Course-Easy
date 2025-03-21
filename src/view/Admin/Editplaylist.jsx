import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function YourComponent() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [lectureData, setLectureData] = useState([]);
    const [lectureEdit, setlectureEdit] = useState('')
    const [EditModal, setEditModal] = useState(false);
    const [DeleteModal, setDeleteModal] = useState(false);
    const [SessionData, setSessionData] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchCourses();

    }, []);

    const fetchCourses = async () => {
        try {
            const EducatorSessionData = localStorage.getItem('EducatorSession');
            const EduData = JSON.parse(EducatorSessionData);

            setSessionData(EduData);
            const response = await axios.get(`${apiUrl}/api/educator/course/data`, {
                params: {
                    educatorID: EduData.educatorID
                }
            });
            setCourses(response.data);


        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleCourseSelect = async (event) => {
        const courseValue = event.target.value; // Store the selected course value in a variable
        setSelectedCourse(courseValue); // Update the selected course state
        console.log(courseValue); // Log the selected course value
        try {
            const response = await axios.get(`${apiUrl}/api/lectures/course/${courseValue}`);
            console.log(response.data);
            setLectureData(response.data);
        } catch (error) {
            console.error('Error fetching lecture data:', error);
        }
    };
    const handleCourseSelect1 = async (selectedCourseValue) => {
        try {
            const response = await axios.get(`${apiUrl}/api/lectures/course/${selectedCourseValue}`);
            console.log(response.data);
            setLectureData(response.data);
        } catch (error) {
            console.error('Error fetching lecture data:', error);
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

    const handelEdit = (lecture) => {
        setlectureEdit(lecture)
        setEditModal(true)
    }
    const handelDelete = (lecture) => {
        setlectureEdit(lecture)
        setDeleteModal(true)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// MODALS
    function EditLecture() {
        const [Newlecture, setNewlecture] = useState({ ...lectureEdit })
        const HandelInputchange = (e) => {
            setNewlecture({ ...Newlecture, [e.target.name]: e.target.value })
        }
        const HandelSubmit = async (e) => {
            e.preventDefault();

            try {
                if (isYouTubeUrl(Newlecture.Lecture_url)) {
                    // Proceed with form submission
                    console.log("Valid YouTube URL");
                    // Add logic to save the lecture data to the database
                } else {
                    // Display an error message to the user or prevent form submission
                    console.log("Invalid YouTube URL");
                    return;
                    // Add logic to display an error message to the user or prevent form submission
                }
                const response = await axios.post(`${apiUrl}/api/educator/lecture/update`, Newlecture);
                if (response) {
                    console.log(response.data);
                    handleCourseSelect1(Newlecture.CourseID);
                    setEditModal(false);
                    toast.success('Lecture Updated', {
                        position: "top-center",
                        autoClose: 1250,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });

                }

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        function isYouTubeUrl(url) {
            // Regular expression pattern to match YouTube video URLs
            const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

            // Test the URL against the regular expression
            return youtubeRegex.test(url);
        }

        return (<>
            <div id="modal1" className="animate__animated animate__pulse animate__faster" style={{
                position: 'fixed',
                top: '12%',
                left: '39%',
                backgroundColor: 'rgb(255, 255, 255)',
                width: '33rem',  // Adjust as needed
                maxWidth: 'auto',
                height: 'auto',
                maxHeight: 'auto',
                zIndex: '9999',
                borderRadius: '1rem',
                transition: 'opacity 0.3s ease-in-out',
                transform: EditModal ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
                display: EditModal ? 'block' : 'none',

            }}>
                <div className="addcontainer" style={{
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    background: '#fffff',
                    paddingBottom: '10px',
                    borderRadius: '10px'
                }}>
                    <div className="modal-header">
                        <hr style={{ "position": "relative", "top": "2.5rem", "width": "100%", }} />
                        <div className="img" style={{ position: 'fixed', left: '22px', top: '2vh', width: '20px' }}> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg></div>
                        <h2 className='alert' style={{ position: 'fixed', left: '3rem', top: '22px', fontSize: '1.1rem' }}>Preview : <b>{lectureEdit.Lecture_title}</b></h2>
                        <span className="dismiss-icon" style={{ right: '10px', position: 'absolute', cursor: 'pointer', top: '11px' }} onClick={() => setEditModal(false)} >✖</span>
                    </div>
                    <div className="modal-content2" style={{
                        padding: '10px 17px 15px 15px', marginTop: '47px',
                        height: "auto",
                        width: "auto",
                        maxHeight: "auto",
                        maxWidth: "auto",

                    }}>
                        {/* Modal content goes here */}

                        <form onSubmit={HandelSubmit}>
                            <div class="mb-3">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="course"
                                    value={lectureEdit.Course_title}
                                // Prevent the select menu from opening
                                >
                                    <option selected disabled>{lectureEdit.Course_title}</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="name" class="form-label">Lecture Title</label>
                                <input type="name" class="form-control" id="name" aria-describedby="emailHelp" onChange={HandelInputchange} name='Lecture_title' value={Newlecture.Lecture_title} />
                            </div>

                            <div class="mb-3">
                                <label for="description" class="form-label">Lecture Description</label>
                                <input type="text" class="form-control" id="description" aria-describedby="description" onChange={HandelInputchange} name='Lecture_desc' value={Newlecture.Lecture_desc} />
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Lecture Url</label>
                                <input type="text" class="form-control" id="description" aria-describedby="description" onChange={HandelInputchange} name='Lecture_url' value={Newlecture.Lecture_url} />
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check all details are correct</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </form>

                    </div>

                </div>
            </div >
            <div id="overlay" style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '9998',
                transition: 'opacity 0.3s ease-in-out',
                display: EditModal ? 'block' : 'none',
            }} />

        </>)


    }

    function DeleteLecture() {

        const HandelDelete = async (e) => {
            e.preventDefault();

            try {
                const lectureID = lectureEdit.LectureID;
                const response = await axios.post(`${apiUrl}/api/educator/lecture/Delete/${lectureID}`);
                if (response) {
                    console.log(response.data);
                    handleCourseSelect1(selectedCourse);
                    setDeleteModal(false);
                    toast.warn('Lecture Deleted', {
                        position: "top-center",
                        autoClose: 1250,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "dark",
                    });
                }

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }



        return (<>
            <div id="modal1" className="modal1" style={{
                position: 'fixed',
                top: '52%',
                left: '57%',
                backgroundColor: 'rgb(255, 255, 255)',
                width: '24rem',
                height: 'auto',
                zIndex: '9999',
                borderRadius: '1rem',
                transition: 'opacity 0.3s ease-in-out',
                transform: DeleteModal ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
                display: DeleteModal ? 'block' : 'none',

            }}>
                <div className="addcontainer">
                    <div className="modal-header">
                        <hr style={{ "position": "relative", "top": "3rem" }} />
                        <div className="img" style={{ position: 'fixed', left: '22px' }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                        </svg></div>
                        <h2 className='alert' style={{ position: 'fixed', left: '3rem', top: '6.5%', fontSize: '1.1rem' }}>Alert</h2>
                        <span className="dismiss-icon" style={{ left: '22rem', position: 'absolute', cursor: 'pointer' }} onClick={() => setDeleteModal(false)}>✖</span>
                    </div>
                    <div className="modal-content2" style={{ padding: '51px' }}>
                        {/* Modal content goes here */}
                        <div style={{
                            "position": "relative",
                            "bottom": "-7px",
                            "right": "30px",
                        }}>
                            <div className="Polaris-Labelled__LabelWrapper">
                                <div className="Polaris-Label">
                                    <label id=":R1n6:Label" htmlFor=":R1n6:" className="Polaris-Label__Text2" style={{
                                        "fontSize": "16px"
                                    }}>Are you sure to delete : <b>{lectureEdit.Lecture_title}</b></label>
                                </div>
                            </div>

                        </div>
                        <br />

                    </div>
                    <div className="modal-footer">
                        <hr style={{ "position": "relative", "top": "-3rem" }} /> {/* Horizontal line for the footer */}
                        <div className="Polaris-ButtonGroup2" style={{
                            '--pc-button-group-item': 10,
                            '--pc-button-group-focused': 20,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            marginTop: 'calc(var(--p-space-6) * -2)',
                            marginLeft: 'calc(var(--p-space-2) * -1)',
                            flexDirection: 'row-reverse',
                            marginRight: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <div className="Polaris-ButtonGroup__Item">
                                <button className="Polaris-Button Polaris-Button--primary" type="submit"   >
                                    <span className="Polaris-Button__Content">
                                        <span className="Polaris-Button__Text" onClick={HandelDelete}>Yes</span>
                                    </span>
                                </button>
                            </div>
                            <div className="Polaris-ButtonGroup__Item">
                                <button className="Polaris-Button" type="button"  >
                                    <span className="Polaris-Button__Content">
                                        <span className="Polaris-Button__Text" onClick={() => setDeleteModal(false)}>No</span>
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div id="overlay" style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: '9998',
                transition: 'opacity 0.3s ease-in-out',
                display: DeleteModal ? 'block' : 'none',
            }} />

        </>)


    }

    return (
        <>
            <div>
                <select onChange={handleCourseSelect} value={selectedCourse}>
                    <option disabled value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course._id} value={course.CourseID}>{course.Course_title}</option>
                    ))}
                </select>
                <div className="container mt-5">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lectureData.map((lecture, index) => (
                                    <tr key={lecture._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td><img src={getYouTubeThumbnail(lecture.Lecture_url)} alt="Lecture Thumbnail" style={{ width: "13rem" }} /></td>
                                        <td>{lecture.Lecture_title}</td>
                                        <td>{lecture.Lecture_desc}</td>
                                        <td>
                                            <span onClick={() => handelEdit(lecture)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" fill="blue" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </span>
                                            <span onClick={() => handelDelete(lecture)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19
                                                " height="22" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditLecture />
            <DeleteLecture />
            <ToastContainer />
        </>

    );
}

export default YourComponent;
