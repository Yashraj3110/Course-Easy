import React from 'react';
import duser from "../../media/demo user.png"

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>

      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total number of courses</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total number of Lectures</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
             
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Dashboard;