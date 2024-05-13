import React from 'react';
import duser from "../../media/won.jpg"

const WOnline = () => {
    return (
        <>
            <section id="Whon" style={{ marginBottom: "30px",marginTop: "32px"  }}  data-aos="fade-right">
                <div class="container-fluid pt-5  ">
                    <div className="row" >


                        <div className="col-md-8" id="col2" data-aos="zoom-out-up">
                            <p>
                                Embrace the flexibility of online learning for coding, where you set the pace and schedule that suits your lifestyle. Harness the power of interactive tools and real-world projects to solidify your coding skills and propel your career forward.</p>
                        </div>
                        <div className="col-md-4" id="col" data-aos="zoom-out-up">
                            <img src={duser} alt="" />
                        </div>





                    </div>

                </div>
            </section>

        </>
    );
};

export default WOnline;