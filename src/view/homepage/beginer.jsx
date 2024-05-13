import React from "react";
import html from "../../media/bgn-removebg-preview.png";
import AOS from "aos";

function Beginer() {
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 100, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
    return (
        <>
            <section id="Beginer" style={{ marginBottom: "30px" }}  >
                <div class="container-fluid pt-5  ">
                    <h4 style={{ fontFamily: "monospace" }} data-aos="fade-right">Start Learning</h4>

                    <div className="row" data-aos="fade-up">

                        <div className="col-md-4" id="col">
                            <img src={html} alt="" style={{background: "bisque" , height:"16rem"}} />
                        </div>
                        <div className="col-md-8" id="col2">
                            <p>
                                We offer expertly crafted educational content designed to propel you towards your goals. Join us today and embark on a transformative learning journey that will empower you to thrive in the digital age.</p>
                        </div>





                    </div>

                </div>
            </section>

        </>
    );
};

export default Beginer;
