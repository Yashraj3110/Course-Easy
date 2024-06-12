import React from "react";
import "./fseller.css"
import { Link } from 'react-router-dom';

import { useState } from "react";
const Fseller = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    function Model() {

        return (<>
            <div id="modal" className="modal" style={{
                position: 'fixed',
                top: '45%',
                left: '50%',
                backgroundColor: 'rgb(255, 255, 255)',
                width: '26rem',
                height: '267px',
                zIndex: '9999',
                display: 'none',
                borderRadius: '1rem',
                transition: 'opacity 0.3s ease-in-out',
                transform: isModalOpen ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
                display: isModalOpen ? 'block' : 'none',



            }}>
                <div className="addcontainer">
                    <div className="modal-header">
                        <hr style={{ "position": "relative", "top": "3rem" }} />

                        <h2 style={{ position: 'fixed', left: '3rem', top: '5%' }}>Login</h2>
                        <span className="dismiss-icon" style={{ "display": "flex", "flexDirection": "row-reverse", "marginRight": "20px", "cursor": "pointer" }} onClick={() => { setModalOpen(false); }}>✖</span> {/*- <!-- Horizontal line for theheader --*/}
                    </div>

                    <div className="modal-footer">

                    </div>
                </div>
            </div>
            <div id="overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 9998,
                display: 'none',
                transition: 'opacity 0.3s ease-in-out',
                display: isModalOpen ? 'block' : 'none',

            }} />

        </>)
    }
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Shopify App</title>
            <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@10.31.0/build/esm/styles.css" />
            <div className="Bodys">
                <link rel="stylesheet" href="./fseller.css" />


                <div className="banner">
                    <div className="bann">
                        <div className="bancon">
                            <div id="breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Library</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="bstext">
                                Will be Updated Soon !
                            </div>
                            <div>
                                <img src="./media/Desktop_sell.webp " alt="Flipkart" title="Flipkart" className="aqQN50111" href=""></img>
                                <span style={{
                                    height: "20rem",
                                    width: "20rem",
                                    position: "absolute",
                                    right:"300px"
                                }}><img src="./media/doodle.jpg" alt=""  style={{width:"34rem"}}/></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center">
                    <div className="overb">
                        <div
                            class="container"
                        >
                            <div
                                class="row g-2"
                            >
                                <ul id="bannerover"
                                    class="nav   "
                                >
                                    <li class="nav-item">
                                        <img src="./media/crore_users_revamp.svg" alt="Flipkart" title="Flipkart" className="aqQN5011" href=""></img>
                                        <p>Anyone can Upload there lectures </p>

                                    </li><div className="bannerdivide"></div>
                                    <li class="nav-item">
                                        <img src="./media/wallet-icon.svg" alt="Flipkart" title="Flipkart" className="aqQN5011" href=""></img>
                                        <p> Quiz related to lectures </p>

                                    </li><div className="bannerdivide"></div>
                                    <li class="nav-item">
                                        <img src="./media/low-cost-icon.svg" alt="Flipkart" title="Flipkart" className="aqQN5011" href=""></img>
                                        <p>lectures playlist </p>

                                    </li><div className="bannerdivide"></div>
                                    <li class="nav-item">
                                        <img src="./media/seller-support-icon.svg" alt="Flipkart" title="Flipkart" className="aqQN5011" href=""></img>
                                        <p>Help Desk </p>

                                    </li><div className="bannerdivide"></div>
                                    <li class="nav-item">
                                        <img src="./media/shopping-bag-icon.svg" alt="Flipkart" title="Flipkart" className="aqQN5011" href=""></img>
                                        <p>Course Wishlist</p>

                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="sellercontainer">
                    <div className="sellerdiv">
                        <div className="scol1">
                            <h2>
                                <span >Upcoming </span> <span id="ss1">Changes</span>
                            </h2>
                        </div>
                        <div className="scol2">
                            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div className="spcontent">
                                            <div className="sprofile"><img src="./media/crore_users_revamp.svg" className="simage" alt="..." /></div>
                                            <div className="spcred">
                                                <div className="spcred11"><p>Admin Dashboard</p><br /></div> <br />
                                                <div className="spcred12"><p>This dashoard will allow new Eduacator accounts to be created so anyone can Upload there leactures by creating there own Courses on this site .</p><br /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="spcontent">
                                            <div className="sprofile"><img src="./media/wallet-icon.svg" className="simage" alt="..." /></div>
                                            <div className="spcred">
                                                <div className="spcred11"><p>Lecture Quiz</p><br /></div> <br />
                                                <div className="spcred12"><p>Educator can create there Own quiz related to lecture so users can learn very well.</p><br /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="spcontent">
                                            <div className="sprofile"><img src="./media/low-cost-icon.svg" className="simage" alt="..." /></div>
                                            <div className="spcred">
                                                <div className="spcred11"><p>Playlist for Lectures</p><br /></div> <br />
                                                <div className="spcred12"><p>Users can create there own playlist of save lectures so they can categorized there saved lectures.</p><br /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="spcontent">
                                            <div className="sprofile"><img src="./media/seller-support-icon.svg" className="simage" alt="..." /></div>
                                            <div className="spcred">
                                                <div className="spcred11"><p>Help Desk</p><br /></div> <br />
                                                <div className="spcred12"><p>In every courses there is an option to clear there doubts related to lectures by connecting them to the educators through chat aka 'Help Desk'</p><br /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="spcontent">
                                            <div className="sprofile"><img src="./media/shopping-bag-icon.svg" className="simage" alt="..." /></div>
                                            <div className="spcred">
                                                <div className="spcred11"><p>Courses Wishlist</p><br /></div> <br />
                                                <div className="spcred12"><p>Users who wants to buy certain courses in future so they can add these courses into there wishlist. </p><br /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="fa fa-angle-left" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="fa fa-angle-right" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="loginpopup">

                </div>

            </div >
            <Model />
        </>
    );
}

export default Fseller;