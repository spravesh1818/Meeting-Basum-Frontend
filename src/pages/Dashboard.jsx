import React from "react";
import { useNavigate } from "react-router";
import "../styles/Dashboard.css";
import { getMeetings } from "../services/MeetingService";
import { copyMeetingLink } from "../utils/shareLink";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const meetings = await getMeetings();
      setMeetings(meetings);
    };
    fetchMeetings();
  }, []);

  return (
    <div className="main">

      <div className="welcome">
        <h2>Good Morning, {user?.name || "User"} 👋</h2>
        <p>Here's what's happening with your meetings today.</p>
      </div>


      {/* ACTION CARDS */}
      <div className="cards">
        <div className="card">
          <div className="icon purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </div>
          <h4>Start New Meeting</h4>
          <p>Start an instant meeting</p>
          <button className="btn purple" onClick={() => navigate("/meeting/new")}>Start Now →</button>
        </div>

        <div className="card">
          <div className="icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h4>Join with Code</h4>
          <p>Join a meeting with code</p>
          <button className="btn green" onClick={() => navigate("/meeting/join")}>Join Meeting →</button>
        </div>

        <div className="card">
          <div className="icon orange">📅</div>
          <h4>Schedule Meeting</h4>
          <p>Plan your meeting</p>
          <button className="btn orange" onClick={() => navigate("/meeting/schedule")}>Schedule Now →</button>
        </div>
      </div>

      {/* UPCOMING MEETINGS */}


      <div className="meetings">
        <div className="meeting-header">
          <h3>Upcoming Meetings</h3>
          <span onClick={() => navigate("/meeting/all")} style={{ cursor: "pointer" }}>View All</span>
        </div>
        {meetings && meetings.map((meeting) => (
          <div className="meeting-card" key={meeting._id}>
            <div className="left">
              <div className="mini-icon purple">👥</div>
              <div>
                <h4>{meeting.title}</h4>
              </div>
            </div>

            <div className="right">
              <p>Today, 10:00 AM - 11:00 AM</p>
              <button onClick={() => copyMeetingLink(meeting._id)}>Share</button>
              <button onClick={() => navigate(`/meeting/${meeting._id}`)}>Join</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;