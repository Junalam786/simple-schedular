import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Calander from './component/Calander';
import Meetings from './component/Meeting';
import Navbar from './component/Navbar';
import './component/Meetings.css';
import './App.css';

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: "170px",
        backgroundColor: "#fff",
        top: "88px",
        bottom: "0",
        position: "sticky",
        marginTop: "58px",
        marginLeft: "12px",
        fontSize: "13px"
      }}
    >
      <ul style={{ listStyleType: "none", padding: "0", fontFamily: "Roboto, sans-serif",fontSize: "16px", color: "#949292"}}>
        <li style={{ padding: "8px" ,color: "#1371c8"}}>📅 &nbsp;  Calander</li>
        <li style={{ padding: "8px", cursor: "pointer" }} onClick={() => navigate("/meetings")}>
          👥 &nbsp;  Client
        </li>
        <li style={{ padding: "8px" }}>🧾&nbsp; Billing</li>
        <li style={{ padding: "8px" }}>☑️ &nbsp; Insurance</li>
        <li style={{ padding: "8px" }}>🏛 &nbsp;  Analytics</li>
        <li style={{ padding: "9px"  ,width: "100%"}}>🏼 &nbsp;   Account Activity</li>
        <li style={{ padding: "8px" }}>🕠 &nbsp; Reminders</li>
        <li style={{ padding: "8px" }}>⚙️ &nbsp;Settings</li>
      </ul>
    </aside>
  );
};

function App() {
 

  const handleSearch = (value: string) => {
    console.log(`Searching for ${value}`);
  };

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <nav
          style={{
            width: "100%",
            backgroundColor: "#0074D9",
            position: "absolute",
            top: "0",
            zIndex: 1,
          }}
        >
          <Navbar onSearch={handleSearch} />
        </nav>
        <SideBar />
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            marginTop: "60px",
            marginRight: "0",
            marginLeft: "60px",
            width: "100%",
            height: "auto",
            fontSize:" 10x"
          }}
        >
          <Routes>
            <Route path="/" element={<Calander  />} />
            <Route path='/meetings' element={<Meetings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


