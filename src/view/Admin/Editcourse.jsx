import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Editcourse() {
    const [courses, setCourses] = useState([]);
    const [Selectedcourse, setSelectedcourse] = useState([])
    const [EditModal, setEditModal] = useState(false);
    const [DeleteModal, setDeleteModal] = useState(false);
    const [Thumbnail, setThumbnail] = useState(null);
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
            console.log(EduData)
            const response = await axios.get(`${apiUrl}/api/educator/course/data`, {
                params: {
                    educatorID: EduData.educatorID
                }
            });
            setCourses(response.data);
            console.log(response.data)

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };



    const handelEdit = (courses) => {
        setSelectedcourse(courses)
        setEditModal(true)
    }
    const handelDelete = (courses) => {
        setSelectedcourse(courses)
        setDeleteModal(true)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// MODALS
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
    function EditLecture() {

        const [NewCourse, setNewCourse] = useState({ ...Selectedcourse })
        const HandelInputchange = (e) => {
            setNewCourse({ ...NewCourse, [e.target.name]: e.target.value })
        }
        const HandelSubmit = async (e) => {
            e.preventDefault();
            const Data = { ...NewCourse, Thumbnail, SessionData }
        
            try {
                const response = await axios.post(`${apiUrl}/api/educator/course/update`, Data);
                if (response) {
                    fetchCourses();
                    setEditModal(false);
                    setThumbnail(null)

                }

            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }


        return (<>
            <div id="modal1" className="animate__animated animate__pulse animate__faster" style={{
                position: 'fixed',
                top: '2%',
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
                        <h2 className='alert' style={{ position: 'fixed', left: '3rem', top: '22px', fontSize: '1.1rem' }}>Preview : <b>{NewCourse.Course_title}</b></h2>
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
                                <label for="name" class="form-label">Course Title</label>
                                <input type="name" class="form-control" id="title" onChange={HandelInputchange} name='Course_title' value={NewCourse.Course_title} />
                            </div>

                            <div class="mb-3">
                                <label for="description" class="form-label">Course Description</label>
                                <input type="text" class="form-control" id="description" onChange={HandelInputchange} name='Course_desc' value={NewCourse.Course_desc} />
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Course field</label>
                                <select class="form-select" aria-label="Default select example" onChange={HandelInputchange} name='Course_field' value={NewCourse.Course_field}>
                                    <option selected disabled value="">{NewCourse.Course_field}</option>

                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Course level</label>
                                <select class="form-select" aria-label="Default select example" onChange={HandelInputchange} name='Course_level' value={NewCourse.Course_level}>
                                    <option disabled value="">Select difficulty</option>
                                    <option value="Beginer">Beginer</option>
                                    <option value="Intermideate">Intermideate</option>
                                    <option value="Advance">Advance</option>
                                </select>

                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Course Price</label>
                                <input type="number" class="form-control" id="price" onChange={HandelInputchange} name='Course_price' value={NewCourse.Course_price} />
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Lecture Thumbnail</label>
                                <input type="file" class="form-control" id="image" onChange={handleImageChange} accept="image/*" />
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check all details are correct</label>
                            </div>
                            <button class="btn btn-primary" >Create</button>
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
                const CourseID = Selectedcourse.CourseID;
                const response = await axios.post(`${apiUrl}/api/educator/course/Delete/${CourseID}`);
                if (response) {
                    console.log(response.data);
                    fetchCourses();
                    setDeleteModal(false);

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
                                    }}>Are you sure to delete :
                                        <b>
                                            {Selectedcourse.Course_title}
                                        </b>
                                        <b> <br />
                                            <b>{Selectedcourse.Course_level}</b>
                                        </b>
                                    </label>
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
                                        <span className="Polaris-Button__Text" onClick={HandelDelete} >Yes</span>
                                    </span>
                                </button>
                            </div>
                            <div className="Polaris-ButtonGroup__Item">
                                <button className="Polaris-Button" type="button"  >
                                    <span className="Polaris-Button__Content">
                                        <span className="Polaris-Button__Text" >No</span>
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

                <div className="container mt-5">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Field</th>
                                    <th scope="col">Desc</th>
                                    <th scope="col">Level</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((courses, index) => (
                                    <tr key={courses._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td><img src={courses.CourseImage} alt="Course Thumbnail" style={{ width: "13rem" }} /></td>
                                        <td>{courses.Course_title}</td>
                                        <td>{courses.Course_field}</td>
                                        <td>{courses.Course_desc}</td>
                                        <td>{courses.Course_level}</td>
                                        <td>
                                            <span onClick={() => handelEdit(courses)}>
                                                Edit
                                            </span>
                                            <span onClick={() => handelDelete(courses)}>
                                                Delete
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
        </>

    );
}

export default Editcourse;
