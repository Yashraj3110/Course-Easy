import React, { useState } from 'react';
import duser from "../../media/educator.jpg"
import LoginDialog2 from '../Educator/EdLogin';
import { Link } from 'react-router-dom';

const Educator = () => {
    const [dialogOpen2, setDialogOpen2] = useState(false);

    const handleLoginButtonClick2 = () => {
        setDialogOpen2(true); // Open the login dialog
    };
    return (
        <>
            <section id="Educator" style={{
                marginBottom: "30px"
            }} data-aos="fade-right" >
                <div class="container-fluid pt-5  ">
                    <h4 data-aos="fade-up-right" style={{
                        paddingBottom: "28px", fontSize: "33px",
                        paddingBottom: "28px",
                        fontFamily: "monospace"
                    }} > Become an instructor</h4>
                    <div className="row" >


                        <div className="col-md-8" id="col2" data-aos="zoom-out-up">

                            <p>
                                Instructors from around the world teach millions of learners on Udemy. We provide the tools and skills to teach what you love.
                            </p>

                            <Link className="nav-link" onClick={handleLoginButtonClick2}>
                                <button>Join</button>
                            </Link>

                        </div>
                        <div className="col-md-4" id="col" data-aos="zoom-out-up">
                            <img src={duser} alt="" />
                        </div>





                    </div>

                </div>
            </section>
            <LoginDialog2 open={dialogOpen2} setDialogOpen={setDialogOpen2} />
        </>
    );
};

export default Educator;