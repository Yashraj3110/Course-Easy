import React from "react";
import python from '../../media/python.jpg';
import ruby from '../../media/ruby.jpg';
import c from '../../media/c.jpg';
import { Tilt } from 'react-tilt';
import AOS from 'aos';

function planguage() {

    const defaultOptions = {
        reverse: false,  // reverse the tilt direction
        max: 10,     // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1,    // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000,   // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be X or Y.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    AOS.init();

    return (
        <>
            <section id="service" style={{ marginBottom: "30px" }}  >
                <div class="container-fluid pt-5 ">
                    <h4 style={{ fontFamily: "monospace" }} data-aos="flip-left">Popular languages</h4>
                    <div className="row">
                        <div className="col" data-aos="zoom-in-up"> <center>
                            <Tilt options={defaultOptions} style={{ height: "auto", width: "18rem" }}>
                                <div className="card" >
                                    <img src={c} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">C Language</h5>
                                        <p className="card-text">
                                            C is a general-purpose computer programming language. It was
                                            created in the 1970s by Dennis Ritchie, and remains very widely
                                            used and influential. By design, C's features cleanly reflect the.
                                            {" "}
                                        </p>
                                        {/* <a href="c.php" className="btn btn-primary">
                                            More details
                                        </a> */}
                                    </div>
                                </div>
                            </Tilt></center>
                        </div>
                        <div className="col" data-aos="zoom-in-up">
                            <center>
                                <Tilt options={defaultOptions} style={{ height: "auto", width: "18rem" }}>
                                    <div className="card"  >
                                        <img
                                            src={python}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Pyton</h5>
                                            <p className="card-text">
                                                Python is a high-level, general-purpose programming language.
                                                Its design philosophy emphasizes code readability with the use
                                                of significant indentation. Python is dynamically-typed and.

                                            </p>

                                            {/* <a href="python.php" className="btn btn-primary" style={{ textAlign: "center" }}>
                                                More details
                                            </a> */}
                                        </div>
                                    </div>
                                </Tilt>
                            </center>
                        </div>
                        <div className="col" data-aos="zoom-in-up">
                            <center>
                                <Tilt options={defaultOptions} style={{ height: "auto", width: "18rem" }}>

                                    <div className="card">
                                        <img
                                            src={ruby}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Ruby</h5>
                                            <p className="card-text">
                                                Ruby is a pure Object-Oriented language developed by Yukihiro
                                                Matsumoto. Everything in Ruby is an object except the blocks but
                                                there are replacements too for it i.e procs and lambda. The.
                                                .
                                            </p>
                                            {/* <a href="ruby.php" className="btn btn-primary">
                                                More details
                                            </a> */}
                                        </div>
                                    </div>
                                </Tilt>

                            </center>
                        </div>
                        {/* <div className="col" data-aos="zoom-in-up"> <center>
                            <Tilt options={defaultOptions} style={{ height: "auto", width: "18rem" }}>
                                <div className="card" >
                                    <img src={c} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">C Language</h5>
                                        <p className="card-text">
                                            C is a general-purpose computer programming language. It was
                                            created in the 1970s by Dennis Ritchie, and remains very widely
                                            used and influential. By design, C's features cleanly reflect the.
                                            {" "}
                                        </p>
                                        <a href="c.php" className="btn btn-primary">
                                            More details
                                        </a>
                                    </div>
                                </div>
                            </Tilt></center>
                        </div> */}

                    </div>
                </div>
            </section>


        </>
    );
};

export default planguage;