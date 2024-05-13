import React from "react";
import image1 from '../../media/imagebanner1-removebg-preview.png';
import image from '../../media/border1.png';

function Banner() {
    return (
        <>
            <section id="banner" style={{ paddingTop: "20px", paddingBottom: "27px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{
                            display: "flex",
                            alignContent: "center",
                            flexWrap: "wrap"
                        }}>
                            <div >
                                <h4 style={{ fontFamily: "monospace" }}>E-learning</h4>
                                <p>Unleash your coding potential with our expert-led lectures tailored to empower aspiring programmers. Dive deep into the world of coding with our comprehensive courses covering languages, frameworks, and cutting-edge technologies.</p>
                            </div>
                        </div>
                        <div className="col-md-4" style={{
                            display: "flex",
                            alignContent: "center",
                            flexWrap: "wrap"
                        }}>
                            <div id="bannerimg">
                                <img src={image1} id="img1" alt="" style={{
                                    width: "322px",
                                    borderRadius: "36px",
                                    marginLeft: "90px"
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img id="border1" src={image} alt="" style={{
                    width: "100%"
                }} /> */}
            </section>

        </>
    );
};

export default Banner;
