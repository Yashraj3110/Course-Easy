import React from 'react';
import ReactPlayer from 'react-player'


const videoPlayerDiv = () => {
 
    return (<>
        <section id="videoplayer"   >
        <ReactPlayer style={{width:"23vw"}} url='https://www.youtube.com/watch?v=ncNVlCjaI5I' />
        </section >
    </>

    );
};

export default videoPlayerDiv;