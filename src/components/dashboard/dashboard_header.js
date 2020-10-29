import React from 'react';


function DashboardHeader() {

    return (
        < div className = "dashboard_header" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg_icon"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                    <p className="nav_text">Dashboard</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg_icon2"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    <input type="text" name="search" id="" placeholder="Search"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg_icon2"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                </div>
    )
}

export default DashboardHeader;