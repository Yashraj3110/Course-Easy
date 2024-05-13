import React from "react";
import DS from "../../media/dsp.jfif";
import WD from "../../media/wdp.jfif";
import DA from "../../media/dap.png";
import PE from "../../media/pep.jfif";
import AID from "../../media/aip.jfif";
import AOS from 'aos';
import { Link } from 'react-router-dom';

function Category({ sesData }) {
    AOS.init();
    
    return (
        <>
            <section id="category"   >
                <div class="container-fluid pt-5 " >
                    <h4 data-aos="fade-up-right" style={{ paddingBottom: "28px" }} >Explore our Courses</h4>
                    <div className="row"  >

                        <div class="card" data-aos="fade-up-left" >
                            <Link to={`/Data-Science/courses?sesData=${encodeURIComponent(JSON.stringify(sesData))}`}>
                                <img class="card-img-top" src={DS} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Data Science</h5>
                                </div>
                            </Link>
                        </div>
                        <div class="card" data-aos="fade-up-right">
                            <Link to={`/Web-development/courses?sesData=${encodeURIComponent(JSON.stringify(sesData))}`} sesData={sesData}>
                                <img class="card-img-top" src={WD} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Web Development</h5>
                                </div>
                            </Link>
                        </div>
                        <div class="card" data-aos="fade-up-left">
                            <Link to={`/Data-Analyst/courses?sesData=${encodeURIComponent(JSON.stringify(sesData))}`} sesData={sesData}>
                                <img class="card-img-top" src={DA} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Data Analyst</h5>
                                </div>
                            </Link>
                        </div>
                        <div class="card" data-aos="fade-up-right">
                            <Link to={`/Prompt-Engneering/courses?sesData=${encodeURIComponent(JSON.stringify(sesData))}`} sesData={sesData}>
                                <img class="card-img-top" src={PE} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Prompt Engneering</h5>
                                </div>
                            </Link>
                        </div>
                        <div class="card" data-aos="fade-up-left" >
                            <Link to={`/AI-Development/courses?sesData=${encodeURIComponent(JSON.stringify(sesData))}`} sesData={sesData}>
                                <img class="card-img-top" src={AID} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">AI Development</h5>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </section >

        </>
    );
};

export default Category;
