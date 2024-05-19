import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../Nav';
import { SyncLoader } from "react-spinners";
import user from "../../media/demo user.png";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import LoginDialog from '../login';

const Coursein = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sesData = JSON.parse(decodeURIComponent(searchParams.get('sesData')));

    const apiUrl = process.env.REACT_APP_API_URL;
    const Key = process.env.REACT_APP_RAZOR_API_KEY;

    const CoursID = useParams();
    const Id = CoursID.CourseID;
    const [Lectures, setLectures] = useState([]);
    const [Course, setCourse] = useState([])
    const [SelectedVideo, setSelectedVideo] = useState(null)
    const [loading, setLoading] = useState(true); // Track loading state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sessionData, setSessionData] = useState();
    const [UserComment, setUserComment] = useState('')
    const [Comments, setComments] = useState([])
    const [activeReplyBox, setActiveReplyBox] = useState(null);
    const [likedComments, setLikedComments] = useState({});
    const [Collapsecomments, setCollapsecomments] = useState("collapse")
    const [saved, setsaved] = useState(false)
    const [isPurchased, setisPurchased] = useState(false)

    useEffect(() => {
        handleSession();
        GetCoursedata();
        GetLectures();




    }, [])

    // Check session status on component mount

    const handleSession = async () => {
        const userSessionData = localStorage.getItem('UserSession');
        const userData = JSON.parse(userSessionData);
        console.log(userData);

        setSessionData(userData);

    };
    const handlePurchaseClick = async () => {


        if (sessionData) {
            const response = await axios.post(`${apiUrl}/api/payment/checkout`, { Course: Course, User: sessionData });
            const order = response.data.order;
            console.log("This is checkout", sessionData)
            const options = {

                amount: order.amount,
                currency: order.currency,
                name: Course.Course_title,
                description: "This is the description",
                image: Course.CourseImage,
                order_id: order.id,
                callback_url: `${apiUrl}/api/paymentverification?Course=${JSON.stringify(Course)}&sessionData=${JSON.stringify(sessionData)}`,
                prefill: {
                    name: sessionData.name,
                    email: sessionData.email,
                },
                notes: {
                    "address": "razorapy official"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } else {
            // If the user is not logged in, open the login dialog
            setDialogOpen(true);
        }
    };
    const handlecheckreg = async (courseData) => {
        const userSessionData = localStorage.getItem('UserSession');
        const userData = JSON.parse(userSessionData);
        const response = await axios.get(`${apiUrl}/api/check/payment`, {
            params: {
                User: userData,
                Course: courseData
            }

        });
        console.log(response.data)
        if (response.status === 200) {
            setisPurchased(true)

        }
        setLoading(false)

    };
    const handleCommentpost = async () => {


        if (sessionData !== null) {
            const ComData = {
                comment: UserComment,
                userName: sessionData.name,
                LectureId: SelectedVideo.LectureID,
                CourseID: SelectedVideo.CourseID,
                Lecture_title: SelectedVideo.Lecture_title,
                Lecture_url: SelectedVideo.Lecture_url,
            }

            const response = await axios.post(`${apiUrl}/api/lecture/comment`, { ComData });
            if (response) {
                console.log(response.data)
                setUserComment('')
                GetLecturesComment(SelectedVideo.LectureID);
            }
        } else {
            // If the user is not logged in, open the login dialog
            setDialogOpen(true);
        }

    };

    const handleComment = (e) => {
        setUserComment(e.target.value)
    }
    const getYouTubeThumbnail = (url) => {
        const videoId = getVId(url);
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return '';
    };
    const formatDate = (date) => {
        const currentDate = new Date();
        const diff = currentDate - new Date(date);

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
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

    const handleVideoSelect = (lecture) => {
        console.log(lecture)
        setSelectedVideo(lecture)
        GetLecturesComment(lecture.LectureID);
        getsaveFromDatabase(lecture)
    };
    const GetCoursedata = async () => {
        const response = await axios.get(`${apiUrl}/api/course/data/${Id}`);
        if (response) {
            setCourse(response.data[0])
            handlecheckreg(response.data[0]);

        }


    }
    const GetLectures = async () => {
        const response = await axios.get(`${apiUrl}/api/public/course/lecture/${Id}`);
        if (response) {
            setLectures(response.data)

        }

    }
    const GetLecturesComment = async (lecture) => {
        const lId = lecture
        const response = await axios.get(`${apiUrl}/api/public/course/lecture/comments/${lId}`);
        if (response) {
            setComments(response.data)
        }

    }

    function timeAgo(date) {
        const differenceInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = Math.floor(differenceInSeconds / 31536000);
        if (interval > 1) return interval + " years ago";
        interval = Math.floor(differenceInSeconds / 2592000);
        if (interval > 1) return interval + " months ago";
        interval = Math.floor(differenceInSeconds / 86400);
        if (interval > 1) return interval + " days ago";
        interval = Math.floor(differenceInSeconds / 3600);
        if (interval > 1) return interval + " hours ago";
        interval = Math.floor(differenceInSeconds / 60);
        if (interval > 1) return interval + " minutes ago";
        return Math.floor(differenceInSeconds) + " seconds ago";
    }

    const handleReply = (id) => {
        if (activeReplyBox === id) {
            setActiveReplyBox(null);
        } else {
            setActiveReplyBox(id);
        }
    }


    const Handlereplylike = (index) => {
        setLikedComments(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }
    const collapseComments = () => {
        if (Collapsecomments === "collapse") {
            setCollapsecomments("open")
        } else {
            setCollapsecomments("collapse")
        }
    }

    const saveToDatabase = async (e) => {
        const lecturedata = e;
        const Userdata = sessionData;
        const response = await axios.post(`${apiUrl}/api/lecture/save`, { lecture: lecturedata, user: Userdata });
        if (response) {
            console.log(response.data)

        }

    };

    const removeFromDatabase = async (e) => {
        const lecturedata = e;
        const Userdata = sessionData;
        const response = await axios.post(`${apiUrl}/api/lecture/remove`, { lecture: lecturedata, user: Userdata });
        if (response) {
            console.log(response.data)

        }

    };
    const getsaveFromDatabase = async (e) => {
        const lecturedata = e;
        const Userdata = sessionData;

        const response = await axios.get(`${apiUrl}/api/lecture/check`,
            {
                params: {
                    lectureID: lecturedata.LectureID, userID: Userdata.UserID
                }
            }
        );
        if (response.data.saved) {
            setsaved(true);
        } else {
            setsaved(false);
        }

    };

    const handleSaveClick = (e) => {
        if (saved) {
            removeFromDatabase(e).then(() => {
                setsaved(false);
            }).catch(error => {
                console.error("Error removing data:", error);
            });
        } else {
            saveToDatabase(e).then(() => {
                setsaved(true);
            }).catch(error => {
                console.error("Error saving data:", error);
            });
        }
    };
    return (<>

        <ResponsiveAppBar sesData={sessionData} />


        <section id="coursesin" style={{ paddingTop: "30px" }}  >
            <div>
                <h4></h4>
            </div>


            <div className="container-fluid play-container">
                <div className="helpdesk">
                    <div>
                        <i class="fa fa-comments-o" aria-hidden="true"></i>
                    </div>
                    <div>
                        <p>Help Desk</p>
                    </div>

                </div>
                {loading ? (

                    <div style={{ display: "flex", justifyContent: "center", overflowY: "hidden", marginTop: "18%" }}>
                        <SyncLoader color="black" loading={loading} margin={10} size={8} cssOverride={{ borderColor: "white black" }} />
                    </div>

                ) : (
                    <div className="row">
                        {SelectedVideo ? (
                            <div className='play-video'>


                                <iframe
                                    src={`https://www.youtube.com/embed/${getVId(SelectedVideo.Lecture_url)}?autoplay=1&rel=0&showinfo=0&controls=1`}
                                    title="YouTube video player"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                                <h3 >{SelectedVideo.Lecture_title}</h3>
                                <div className="play-video-info">
                                    <p> {formatDate(SelectedVideo.date)}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50"
                                        onClick={(e) =>
                                            handleSaveClick(SelectedVideo)}>
                                        {saved ? (
                                            <path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z"></path>

                                        ) : (
                                            <path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"></path>
                                        )}
                                    </svg>
                                </div>
                                <hr />
                                <div className='Educator_details'>
                                    <div className="publisher">
                                        <img src={user} alt="" />
                                        <div>
                                            <p>{Course.EducatorName}</p>
                                        </div>
                                        {isPurchased ? (
                                            <button className='enroll' >
                                                Enrolled
                                            </button>
                                        ) : (
                                            <button className='enroll' onClick={handlePurchaseClick}>
                                                Enroll Now
                                            </button>
                                        )}

                                        {/* Show the login dialog if dialogOpen state is true */}
                                        {dialogOpen && <LoginDialog open={dialogOpen} setDialogOpen={setDialogOpen} />}
                                    </div>

                                    <div className="vid-description">
                                        <p>Channel that makes learning easy</p>
                                        <p>subscribe this course to learn more about this in depth for the constructive knowledge</p>

                                    </div>
                                </div>


                                <div className='vid-description'>
                                    <div className="comments">

                                        <img src={user} alt="" />
                                        <input type="text" placeholder='Comment your thoughts' name='usercomment' value={UserComment} onChange={(e) => handleComment(e)} />
                                        <button type='submit' onClick={handleCommentpost}><i class="fa fa-comment" aria-hidden="true"></i></button>

                                    </div>
                                    <h4 onClick={collapseComments}>Total comments : <b>{Comments.length}</b> {Collapsecomments === "collapse" ? (<i class="fa fa-angle-up" aria-hidden="true"></i>) : (<i class="fa fa-angle-down" aria-hidden="true"></i>)}</h4>
                                    <div className={Collapsecomments} style={{ background: "linear-gradient(74deg, rgb(203 204 217), rgb(225, 232, 255))", borderRadius: "10px", padding: "6px " }}>

                                        {Comments.map((item, index) => (
                                            <>
                                                <div className="old-comment" style={{
                                                    padding: "0px 15px",
                                                }}>
                                                    <img src={user} alt="" />
                                                    <div style={{ flexBasis: "45%" }}>
                                                        <h3>{item.UserName} <span>{timeAgo(item.date)}</span></h3>
                                                        <p>
                                                            {item.Comment}
                                                        </p>
                                                        <div>
                                                            <span style={{ marginRight: "8px", cursor: "pointer" }} onClick={() => Handlereplylike(index)}>
                                                                {likedComments[index] ? (
                                                                    <i class="fa fa-thumbs-up" id='liked_thumb' aria-hidden="true"></i>
                                                                ) : (
                                                                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                                                                )}
                                                            </span>
                                                            <span onClick={() => handleReply(index)} style={{ cursor: "pointer" }}>
                                                                reply
                                                            </span>
                                                            {activeReplyBox === index && (
                                                                <div>
                                                                    <input type="text" className='reply_box_open' />
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='play-video'>
                                <div className='coursecard'>
                                    <div style={{ padding: "15px", zIndex: "4" }}>

                                        <h3 style={{ color: "white" }}>Course Name : {Course.Course_title}</h3>
                                        <span style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            paddingTop: "17px"
                                        }}>
                                            <span className='imgcard'>
                                                <img src={Course.CourseImage} alt="Course-Image" style={{ width: "100%", height: "17rem", borderRadius: "10px" }} />
                                            </span>
                                        </span>


                                    </div>

                                    <div className='coursestack' >

                                        <p className='coursedesc'>{Course.Course_desc}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p style={{
                                                width: "150px",
                                                fontSize: "17px",
                                                color: "rgb(167 0 0)",
                                            }}>level : {Course.Course_level}</p>
                                            <p style={{
                                                width: "150px",
                                                fontSize: "17px",
                                                color: "#0000c2",
                                            }}>price : {Course.Course_price} Rs </p>
                                        </div>
                                        {isPurchased ? (<div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <button className='Demo' onClick={() => handleVideoSelect(Lectures[0])}>
                                                Start
                                            </button>
                                            <button className='enroll' >
                                                Purshased
                                            </button>
                                        </div>) : (<div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <button className='Demo' onClick={() => handleVideoSelect(Lectures[0])}>
                                                Watch Demo
                                            </button>
                                            <button className='enroll' onClick={handlePurchaseClick}>
                                                Enroll Now
                                            </button>
                                        </div>)}

                                        {dialogOpen && <LoginDialog open={dialogOpen} setDialogOpen={setDialogOpen} />}
                                        <h4></h4>
                                    </div>
                                </div>

                            </div>
                        )}

                        {isPurchased ? (
                            <>
                                <div className='side-bar'>

                                    <div style={{
                                        background: "linear-gradient(181deg, #ebeceb, #edfff8)",
                                        padding: " 0px 0 5px 0",
                                        borderRadius: "7px",
                                    }}>
                                        <p id='intro-desc'>Lectures</p>
                                        {Lectures.length > 0 && Lectures.map(lecture => (
                                            <div className="side-video-list" key={lecture._id} onClick={() => handleVideoSelect(lecture)} style={{ padding: "0 7px" }}>
                                                <span className='small-tnail'>
                                                    <img className="card-img-top" src={getYouTubeThumbnail(lecture.Lecture_url)} alt="Lecture Thumbnail" />
                                                </span>
                                                <div className="vid-info">
                                                    <p className='title'>{lecture.Lecture_title}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </>
                        ) : (

                            <>
                                <div className='side-bar'>

                                    <div style={{
                                        background: "linear-gradient(181deg, #ebeceb, #edfff8)",
                                        padding: " 0px 0 5px 0",
                                        borderRadius: "7px",
                                    }}>
                                        <p id='intro-desc'>Introduction Video</p>
                                        {Lectures.length > 0 && (
                                            <div className="side-video-list" key={Lectures[0]._id} onClick={() => handleVideoSelect(Lectures[0])} style={{ padding: "0 7px" }}>
                                                <span className='small-tnail'>
                                                    <img className="card-img-top" src={getYouTubeThumbnail(Lectures[0].Lecture_url)} alt="Lecture Thumbnail" />
                                                </span>
                                                <div className="vid-info">
                                                    <p className='title'>{Lectures[0].Lecture_title}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{
                                        background: "#ccd4ff",
                                        padding: "0 0 7px",
                                        borderRadius: "5px"
                                    }}>
                                        <p id='lock-desc'>Purchase course to access these videos</p>
                                        <div style={{ position: "relative" }}>

                                            <div className='Lock-div2' style={{ background: "linear-gradient(254deg, #6d6d6d, #000000)", position: "absolute", opacity: "0.4", width: "97%", height: "100%", zIndex: "1", borderRadius: "11px", margin: "0px 5px" }}>

                                            </div>
                                            <div className='lock-div' style={{ position: "relative", padding: "10px 11px" }}>
                                                {Lectures.slice(1).map(lecture => (
                                                    <div className="side-video-list" key={lecture._id} >
                                                        <span className='locksvg'>
                                                            <i class="fa fa-lock" aria-hidden="true"></i>
                                                        </span>
                                                        <span className='small-tnail'>
                                                            <img className="card-img-top" src={getYouTubeThumbnail(lecture.Lecture_url)} alt="Lecture Thumbnail" />

                                                        </span>
                                                        <div className="vid-info">
                                                            <p className='title'>{lecture.Lecture_title}</p>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>





                                </div>
                            </>
                        )}


                    </div>
                )}

            </div>


        </section >



    </>

    );
};

export default Coursein;

