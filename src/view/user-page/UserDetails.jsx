import React, { useEffect, useState } from 'react';
import duser from "../../media/demo user.png"

const UserDetails = () => {
  
  const [sessionData, setsessionData] = useState('')

  useEffect(() => {
    const userSessionData = localStorage.getItem('UserSession');
    const userData = JSON.parse(userSessionData);
    setsessionData(userData);
   
  }, []); // Include sessionData in the dependency array
  return (
    <div>
      <h3>User Details</h3>

      <div class="card text-center" style={{
        marginTop: "30px",
        width: "61vw",
        maxWidth: "692px"
      }}>
        <div class="card-header">
          Featured
        </div>
        <div style={{ display: "flex" }}>
          <img src={sessionData.profileImage} class="card-img-top" alt="..." style={{
            width: "110px",
            marginLeft: "43px",
            marginTop: "7px",
            borderRadius: "55px"
          }} />
          <div class="card-body">
            <h5 class="card-title">Name: {sessionData.name}</h5>
            <p class="card-text">UID: {sessionData.UserID}</p>
            <p class="card-text">Email: {sessionData.email}</p>

          </div>
        </div>

        <div class="card-footer text-muted">
          {sessionData.date}
        </div>
      </div>




    </div>
  );
};

export default UserDetails;