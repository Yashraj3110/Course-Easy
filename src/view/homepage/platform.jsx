import React from "react";
import wiximg from "../../media/wix.jpg"
import shopifyimg from "../../media/shopify.png"
import AOS from 'aos';

function platform() {
    AOS.init();
    return (
        <>
            <section id="platform" style={{
                marginBottom: "96px"
            }}  >
                <center><h4 style={{
                    padding: "31px",
                    marginBottom: "8px",
                    fontSize: "30px",
                    fontFamily: "monospace"
                }} data-aos="zoom-in-right">Build Apps and publish on market</h4></center>
                {/* Carousel */}
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-md-12"  data-aos="zoom-in-down" >
                            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
                                <div class="carousel-inner">
                                    <div class="carousel-item active" data-bs-interval="6000">
                                        <div id="crpi">
                                            <div className="crouselimg" >
                                                <img src={wiximg} class="d-block" alt="" />
                                            </div>
                                            <div className="crouseltxt" >
                                                <h4>Wix</h4>
                                                <p>
                                                    Wix.com Ltd. is an Israeli software company, publicly listed in the US, that provides cloud-based web development services. 
                                                </p>
                                                <center><button>Read</button>
                                                </center>


                                            </div>
                                        </div>

                                    </div>

                                    <div class="carousel-item" data-bs-interval="6000">
                                        <div id="crpi">
                                            <div className="crouselimg" >
                                                <img src={shopifyimg} class="d-block " alt="..." />
                                            </div>
                                            <div className="crouseltxt" ><h4>Shopify</h4>
                                                <p>
                                                    Shopify is a popular e-commerce website builder that small businesses can use to build online stores or sell products on marketplaces .
                                                </p>
                                                <center><button>Read</button>
                                                </center>

                                            </div>
                                        </div>

                                    </div>


                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                    <span className="Boxl me-auto">
                                        <span id="arrow">
                                            <span class="bi bi-chevron-left" ></span>
                                        </span>
                                        <span class="visually-hidden">Previous</span>
                                    </span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                    <span className="Boxr ms-auto">
                                        <span id="arrow" class="bi bi-chevron-right" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </section >

        </>
    );
};

export default platform;