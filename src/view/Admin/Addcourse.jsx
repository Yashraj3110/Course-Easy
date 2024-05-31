import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Coursearray = {
    title: "",
    desc: "",
    field: "",
    level: "",
    price: "",
};
const Addcourse = () => {
    const [coursedata, setcoursedata] = useState(Coursearray);
    const [SessionData, setSessionData] = useState(null);
    const [Thumbnail, setThumbnail] = useState('no file chosen');

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const EducatorSessionData = localStorage.getItem('EducatorSession');
        const EduData = JSON.parse(EducatorSessionData);
   
        setSessionData(EduData);
      }, [])
    

    const HandelInputchange = (e) => {
        setcoursedata({ ...coursedata, [e.target.name]: e.target.value })
    };
    const HandelSubmit = async (e) => {
        e.preventDefault();
        const Data = {
            ...coursedata, Thumbnail
        }
        const payload = {
            ...Data,
            sessionData: SessionData
        };
        const response = await axios.post(`${apiUrl}/api/educator/course/create`, payload);
        toast.success('Course Created', {
            position: "top-center",
            autoClose: 1250,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
          });
        console.log(payload)
        setcoursedata(Coursearray)
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
    return (
        <div>
            <h3>Add Playlist</h3>


            <div class="row row-cols-1 row-cols-md-3 g-4 mt-3" style={{ width: "112rem" }}>
                <form onSubmit={HandelSubmit}>
                    <div class="mb-3">
                        <label for="name" class="form-label">Course Title</label>
                        <input type="name" class="form-control" id="title" onChange={HandelInputchange} name='title' value={coursedata.title} />
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Course Description</label>
                        <input type="text" class="form-control" id="description" onChange={HandelInputchange} name='desc' value={coursedata.desc} />
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Course field</label>
                        <select class="form-select" aria-label="Default select example" onChange={HandelInputchange} name='field' value={coursedata.field}>
                            <option disabled value="">Select category</option>
                            <option value="Web-development">Web development</option>
                            <option value="Data-Science">Data Science</option>
                            <option value="Data-Analyst">Data Analyst</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Course level</label>
                        <select class="form-select" aria-label="Default select example" onChange={HandelInputchange} name='level' value={coursedata.level}>
                            <option disabled value="">Select difficulty</option>
                            <option value="Beginer">Beginer</option>
                            <option value="Intermideate">Intermideate</option>
                            <option value="Advance">Advance</option>
                        </select>

                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Course Price</label>
                        <input type="number" class="form-control" id="price" onChange={HandelInputchange} name='price' value={coursedata.price} />
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
            <ToastContainer/>
        </div>
    );
};

export default Addcourse;