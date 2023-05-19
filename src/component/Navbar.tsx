import React from 'react';
import './Navbar.css';

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="navbar">

    <div className="left-side">
    <img src="logopic.png" alt="Logo" className="logo" />
 
      <form className="search-form" onSubmit={(e) => {
          e.preventDefault();
          onSearch(e.currentTarget.search.value);
          }}>
        <input type="text" name="search" className="search" placeholder="🔍 Search Clients" />
    
      </form>
    </div>
    <div className="right-side">
      <ul className="contents">
        <li> <a href="/create">+ Create</a></li>
        <li> <a href="/create">📄 Request</a></li>
        <li> <a href="/create">✉ Message</a></li>
      </ul>
      <button className='btn'>set meeting</button>
    </div>
  </nav>
  
  );
};

export default Navbar;
